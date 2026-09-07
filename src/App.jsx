import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Landing from './components/Landing'
import ProductList from './components/ProductList'
import ProductForm from './components/ProductForm'
import ProductPage from './components/ProductPage'

function App() {
  return (
    <div className="mx-auto max-w-4xl px-4">
      <Navbar />
      <main className="py-6 pb-12">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/:id" element={<ProductPage />} />
          <Route path="/add-product" element={<ProductForm />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
