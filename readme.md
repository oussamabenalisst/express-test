# Express MySQL API

This project is a simple API built with Express and MySQL. It provides several endpoints to interact with a MySQL database.

## Requirements

- Node.js installed on your system.
- A MySQL database with the following tables:
  - `product` table with columns:
    - `ipProduct` (Primary Key)
    - `name`
    - `pr`
  - `clients` table with columns:
    - `email`
    - `password`
    - `numTl`
    - `keyy`

## Installation

1. Install the required dependencies using npm:

   ```bash
   npm install
   ```

2. Ensure the database is set up correctly and update the database connection settings in `index.js`:

   ```javascript
   const db = mysql.createConnection({
     host: "localhost",
     user: "root",
     password: "",
     database: "test",
   });
   ```

## Running the Application

To start the application, run the following command:

```bash
npm start
```

The server will start on `http://localhost:3000`.

## API Endpoints

### 1. **GET /products**

- Description: Retrieves all products.
- Response: A list of products.

### 2. **GET /product/:id**

- Description: Retrieves a specific product by its `id`.
- Response: Details of the product.

### 3. **GET /update/:id/:name**

- Description: Updates the name of a product by its `id`.
- Response: The result of the update operation.

### 4. **POST /regester**

- Description: Registers a new client.
- Required Request Body:
  - `email`
  - `passwd`
  - `num`
  - `key`
- Response: Confirmation of registration or an error message.

### 5. **GET /maxproducts**

- Description: Retrieves the product with the highest price.
- Response: Details of the most expensive product.

### 6. **GET /close**

- Description: Closes the database connection.
- Response: Confirmation of the connection closure.

## Notes

- Ensure the database contains the required data to avoid errors.
- The `nodemon` package is used for automatic server restarts during development.

## Contributors

This project was created for educational purposes.
