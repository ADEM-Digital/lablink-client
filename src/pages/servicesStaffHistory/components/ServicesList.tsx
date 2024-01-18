import { UseQueryResult } from "react-query";
import { ServiceType } from "../../../types/Service";
import { ChevronRightIcon, BeakerIcon } from "@heroicons/react/20/solid";
import { classNames, sentenceToCaps } from "../../../utils/stringUtils";
import { stringToDate } from "../../../utils/dateUtils";
import { statusStyles } from "../../../utils/statusStyles";

type ServicesListPropsType = {
  staffServicesQuery: UseQueryResult<ServiceType[] | undefined, unknown>;
  setSelectedService: React.Dispatch<React.SetStateAction<ServiceType | undefined>>
};

const ServicesList = ({ staffServicesQuery, setSelectedService }: ServicesListPropsType) => {
  return (
    <>
      {/* Activity list (smallest breakpoint only) */}
      <div className="shadow sm:hidden">
        <ul
          role="list"
          className="mt-2 divide-y divide-gray-200 overflow-hidden shadow sm:hidden"
        >
          {staffServicesQuery.data &&
            staffServicesQuery.data.map((service) => (
              <li key={service._id?.toString()} className="w-full">
                <button 
                onClick={() => setSelectedService(service)}
                className="block bg-white px-4 py-4 hover:bg-gray-50 w-full">
                  <div className="flex justify-between items-center w-full truncate text-sm text-gray-500">
                    <div className="flex gap-1">
                      <BeakerIcon
                        className="h-5 w-5 flex-shrink-0 text-gray-400"
                        aria-hidden="true"
                      />
                      <span className="truncate">
                        {service._id?.toString()}
                      </span>
                    </div>

                    <span
                      className={classNames(
                        statusStyles[service.status],
                        "px-2 py-1 rounded-2xl text-xs"
                      )}
                    >
                      {sentenceToCaps(service.status)}
                    </span>
                  </div>

                  <span className="flex items-center space-x-4 my-2">
                    <span className="flex flex-1 space-x-2 truncate">
                      <span className="flex flex-col truncate text-sm text-gray-500">
                        <span>
                          <span className="font-medium text-gray-900">
                            {service.tests.map((test) => (
                              <div
                                // @ts-ignore
                                key={test._id?.toString() + service.createdAt}
                                className=" text-left"
                              >
                                {/* @ts-ignore */}
                                {test?.name}
                              </div>
                            ))}
                          </span>{" "}
                          {/* {service.status} */}
                        </span>
                      </span>
                    </span>
                    <ChevronRightIcon
                      className="h-5 w-5 flex-shrink-0 text-gray-400"
                      aria-hidden="true"
                    />
                  </span>
                  <div className="flex justify-between bg-gray-50 text-gray-500 mt-0.5 text-sm">
                    <time dateTime={service.createdAt}>
                      Created at: {stringToDate(service.createdAt)}
                    </time>
                    <time dateTime={service.updatedAt}>
                      Updated at: {stringToDate(service.updatedAt)}
                    </time>
                  </div>
                </button>
              </li>
            ))}
        </ul>

        {/* <nav
          className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3"
          aria-label="Pagination"
        >
          <div className="flex flex-1 justify-between">
            <a
              href="#"
              className="relative inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              Previous
            </a>
            <a
              href="#"
              className="relative ml-3 inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              Next
            </a>
          </div>
        </nav> */}
      </div>

      {/* Activity table (small breakpoint and up) */}
      <div className="hidden sm:block">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mt-2 flex flex-col">
            <div className="min-w-full overflow-hidden overflow-x-auto align-middle shadow sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th
                      className="bg-gray-50 px-6 py-3 text-left text-sm font-semibold text-gray-900"
                      scope="col"
                    >
                      Id
                    </th>
                    <th
                      className="bg-gray-50 px-6 py-3 text-right text-sm font-semibold text-gray-900"
                      scope="col"
                    >
                      Services
                    </th>
                    <th
                      className="hidden bg-gray-50 px-6 py-3 text-center text-sm font-semibold text-gray-900 md:block"
                      scope="col"
                    >
                      Status
                    </th>
                    <th
                      className="bg-gray-50 px-6 py-3 text-right text-sm font-semibold text-gray-900"
                      scope="col"
                    >
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {staffServicesQuery.data &&
                    staffServicesQuery.data.map((service) => (
                      <tr
                        key={`${service._id?.toString()}-desktop`}
                        className="bg-white"
                      >
                        <td className="w-full max-w-0 whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                          <div className="flex">
                          <button
                         onClick={() => setSelectedService(service)}
                         className="group inline-flex space-x-2 truncate text-sm text-left"
                       >
                         <BeakerIcon
                           className="h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                           aria-hidden="true"
                         />
                         <div>
                         <p className="truncate text-gray-500 group-hover:text-gray-900">
                           Service ID: {service._id?.toString()}
                         </p>
                         <p className="truncate text-gray-900 group-hover:text-gray-900">
                           {/* @ts-ignore */}
                           Patient name: {service.user?.name}
                         </p>
                         </div>
                         
                       </button>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-right text-sm text-gray-500">
                          <div className="font-medium text-gray-900">
                            {service.tests.map((test) => (
                              <div
                                // @ts-ignore
                                key={`${test?._id?.toString() + service.createdAt
                                }-desktop`}
                                className=" text-right"
                              >
                                {/* @ts-ignore */}
                                {test.name}
                              </div>
                            ))}
                          </div>
                        </td>
                        <td className="hidden whitespace-nowrap px-6 py-4 text-sm text-gray-500 md:table-cell">
                          <span
                            className={classNames(
                              statusStyles[service.status],
                              "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize"
                            )}
                          >
                            {service.status}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-right text-sm text-gray-500">
                          <time dateTime={service.createdAt}>
                            {stringToDate(service.createdAt)}
                          </time>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
              {/* Pagination */}
              {/* <nav
                className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6"
                aria-label="Pagination"
              >
                <div className="hidden sm:block">
                  <p className="text-sm text-gray-700">
                    Showing <span className="font-medium">1</span> to{" "}
                    <span className="font-medium">10</span> of{" "}
                    <span className="font-medium">20</span> results
                  </p>
                </div>
                <div className="flex flex-1 justify-between gap-x-3 sm:justify-end">
                  <a
                    href="#"
                    className="relative inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:ring-gray-400"
                  >
                    Previous
                  </a>
                  <a
                    href="#"
                    className="relative inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:ring-gray-400"
                  >
                    Next
                  </a>
                </div>
              </nav> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ServicesList;
