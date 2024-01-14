import { Route, Routes } from "react-router-dom"
import Layout from "./components/layout/Layout"
import Login from "./pages/login/Login"

function App() {


  return (
    <Routes>
      <Route path="/" element={<Layout />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  )
}

export default App
