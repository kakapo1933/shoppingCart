# Product Management Application

This project is a full-stack application for product management, consisting of a React frontend and a Node.js backend with a mock server.

## Project Structure

The project is divided into two main parts:

1. `app/`: Frontend React application
2. `dataServer/`: Backend mock server

## Installation

To install and run this project, follow these steps:

1. Ensure you have pnpm installed globally. If not, install it:
   ```
   npm install -g pnpm
   ```

2. Clone the repository:
   ```
   git clone https://github.com/kakapo1933/shoppingCart.git
   cd shopping cart
   ```

3. Install dependencies for both frontend and backend:
   ```
   cd app && pnpm install
   cd ../dataServer && pnpm install
   ```

4. Start the backend server:
   ```
   cd dataServer
   pnpm start
   ```

5. In a new terminal, start the frontend development server:
   ```
   cd app
   pnpm run dev
   ```

6. Open your browser and navigate to `http://localhost:5173` to view the application.

## Frontend (app/)

The frontend is a React application built with Vite.

### Key Features

- Product listing and management
- Shopping cart functionality
- Promotion rules application

### Main Components

- `App.jsx`: Main application component
- `Cart.jsx`: Shopping cart component

### Promotion Rules

The application includes a promotion rule system:

- `promotionRules.js`: Contains the logic for applying discounts to the cart

### Testing

Tests are written using Vitest and can be found in the `src/test/` directory.

To run tests:

```
cd app
pnpm test
```

## Backend (dataServer/)

The backend is a mock server built with Express.js.

### Key Features

- RESTful API for product management
- CORS enabled for frontend communication

## API Endpoints

- GET `/api/products`: Fetch all products
- GET `/api/products/:id`: Fetch a specific product
- POST `/api/products`: Create a new product
- PUT `/api/products/:id`: Update a product

## Development

To run both frontend and backend concurrently, you'll need to open two terminal windows and run the respective commands in each.

## Dependencies

### Frontend
- React
- Axios
- Vite
- Vitest

### Backend
- Express
- CORS
- Nodemon (dev dependency)

For a full list of dependencies, please refer to the `package.json` files in the `app/` and `dataServer/` directories.
