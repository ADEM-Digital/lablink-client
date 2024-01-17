import { Route, Routes, useNavigate } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import PatientDashboard from "./pages/pateintDashboard/PatientDashboard";
import { QueryClient, QueryClientProvider } from "react-query";
import PatientHistory from "./pages/patientHistory/PatientHistory";
import { useUserProfileContext } from "./context/UserProfile";
import StaffDashboard from "./pages/staffDashboard/StaffDashboard";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { useServicesSlideOver } from "./context/ServiceSlideOver";
import ServicesSlideOverForm from "./components/form/ServiceSlideOver/ServicesSlideOverForm";

const queryClient = new QueryClient();

function App() {
  const { isLoading, isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  const { UserProfileContext, userProfile } = useUserProfileContext();
  const {
    isServicesSlideOverOpen,
    setIsServicesSlideOverOpen,
    ServicesSlideOverContext,
  } = useServicesSlideOver();
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/login");
    }
  }, [isLoading, isAuthenticated]);

  return (
    <QueryClientProvider client={queryClient}>
      <UserProfileContext.Provider value={userProfile}>
        <ServicesSlideOverContext.Provider
          value={{ isServicesSlideOverOpen, setIsServicesSlideOverOpen }}
        >
          <>
            <Routes>
              <Route path="/" element={<Layout />}>
                {userProfile?.role === "patient" && (
                  <>
                    <Route path="/" element={<PatientDashboard />} />
                    <Route path="/history" element={<PatientHistory />} />
                  </>
                )}

                {userProfile?.role === "staff" && (
                  <>
                    <Route path="/" element={<StaffDashboard />} />
                  </>
                )}
              </Route>

              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </>
          <ServicesSlideOverForm />
        </ServicesSlideOverContext.Provider>
      </UserProfileContext.Provider>
    </QueryClientProvider>
  );
}

export default App;
