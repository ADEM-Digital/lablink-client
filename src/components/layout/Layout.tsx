import { Outlet, useNavigate } from "react-router-dom";
import HeaderPopover from "./components/HeaderPopover";
import RecentTests from "./components/RecentTests";

import UserPanel from "./components/UserPanel";
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
      <div className="min-h-full">
        <HeaderPopover />
        <main className="-mt-24 pb-8">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            <h1 className="sr-only">Profile</h1>
            {/* Main 3 column grid */}
            <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-3 lg:gap-8">
              {/* Left column */}
              <div className="grid grid-cols-1 gap-4 lg:col-span-2">
                {/* Welcome panel */}
                <UserPanel />

                {/* Main Content */}
                <Outlet />
              </div>

              {/* Right column */}
              <div className="grid grid-cols-1 gap-4">
                {/* Recent Tests */}
                <RecentTests />
              </div>
            </div>
          </div>
        </main>
        {/* <footer>
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            <div className="border-t border-gray-200 py-8 text-center text-sm text-gray-500 sm:text-left">
              <span className="block sm:inline">
                &copy; 2021 Your Company, Inc.
              </span>{" "}
              <span className="block sm:inline">All rights reserved.</span>
            </div>
          </div>
        </footer> */}
      </div>
    </>
  );
}
