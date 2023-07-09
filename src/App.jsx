import { Routes, Route } from "react-router-dom";

import { MainPage, ProductPage, NotFoundPage, ProductsPage, ProfilePage, } from "./pages";
import { Nav, } from "./components";

import "./App.css"

function App() {

  return (
    <Routes>
      <Route path="/" element={<Nav />}>
        <Route index element={<MainPage />} />
        <Route path="products/:id" element={<ProductPage />} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="profile" element={<ProfilePage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default App
