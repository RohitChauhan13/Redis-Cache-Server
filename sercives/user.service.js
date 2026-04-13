const pool = require('../config/db.js');
const redisClient = require('../redis/redisClient.js');
const gm = require('./globalMethods.js');

const getData = (req) => ({
    ID: req.body.ID,
    NAME: req.body.NAME,
    EMAIL: req.body.EMAIL || '',
    MOBILE: req.body.MOBILE || '',
    DOB: req.body.DOB || ''
})

exports.get = async (req, res) => {
    try {
        let { sortKey, sortValue, filter } = req.body || {};

        const allowedSortKey = ['ASC', 'DESC'];
        const allowedSortValue = ['ID', 'NAME', 'EMAIL', 'MOBILE', 'DOB'];

        if (!sortKey || !allowedSortKey.includes(sortKey.toUpperCase())) {
            sortKey = 'ASC';
        }

        if (!sortValue || !allowedSortValue.includes(sortValue.toUpperCase())) {
            sortValue = 'ID';
        }

        let UNSAFE_FILTER = false;
        if (filter) {
            UNSAFE_FILTER = gm.sanitizeFilter(filter);
        } else {
            filter = '';
        }

        if (UNSAFE_FILTER) {
            return res.status(403).json({
                success: false,
                message: "Request blocked by safety filter"
            });
        }

        const query = `
            SELECT * 
            FROM users 
            WHERE 1 
            ${filter ? `${filter}` : ''}
            ORDER BY ${sortValue} ${sortKey}
        `;

        const cacheKey = `userData:${sortValue}:${sortKey}:${filter || 'nofilter'}`
        const redisCacheData = await redisClient.get(cacheKey)

        if (redisCacheData) {
            return res.status(200).json({
                success: true,
                redisCache: true,
                message: "User Data Fetched Successfully",
                count: JSON.parse(redisCacheData).length,
                data: JSON.parse(redisCacheData)
            })
        }

        const [rows] = await pool.query(query);

        await redisClient.set(
            cacheKey,
            JSON.stringify(rows),
            {
                expiration: { type: 'EX', value: 3600 },
                condition: 'NX',
            }
        )

        res.json({
            success: true,
            redisCache: false,
            message: "User Data Fetched Successfully",
            count: rows.length,
            data: rows
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};