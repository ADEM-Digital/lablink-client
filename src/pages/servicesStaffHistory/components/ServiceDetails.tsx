import { FullServiceType } from "../../../types/Service";
import { classNames, sentenceToCaps } from "../../../utils/stringUtils";
import { stringToDate } from "../../../utils/dateUtils";
import {
  BeakerIcon,
  XMarkIcon,
  ArrowUpOnSquareStackIcon,
  EyeIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { statusStyles } from "../../../utils/statusStyles";
import PatientInformation from "./PatientInformation";
import { useState } from "react";
import UploadResults from "./UploadResults";
import DeleteModal from "./DeleteModal";

type ServiceDetailsPropsType = {
  selectedService: FullServiceType | undefined;
  setSelectedService: React.Dispatch<
    React.SetStateAction<FullServiceType | undefined>
  >;
};

const ServiceDetails = ({
  selectedService,
  setSelectedService,
}: ServiceDetailsPropsType) => {
  const [open, setOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

  return (
    <>
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 className="sr-only">Profile</h1>
        {/* Main 3 column grid */}
        <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-3 lg:gap-8">
          {/* Left column */}
          <div className="grid grid-cols-1 gap-4 lg:col-span-2">
            <section aria-labelledby="service-information">
              <div className="bg-white shadow sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6 flex items-center justify-between">
                  <div>
                    <h2
                      id="applicant-information-title"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      Service Information
                    </h2>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">
                      Details about the lab service
                    </p>
                  </div>
                  <div className="ml-4 mt-4 flex gap-2">
                    {selectedService?.status === "pending results" && (
                      <button
                        onClick={() => setIsDeleteModalOpen(true)}
                        type="button"
                        className="flex items-center gap-2 rounded-md bg-red-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-red-600 hover:bg-red-400"
                      >
                        <TrashIcon className="w-4 h-4" />
                        <span className="hidden sm:block">Delete Service</span>
                      </button>
                    )}
                    {selectedService?.status !== "pending results" && (
                      <button
                        onClick={() =>
                          window.open(selectedService?.results, "_blank")
                        }
                        type="button"
                        className="flex items-center gap-2 rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-cyan-600 shadow-sm ring-1 ring-inset ring-cyan-600 hover:bg-gray-50"
                      >
                        <EyeIcon className="w-4 h-4" />
                        <span className="hidden sm:block">View results</span>
                      </button>
                    )}

                    {selectedService?.status === "pending results" && (
                      <button
                        onClick={() => setOpen(!open)}
                        type="button"
                        className="flex items-center gap-2 rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-cyan-600 shadow-sm ring-1 ring-inset ring-cyan-600 hover:bg-gray-50"
                      >
                        <ArrowUpOnSquareStackIcon className="w-4 h-4" />
                        <span className="hidden sm:block">Upload results</span>
                      </button>
                    )}
                    <button
                      onClick={() => setSelectedService(undefined)}
                      type="button"
                      className="relative inline-flex items-center rounded-md bg-cyan-600 px-3 py-2 text-sm font-regular text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600 gap-2"
                    >
                      <XMarkIcon className="w-4 h-4" />
                      <span className="hidden sm:block">Close</span>
                    </button>
                  </div>
                </div>
                <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                  <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">
                        Service Id
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {selectedService?._id?.toString()}
                      </dd>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">
                        Status
                      </dt>
                      <dd className={classNames("mt-1 text-sm text-gray-900")}>
                        <span
                          className={classNames(
                            statusStyles[selectedService!.status],
                            "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize"
                          )}
                        >
                          {selectedService?.status
                            ? sentenceToCaps(selectedService?.status)
                            : ""}
                        </span>
                      </dd>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">
                        Created at
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {selectedService?.createdAt
                          ? stringToDate(selectedService?.createdAt)
                          : ""}
                      </dd>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">
                        Updated at
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {selectedService?.updatedAt
                          ? stringToDate(selectedService.updatedAt)
                          : ""}
                      </dd>
                    </div>

                    <div className="sm:col-span-2">
                      <dt className="text-sm font-medium text-gray-500">
                        Tests
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        <ul
                          role="list"
                          className="divide-y divide-gray-200 rounded-md border border-gray-200"
                        >
                          {selectedService?.tests.map((test) => (
                            <li
                              key={test.name}
                              className="flex items-center justify-between py-3 pl-3 pr-4 text-sm"
                            >
                              <div className="flex w-0 flex-1 items-center">
                                <BeakerIcon
                                  className="h-5 w-5 flex-shrink-0 text-cyan-600"
                                  aria-hidden="true"
                                />
                                <span className="ml-2 w-0 flex-1 truncate">
                                  {test.name}
                                </span>
                              </div>
                              <div className="ml-4 flex-shrink-0">
                                <span className="font-medium text-cyan-600 ">
                                  {test.resultTime}
                                </span>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </dd>
                    </div>
                  </dl>
                </div>
                <div>
                  <button
                    onClick={() =>
                      window.open(selectedService?.results, "_blank")
                    }
                    disabled={selectedService?.status === "pending results"}
                    className={classNames(
                      selectedService?.status === "pending results"
                        ? "bg-red-100 text-red-700"
                        : "bg-gray-50 text-gray-500 hover:text-gray-700 ",
                      "flex justify-center w-full  px-4 py-4 text-center text-sm font-medium sm:rounded-b-lg"
                    )}
                  >
                    {selectedService?.status === "pending results"
                      ? "Results unavailable"
                      : "Download results"}
                  </button>
                </div>
              </div>
            </section>
          </div>
          {/* Right column */}
          <div className="grid grid-cols-1 gap-4">
            <PatientInformation selectedService={selectedService} />
          </div>
        </div>
      </div>
      {open && (
        <UploadResults
          open={open}
          setOpen={setOpen}
          selectedService={selectedService}
          setSelectedService={setSelectedService}
        />
      )}
      {isDeleteModalOpen && (
        <DeleteModal
          open={isDeleteModalOpen}
          setOpen={setIsDeleteModalOpen}
          selectedService={selectedService}
          setSelectedService={setSelectedService}
        />
      )}
    </>
  );
};

export default ServiceDetails;
