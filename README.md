# 🚀 Redis Cache Express Server

This is a Node.js server built with Express that uses Redis for caching and a database for persistent storage. It improves performance by storing frequently accessed data in Redis.

---

## 📁 Project Structure

```id="tree1"
REDISSERVER/
│
├── config/
│   └── db.js              # Database configuration
│
├── redis/                 # Redis server folder (contains redis-server.exe)
│
├── routes/
│   └── user.route.js      # API routes
│
├── services/
│   ├── globalMethods.js   # Common helper functions
│   └── user.service.js    # Business logic
│
├── node_modules/
├── .env                   # Environment variables
├── .gitignore
├── index.js               # Entry point
├── package.json
└── package-lock.json
```

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory and add:

```id="env1"
DB_HOST=your_db_hostname 
DB_USER=your_db_userame
DB_PASSWORD=your_db_password 
DB_NAME=your_db_name 
DB_PORT=your_db_port

SERVER_PORT=your_server_port

CA_AIVEN='-----BEGIN CERTIFICATE-----
YOUR_CA_CERTFICATE
-----END CERTIFICATE-----'
```

---

## ▶️ How to Run the Project

### 1️⃣ Start Redis Server

Go to the Redis folder and start the server:

```id="run1"
cd redis
redis-server.exe
```

---

### 2️⃣ Start Node.js Server

Open a new terminal and run:

```id="run2"
nodemon index.js
```

Or:

```id="run3"
node index.js
```

---

## 💡 How It Works

* When a request is made:

  * The server first checks Redis cache.
  * If data exists → it returns cached data ⚡
  * If not → fetches from DB → stores in Redis → returns response

---

## 📡 API Example

Example route:

```id="api1"
/api/users
```

* First call → fetches from DB and caches it
* Next calls → served from Redis cache

---

## 🛠️ Installation

```id="install1"
npm install
```

---

## 📌 Important Notes

* Redis server **must be running first**
* Ensure `.env` values are correctly set
* Default Redis port: `6379`
* Never commit `.env` file (already ignored)

---

## 🚀 Features

* Fast response using Redis caching
* Clean project structure (routes, services, config)
* Environment-based configuration
* Scalable backend pattern

---

## 📜 License

Free to use for learning and development.