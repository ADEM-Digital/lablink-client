import { Route, Routes } from "react-router-dom"
import Layout from "./components/layout/Layout"
import Login from "./pages/login/Login"
import Register from "./pages/register/Register"
import PatientDashboard from "./pages/pateintDashboard/PatientDashboard"
import { QueryClient, QueryClientProvider } from "react-query";
import PatientHistory from "./pages/patientHistory/PatientHistory"

const queryClient = new QueryClient();

function App() {


  return (
    <QueryClientProvider client={queryClient}>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<PatientDashboard />} />
        <Route path="/history" element={<PatientHistory />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
    </QueryClientProvider>
  )
}

export default App
