exports.sanitizeFilter = (input) => {

    if (!input || typeof input !== 'string') return false;

    if (input.length > 200) return true;

    const dangerousPatterns = [
        /--/g,
        /;/g,
        /\/\*/g,
        /\*\//g,
        /\b(SELECT|SLEEP|INSERT|UPDATE|DELETE|DROP|TRUNCATE|ALTER|CREATE|RENAME|GRANT|REVOKE|EXECUTE|UNION|ROLLBACK|COMMIT)\b/i
    ];

    for (const pattern of dangerousPatterns) {
        if (pattern.test(input)) {
            return true;
        }
    }

    const safePattern = /^[a-zA-Z0-9_\s=><'"().\-ANDOR]*$/i;

    if (!safePattern.test(input)) {
        return true;
    }

    return false;
};