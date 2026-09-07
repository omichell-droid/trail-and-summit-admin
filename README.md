# Trail & Summit Admin Portal

A small React admin portal for an outdoor gear e-commerce store. 

## What it does

- **Landing page** - explains what the portal is for
- **Products page** - lists every product, with a live search box
- **Add Product page** - a form that creates a new product (POST)
- **Product page** - view one product, edit its price/stock (PATCH), or delete it (DELETE)

## Tech

- React + Vite
- Tailwind CSS 
- React Router (client-side routing)
- json-server as a simulated backend (reads/writes db.json)
- Vitest + React Testing Library for tests

## Running it locally

You need two terminals open at the same time.

**Terminal 1 - start the fake backend**
```
npm install
npm run server
```
This starts json-server on http://localhost:3001, using db.json as the
database. Any product you add, edit, or delete gets written to that file.

**Terminal 2 - start the React app**
```
npm run dev
```
Open the printed local URL (usually http://localhost:5173) in your browser.

## Running the tests
```
npm test
```

## Project structure
```
src/
  components/     UI components (Navbar, Landing, ProductList, ProductForm, ProductPage, SearchBar)
  context/        ProductContext - shares product state/actions app-wide
  hooks/          useProducts - custom hook with all the fetch/post/patch/delete logic
  tests/          Vitest + React Testing Library tests
db.json           Simulated backend data
```
