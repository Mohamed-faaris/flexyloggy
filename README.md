# Flexyloggy

A Node.js Express API for logging requests with MongoDB and local JSON storage.

## Features

- Logs all incoming requests (method, URL, body, headers, IP, timestamp)
- Stores logs in MongoDB and a local `logs.json` file
- Console logging for requests and responses
- CORS enabled for all origins
- Health check endpoint
- Manual logging endpoint supporting all HTTP methods

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Create a `.env` file with your MongoDB URI:
   ```
   MONGODB_URI=your_mongodb_connection_string
   PORT=4000
   ```
4. Start the server:
   ```bash
   pnpm start
   ```
   Or for development:
   ```bash
   pnpm dev
   ```

## Usage

The API logs all requests automatically. You can also manually log data by sending requests to `/log`.

### Routes

- `GET /` - Welcome message
- `GET /health` - Health check
- `ALL /log` - Log a request and return log details

### Example

Send a POST request to `/log`:
```bash
curl -X POST http://localhost:4000/log -H "Content-Type: application/json" -d '{"message": "test"}'
```

Response:
```json
{
  "logged": true,
  "time": "2025-10-17T...",
  "id": "mongo_object_id"
}
```

## Environment Variables

- `MONGODB_URI` - MongoDB connection string
- `PORT` - Server port (default: 3000)

## Dependencies

- express
- mongoose
- dotenv
- cors

## License

MIT