import { BeakerIcon } from "@heroicons/react/24/outline";
import { UseQueryResult } from "react-query";
import { DashboardDataType } from "../hooks";
import { useEffect, useState } from "react";
import { ServiceType } from "../../../types/Service";
import RecentTestEmptyState from "./RecentTestsEmptyState";
import { classNames } from "../../../utils/stringUtils";
import { useNavigate } from "react-router-dom";
import { stringToDate } from "../../../utils/dateUtils";

type RecentTestsPropsType = {
  dashboardQuery: UseQueryResult<DashboardDataType | undefined, unknown>;
};

const RecentTests = ({ dashboardQuery }: RecentTestsPropsType) => {
  const [recentServices, setRecentServices] = useState<ServiceType[]>([]);
  const navigate = useNavigate()

  useEffect(() => {
    setRecentServices(
      dashboardQuery.data?.recentResultsDetails
        ? dashboardQuery.data?.recentResultsDetails
        : []
    );
  }, [dashboardQuery.data]);
  return (
    <section aria-labelledby="recent-hires-title">
      <div className={classNames(recentServices.length < 1 ? "flex items-center justify-center" : "" ,"overflow-hidden rounded-lg bg-white shadow sm:max-w-[80%] sm:mx-auto")}>
        {recentServices.length > 0 && (
          <div className="p-6">
            <h2
              className="text-base font-medium text-gray-900"
              id="recent-hires-title"
            >
              Recent Tests
            </h2>
            <div className="mt-6 flow-root">
              <ul role="list" className="-my-5 divide-y divide-gray-200">
                {recentServices.map((service) => (
                  <li key={service._id?.toString()} className="py-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        {/* <img
                         className="h-8 w-8 rounded-full"
                         src={service.imageUrl}
                         alt=""
                       /> */}
                        <div className="p-1 bg-cyan-600 rounded-full text-white">
                          <BeakerIcon className="w-5 h-5" />
                        </div>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-gray-900">
                          {service._id?.toString()}
                        </p>
                        <p className="truncate text-sm text-gray-500">
                          {`Created At: ${stringToDate(service.createdAt)} | Updated at: ${stringToDate(service.updatedAt)}`}
                        </p>
                      </div>
                      <div>
                        <button className="inline-flex items-center rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                          View
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-6">
              <button
                onClick={() => navigate("/history")}
                className="flex w-full items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                View all
              </button>
            </div>
          </div>
        )}

        {recentServices.length < 1 && (
          <div className="p-6">
            <RecentTestEmptyState />
          </div>
        )}
      </div>
    </section>
  );
};

export default RecentTests;
