

import UserPanel from "./components/UserPanel";
import Overview from "./components/Overview";
import RecentActivity from "./components/RecentActivity";
import { useStaffDashboard } from "./hooks";

const StaffDashboard = () => {
  const {staffDashboardQuery} = useStaffDashboard()
  return (
    <>
      <UserPanel />
      <div className="mt-8">
        
        <Overview staffDashboardQuery={staffDashboardQuery}/>
        <RecentActivity staffDashboardQuery={staffDashboardQuery}/>
      </div>
    </>
  );
};

export default StaffDashboard;
