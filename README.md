# Readery API

## Description

This project is an API for managing books using Node.js, Express, and MongoDB. It provides functionality for querying books with pagination, search, filtering by category and price, and sorting.

## Features

- **Pagination**: Retrieve books with pagination support.
- **Search**: Search books by title.
- **Filter**: Filter books by category and price range.
- **Sort**: Sort books by price in ascending or descending order.

## Installation

### Prerequisites

- Node.js
- MongoDB (you need a MongoDB URI)

### Steps

1. **Clone the Repository**

    ```bash
    https://github.com/protap1100/Scic-Server
    cd your-repo
    ```

2. **Install Dependencies**

    ```bash
    npm install
    ```

3. **Set Up Environment Variables**

    Create a `.env` file in the root directory and add your MongoDB URI:

    ```plaintext
    MONGODB_URI=your_mongodb_uri
    PORT=5000
    ```

4. **Start the Server**

    ```bash
    npm start
    ```

    The server will be running on `http://localhost:5000`.

## API Endpoints

### `GET /books`

Retrieve a list of books with optional query parameters for pagination, search, filtering, and sorting.

**Query Parameters:**

- `page`: Page number (default: 1)
- `limit`: Number of books per page (default: 9)
- `search`: Search term for book titles (default: "")
- `categoryName`: Filter books by category (default: "")
- `sort`: Sort order by price (`asc` or `desc`, default: `asc`)
- `minPrice`: Minimum price (default: 0)
- `maxPrice`: Maximum price (default: Infinity)

**Response:**

Returns a JSON object containing:
- `books`: Array of book objects
- `totalPages`: Total number of pages

### `GET /`

Basic endpoint to check if the server is running.

**Response:**

```plaintext
Scic Task Is Running
