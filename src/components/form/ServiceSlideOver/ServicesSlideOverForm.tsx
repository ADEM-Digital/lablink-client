import { Context, Fragment, useContext } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Select from "react-select";

import {
  ServicesSlideOverContext,
  ServicesSlideOverContextType,
} from "../../../context/ServiceSlideOver";

import { Form, Formik } from "formik";
import { useSlideOverForm } from "./hooks";
import { classNames } from "../../../utils/stringUtils";
import DotLoaderSpinner from "../../spinners/DotLoader";
import { useQueryClient } from "react-query";





export default function ServicesSlideOverForm() {
  
  const { ServiceDataQuery, initialValues, saveService } =
    useSlideOverForm();

  const { isServicesSlideOverOpen, setIsServicesSlideOverOpen } = useContext(
    ServicesSlideOverContext as Context<ServicesSlideOverContextType>
  );

  const queryClient = useQueryClient();

  return (
    <Transition.Root show={isServicesSlideOverOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={setIsServicesSlideOverOpen}
      >
        <div className="fixed inset-0" />

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-2xl">
                  <Formik
                    initialValues={initialValues}
                    onSubmit={async (values, actions) => {
                      
                      const createdService = await saveService({
                        user: values.selectedPatient?.value as string,
                        status: "pending results",
                        tests: values.selectedTests.map((test) => test.value),
                        createdAt: new Date().toString(),
                        updatedAt: new Date().toString(),
                      });

                      actions.setSubmitting(false);
                      console.log(createdService);
                      queryClient.refetchQueries({
                        queryKey: ["staffDashboardData"],
                      });
                      setIsServicesSlideOverOpen(false);
                    }}
                  >
                    {(props) => (
                      <>
                        <Form
                          className={classNames(
                            props.isSubmitting ? "" : "",
                            "flex h-full flex-col overflow-y-scroll bg-white shadow-xl"
                          )}
                        >
                          <div className="flex-1">
                            {/* Header */}
                            <div className="bg-gray-50 px-4 py-6 sm:px-6">
                              <div className="flex items-start justify-between space-x-3">
                                <div className="space-y-1">
                                  <Dialog.Title className="text-base font-semibold leading-6 text-gray-900">
                                    New service
                                  </Dialog.Title>
                                  <p className="text-sm text-gray-500">
                                    Get started by filling in the information
                                    below to create your new service.
                                  </p>
                                </div>
                                <div className="flex h-7 items-center">
                                  <button
                                    type="button"
                                    className="relative text-gray-400 hover:text-gray-500"
                                    onClick={() =>
                                      setIsServicesSlideOverOpen(false)
                                    }
                                  >
                                    <span className="absolute -inset-2.5" />
                                    <span className="sr-only">Close panel</span>
                                    <XMarkIcon
                                      className="h-6 w-6"
                                      aria-hidden="true"
                                    />
                                  </button>
                                </div>
                              </div>
                            </div>

                            {/* Divider container */}
                            <div className="space-y-6 py-6 sm:space-y-0 sm:divide-y sm:divide-gray-200 sm:py-0">
                              {/* Patient name */}
                              <div className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                                <div>
                                  <label
                                    htmlFor="selectedPatient"
                                    className="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5"
                                  >
                                    Patient name
                                  </label>
                                </div>
                                <div className="sm:col-span-2">
                                  <Select
                                    onChange={(value) =>
                                      props.setFieldValue(
                                        "selectedPatient",
                                        value
                                      )
                                    }
                                    name="selectedPatient"
                                    options={ServiceDataQuery.data?.patientList.map(
                                      (patient) => {
                                        return {
                                          label: `${patient.name} - ${patient.governmentId}`,
                                          value: patient._id?.toString(),
                                        };
                                      }
                                    )}
                                  />
                                </div>
                              </div>

                              {/* Tests */}
                              <div className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                                <div>
                                  <label
                                    htmlFor="project-name"
                                    className="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5"
                                  >
                                    Selected tests
                                  </label>
                                </div>
                                <div className="sm:col-span-2">
                                  <Select
                                    onChange={(value) =>
                                      props.setFieldValue(
                                        "selectedTests",
                                        value
                                      )
                                    }
                                    name="selectedTests"
                                    options={ServiceDataQuery.data?.testList.map(
                                      (test) => ({
                                        label: test.name,
                                        value: test._id.toString(),
                                      })
                                    )}
                                    isMulti
                                  />
                                  {/* <input
                                  type="text"
                                  name="patient-tests"
                                  id="patient-tests"
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
                                /> */}
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Action buttons */}
                          <div className="flex-shrink-0 border-t border-gray-200 px-4 py-5 sm:px-6">
                            <div className="flex justify-end space-x-3">
                              <button
                                type="button"
                                className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                onClick={() =>
                                  setIsServicesSlideOverOpen(false)
                                }
                              >
                                Cancel
                              </button>
                              <button
                                type="submit"
                                className="inline-flex justify-center rounded-md bg-cyan-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
                              >
                                Create
                              </button>
                            </div>
                          </div>
                        </Form>
                        {props.isSubmitting && (
                        <div className="absolute top-0 left-16 z-20 flex flex-col items-center justify-center h-full w-full bg-cyan-600/20 gap-10">
                          <DotLoaderSpinner />
                          <p className="text-gray-600">Please wait while we process the request...</p>
                        </div>
                        )}
                      </>
                    )}
                  </Formik>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
