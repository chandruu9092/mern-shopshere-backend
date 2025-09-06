# ShopSphere - E-commerce API

Backend API for the ShopSphere e-commerce platform, built with Node.js, Express, and MongoDB.

## Getting Started

### Prerequisites

- Node.js
- MongoDB Atlas account

### Installation

1.  Clone the repository:
    ```bash
    git clone [https://github.com/your-username/shopsphere-backend.git](https://github.com/your-username/shopsphere-backend.git)
    ```
2.  Install NPM packages:
    ```bash
    npm install
    ```
3.  Create a `.env` file in the root directory and add the environment variables as shown in the `.env.example` file.
4.  Import the sample data into your database:
    ```bash
    npm run data:import
    ```
5.  Run the server:
    ```bash
    npm run dev
    ```

The API will be running on `http://localhost:3000`.

## API Endpoints

- `GET /api/products`
- `GET /api/products/:id`
