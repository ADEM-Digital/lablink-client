import { Outlet, useNavigate } from "react-router-dom";
import HeaderPopover from "./components/HeaderPopover";

import { useAuth0 } from "@auth0/auth0-react";

import axios from "axios";
import { useEffect } from "react";

export default function Layout() {
  const { user, isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    console.log(isAuthenticated);
    navigate("/login");
  }

  useEffect(() => {
    if (user?.sub) {
        console.log(user.sub)
      const checkUserData = async () => {
        try {
          if (user?.sub) {
            const profileDocuments = await axios.get(
              `${import.meta.env.VITE_API_URL}/v1/userProfiles`,
              {
                params: {
                  userId: user.sub,
                },
              }
            );

            if (profileDocuments.data.length < 1) {
              navigate("/register");
            }
          }
        } catch (error) {
          console.log(error);
        }
      };
      checkUserData();
    }
  }, [user, navigate]);

  return (
    <>
      <div className="min-h-full flex flex-col">
        <HeaderPopover />
        <main className="-mt-24 pb-8 flex-1">
          <Outlet />
        </main>
        <footer>
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            <div className="border-t border-gray-200 py-8 text-center text-sm text-gray-500 sm:text-left">
              <span className="block sm:inline">
                &copy; 2024 LabLink© an app by ADEM Digital, Corp.
              </span>{" "}
              <span className="block sm:inline">All rights reserved.</span>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
