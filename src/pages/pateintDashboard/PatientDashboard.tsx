import RecentTests from "./components/RecentTests";
import UserPanel from "./components/UserPanel";
import { usePatientDashboard } from "./hooks";

const PatientDashboard = () => {
  const { dashboardQuery } = usePatientDashboard();
  
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8 mt-8 lg:mt-0">
      <h1 className="sr-only">Profile</h1>
      {/* Main 3 column grid */}
      <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-3 lg:gap-8">
        {/* Left column */}
        <div className="grid grid-cols-1 gap-4 col-span-3">
          {/* Welcome panel */}
          <UserPanel dashboardQuery={dashboardQuery} />

          {/* Main Content */}
          {/* Recent Tests */}
          <RecentTests dashboardQuery={dashboardQuery}/>
        </div>

        {/* Right column */}
        <div className="grid grid-cols-1 gap-4"></div>
      </div>
    </div>
  );
};

export default PatientDashboard;
