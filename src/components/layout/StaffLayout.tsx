import {  useState } from "react";

import {
  ClockIcon,
  CogIcon,

  HomeIcon,
  QuestionMarkCircleIcon,

  ShieldCheckIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";

import MobileMenu from "./components/staffLayoutComponents/MobileMenu";
import DesktopSidebar from "./components/staffLayoutComponents/DesktopSidebar";
import Navbar from "./components/staffLayoutComponents/Navbar";
import { Outlet } from "react-router-dom";

const navigation = [
  { name: "Home", href: "/", icon: HomeIcon, current: true },
  { name: "Services", href: "/services", icon: ClockIcon, current: false },
  { name: "Staff", href: "#", icon: UserGroupIcon, current: false },
  { name: "Patients", href: "#", icon: UserGroupIcon, current: false },

];
const secondaryNavigation = [
  { name: "Settings", href: "#", icon: CogIcon },
  { name: "Help", href: "#", icon: QuestionMarkCircleIcon },
  { name: "Privacy", href: "#", icon: ShieldCheckIcon },
];

export default function StaffLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <div className="min-h-full">
        <MobileMenu
          navigation={navigation}
          secondaryNavigation={secondaryNavigation}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        {/* Static sidebar for desktop */}
        <DesktopSidebar
          navigation={navigation}
          secondaryNavigation={secondaryNavigation}
        />

        <div className="flex flex-1 flex-col lg:pl-64">
          <Navbar setSidebarOpen={setSidebarOpen} />
          <main className="flex-1 pb-8">
            <Outlet />
            {/* Page header */}
          </main>
        </div>
      </div>
    </>
  );
}
