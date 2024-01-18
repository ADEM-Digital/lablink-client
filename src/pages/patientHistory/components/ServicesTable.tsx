import { UseQueryResult } from "react-query";
import { FullServiceType } from "../../../types/Service";
import { stringToDate } from "../../../utils/dateUtils";
import { classNames, sentenceToCaps } from "../../../utils/stringUtils";
import { statusStyles } from "../../../utils/statusStyles";

type ServicesTablePropsType = {
  patientServicesQuery: UseQueryResult<FullServiceType[] | undefined, unknown>;
  setSelectedService: React.Dispatch<
    React.SetStateAction<FullServiceType | undefined>
  >;
};

const ServicesTable = ({
  patientServicesQuery,
  setSelectedService,
}: ServicesTablePropsType) => {
  return (
    <section aria-labelledby="recent-services-title">
      <div className="overflow-hidden rounded-lg bg-white shadow min-h-[30vh]">
        <div className="flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className={
                        "hidden lg:block py-3.5 pl-4 pr-3 text-sm font-semibold text-gray-900 sm:pl-3 text-center"
                      }
                    >
                      Id
                    </th>
                    <th
                      scope="col"
                      className="w-1/5 px-3 py-3.5 text-center text-sm font-semibold text-gray-900"
                    >
                      Services
                    </th>
                    <th
                      scope="col"
                      className="hidden md:block  px-3 py-3.5 text-center text-sm font-semibold text-gray-900"
                    >
                      Updated At
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="relative py-3.5 pl-3 pr-4 sm:pr-3"
                    >
                      <span className="sr-only">View</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {patientServicesQuery.data &&
                    patientServicesQuery.data?.map((service) => (
                      <tr
                        key={service._id?.toString()}
                        className="even:bg-gray-50"
                      >
                        <td className="hidden lg:table-cell whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3 text-center align-middle truncate">
                          {service._id?.toString()}
                        </td>
                        <td className="md:w-1/5 pl-4 pr-3 whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-center">
                          {service.tests.map((test) => (
                            <div
                              key={test._id.toString()}
                              className="pl-4 md:pl-0 block w-[100px] truncate text-center"
                            >
                              {test.name}
                            </div>
                          ))}
                        </td>
                        <td className="hidden md:table-cell whitespace-wrap px-3 py-4 text-sm text-gray-500 text-center">
                          {stringToDate(service.updatedAt)}
                        </td>
                        <td className="truncate whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-center">
                          <span
                            className={classNames(
                              statusStyles[service!.status],
                              "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize"
                            )}
                          >
                            {sentenceToCaps(service.status)}
                          </span>
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-sm font-medium md:pr-3 text-center">
                          <button
                            onClick={() => setSelectedService(service)}
                            className="inline-flex items-center rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                          >
                            View
                            <span className="sr-only pr-4">
                              , {service._id?.toString()}
                            </span>
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesTable;
