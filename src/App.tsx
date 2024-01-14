import { Route, Routes } from "react-router-dom"
import Layout from "./components/layout/Layout"
import Login from "./pages/login/Login"
import Register from "./pages/register/Register"

function App() {


  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  )
}

export default App
