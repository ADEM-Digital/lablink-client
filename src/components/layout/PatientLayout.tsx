import { Outlet } from "react-router-dom";
import HeaderPopover from "./components/HeaderPopover";



export default function PatientLayout() {
 

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
