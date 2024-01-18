import { UserCircleIcon, PhoneIcon } from "@heroicons/react/20/solid";
import { classNames } from "../../../utils/stringUtils";
import { ServiceType } from "../../../types/Service";
import { useEffect } from "react";

type PatientInformationPropsType = {
    selectedService: ServiceType | undefined
}
const PatientInformation = ({selectedService} : PatientInformationPropsType) => {
    useEffect(() => {
        console.log(selectedService?.user)
    }, [])
  return (
    <section aria-labelledby="recent-hires-title">
      <div
        className={classNames(
          "overflow-hidden rounded-lg bg-white shadow"
        )}
      >
        <div className="px-0 py-5 sm:px-0 items-center justify-between border-b border-gray-200">
          <div className="px-4 sm-px-6">
            <h2
              id="applicant-information-title"
              className="text-lg font-medium leading-6 text-gray-900"
            >
              Patient Information
            </h2>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Details about the patient
            </p>
          </div>
          <div className="ml-0 mt-4 flex-shrink-0">
            <div className="mt-6 flex w-full flex-none gap-x-4 border-t border-gray-900/5 px-6 pt-6">
              <dt className="flex-none">
                <span className="sr-only">Client</span>
                <UserCircleIcon
                  className="h-6 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </dt>
              <dd className="text-sm font-regular leading-6 text-gray-900">
                {selectedService?.user.name}
              </dd>
            </div>
            <div className="flex w-full flex-none gap-x-4 px-6 pt-6">
              <dt className="flex-none">
                <span className="sr-only">Phone</span>
                <PhoneIcon
                  className="h-6 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </dt>
              <dd className="text-sm font-regular leading-6 text-gray-900">
                {selectedService?.user.phone}
              </dd>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PatientInformation;
