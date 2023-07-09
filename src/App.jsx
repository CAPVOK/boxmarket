import { Routes, Route } from "react-router-dom";

import { MainPage, ProductPage, NotFoundPage, ProductsPage, ProfilePage, LogInPage, } from "./pages";
import { Nav, } from "./components";
import { Auth } from "./core/Auth";

import "./App.css"

function App() {

  return (
    <Routes>
      <Route path="/" element={<Nav />}>
        <Route index element={<MainPage />} />
        <Route path="products/:id" element={<Auth><ProductPage /></Auth>} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="profile" element={<Auth><ProfilePage /></Auth>} />
        <Route path="login" element={<LogInPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default App
