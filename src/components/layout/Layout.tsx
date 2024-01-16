import { useAuth0 } from "@auth0/auth0-react";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PatientLayout from "./PatientLayout";
import StaffLayout from "./StaffLayout";
import {
  UserProfileContext,
  UserProfileContextType,
} from "../../context/UserProfile";

const Layout = () => {
  const { user } = useAuth0();
  const userProfile = useContext<UserProfileContextType | undefined>(
    UserProfileContext
  );

  const navigate = useNavigate();

//   if (!isAuthenticated) {
//     console.log(isAuthenticated);
//     navigate("/login");
//   }

  useEffect(() => {
    if (user?.sub) {
      const checkUserData = async () => {
        if (user?.sub) {
          if (!userProfile) {
            navigate("/register");
          }
        }
      };
      checkUserData();
    }
  }, [user, navigate]);
  
  return (
    <>
      {userProfile ? (
        userProfile.role === "patient" ? (
          <PatientLayout />
        ) : (
          <StaffLayout />
        )
      ) : (
        <></>
      )}
    </>
  );
};

export default Layout;
