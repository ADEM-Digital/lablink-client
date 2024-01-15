import { useAuth0 } from "@auth0/auth0-react";
import { UseQueryResult } from "react-query";
import { DashboardDataType } from "../hooks";
import { useEffect, useState } from "react";

type UserPanelPropsType = {
  dashboardQuery: UseQueryResult<DashboardDataType | undefined, unknown>
}



const UserPanel = ({dashboardQuery}: UserPanelPropsType) => {
    const {user} = useAuth0();
    const [stats, setStats] = useState([
      { label: "Available results", value: 0 },
      { label: "Pending results", value: 0 },
      { label: "Recent results", value: 0 },
    ]);

    useEffect(() => {
      const updatedStats = [... stats];
      updatedStats[0].value = dashboardQuery?.data?.availableResults ? dashboardQuery.data.availableResults : 0;
      updatedStats[1].value = dashboardQuery?.data?.pendingResults ? dashboardQuery.data.pendingResults : 0;
      updatedStats[2].value = dashboardQuery?.data?.recentResults ? dashboardQuery.data.recentResults : 0;

      setStats(updatedStats);
    }, [dashboardQuery?.data])
  return (
    <section aria-labelledby="profile-overview-title ">
      <div className="overflow-hidden rounded-lg bg-white shadow sm:max-w-[80%] sm:mx-auto">
        <h2 className="sr-only" id="profile-overview-title">
          Profile Overview
        </h2>
        <div className="bg-white p-6">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div className="sm:flex sm:space-x-5">
              <div className="flex-shrink-0">
                <img
                  className="mx-auto h-20 w-20 rounded-full"
                  src={user?.picture}
                  alt=""
                />
              </div>
              <div className="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left">
                <p className="text-sm font-medium text-gray-600">
                  Welcome back,
                </p>
                <p className="text-xl font-bold text-gray-900 sm:text-2xl">
                  {user?.name}
                </p>
                {/* <p className="text-sm font-medium text-gray-600">{user.role}</p> */}
              </div>
            </div>
            <div className="mt-5 flex justify-center sm:mt-0">
              {/* <a
                href="#"
                className="flex items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                View profile
              </a> */}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 divide-y divide-gray-200 border-t border-gray-200 bg-gray-50 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="px-6 py-5 text-center text-sm font-medium"
            >
              <span className="text-gray-900">{stat.value}</span>{" "}
              <span className="text-gray-600">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UserPanel;
