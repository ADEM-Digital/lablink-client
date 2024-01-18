import { Menu, Popover, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Fragment } from "react";

import { useAuth0 } from "@auth0/auth0-react";
import { classNames } from "../../utils/stringUtils";
import { useRegistration } from "./hooks";

import { Form, Formik } from "formik";

const userNavigation: { name: string; href: string }[] = [
  // { name: "Sign out", href: "#" }
];

export default function Register() {
  const { user, logout } = useAuth0();
  const { initialValues, handleSubmit, checkingUserProfile } = useRegistration();

  return (
    <>
      {user && !checkingUserProfile && (
        <div className="min-h-full pb-10">
          <Popover
            as="header"
            className="bg-gradient-to-r from-sky-800 to-cyan-600 pb-24 pt-4"
          >
            {({ open }) => (
              <>
                <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                  <div className="relative flex flex-wrap items-center justify-center lg:justify-between">
                    {/* Logo */}
                    <div className="absolute left-0 flex-shrink-0 py-5 lg:static">
                      <a href="#">
                        <span className="sr-only">Lablink</span>
                        <img
                          className="h-8 w-auto"
                          src="/Lablink-logo.png"
                          alt=""
                        />
                      </a>
                    </div>

                    {/* Right section on desktop */}
                    <div className="hidden lg:ml-4 lg:flex lg:items-center lg:py-5 lg:pr-0.5">
                      {/* <button
                type="button"
                className="relative flex-shrink-0 rounded-full p-1 text-cyan-200 hover:bg-white hover:bg-opacity-10 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
              >
                <span className="absolute -inset-1.5" />
                <span className="sr-only">View notifications</span>
                <BellIcon className="h-6 w-6" aria-hidden="true" />
              </button> */}

                      {/* Profile dropdown */}
                      <Menu as="div" className="relative ml-4 flex-shrink-0">
                        <div>
                          <Menu.Button className="relative flex rounded-full bg-white text-sm ring-2 ring-white ring-opacity-20 focus:outline-none focus:ring-opacity-100">
                            <span className="absolute -inset-1.5" />
                            <span className="sr-only">Open user menu</span>
                            <img
                              className="h-8 w-8 rounded-full"
                              src={user?.picture}
                              alt=""
                            />
                          </Menu.Button>
                        </div>
                        <Transition
                          as={Fragment}
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute -right-2 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            {userNavigation.map((item) => (
                              <Menu.Item key={item.name}>
                                {({ active }) => (
                                  <a
                                    href={item.href}
                                    className={classNames(
                                      active ? "bg-gray-100" : "",
                                      "block px-4 py-2 text-sm text-gray-700"
                                    )}
                                  >
                                    {item.name}
                                  </a>
                                )}
                              </Menu.Item>
                            ))}
                            <Menu.Item>
                              <button
                                onClick={() => logout()}
                                className={classNames(
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                Sign out
                              </button>
                            </Menu.Item>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>

                    <div className="w-full py-5 lg:border-t lg:border-white lg:border-opacity-20"></div>

                    {/* Menu button */}
                    <div className="absolute right-0 flex-shrink-0 lg:hidden">
                      {/* Mobile menu button */}
                      <Popover.Button className="relative inline-flex items-center justify-center rounded-md bg-transparent p-2 text-cyan-200 hover:bg-white hover:bg-opacity-10 hover:text-white focus:outline-none focus:ring-2 focus:ring-white">
                        <span className="absolute -inset-0.5" />
                        <span className="sr-only">Open main menu</span>
                        {open ? (
                          <XMarkIcon
                            className="block h-6 w-6"
                            aria-hidden="true"
                          />
                        ) : (
                          <Bars3Icon
                            className="block h-6 w-6"
                            aria-hidden="true"
                          />
                        )}
                      </Popover.Button>
                    </div>
                  </div>
                </div>

                <Transition.Root as={Fragment}>
                  <div className="lg:hidden">
                    <Transition.Child
                      as={Fragment}
                      enter="duration-150 ease-out"
                      enterFrom="opacity-0"
                      enterTo="opacity-100"
                      leave="duration-150 ease-in"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <Popover.Overlay className="fixed inset-0 z-20 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <Transition.Child
                      as={Fragment}
                      enter="duration-150 ease-out"
                      enterFrom="opacity-0 scale-95"
                      enterTo="opacity-100 scale-100"
                      leave="duration-150 ease-in"
                      leaveFrom="opacity-100 scale-100"
                      leaveTo="opacity-0 scale-95"
                    >
                      <Popover.Panel
                        focus
                        className="absolute inset-x-0 top-0 z-30 mx-auto w-full max-w-3xl origin-top transform p-2 transition"
                      >
                        <div className="divide-y divide-gray-200 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                          <div className="pb-2 pt-3">
                            <div className="flex items-center justify-between px-4">
                              <div>
                                <img
                                  className="h-8 w-auto"
                                  src="/Lablink-log.png"
                                  alt="Lablink"
                                />
                              </div>
                              <div className="-mr-2">
                                <Popover.Button className="relative inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-500">
                                  <span className="absolute -inset-0.5" />
                                  <span className="sr-only">Close menu</span>
                                  <XMarkIcon
                                    className="h-6 w-6"
                                    aria-hidden="true"
                                  />
                                </Popover.Button>
                              </div>
                            </div>
                            {/* <div className="mt-3 space-y-1 px-2">
                        {navigation.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className="block rounded-md px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-100 hover:text-gray-800"
                          >
                            {item.name}
                          </a>
                        ))}
                      </div> */}
                          </div>
                          <div className="pb-2 pt-4">
                            <div className="flex items-center px-5">
                              <div className="flex-shrink-0">
                                <img
                                  className="h-10 w-10 rounded-full"
                                  src={user?.picture}
                                  alt=""
                                />
                              </div>
                              <div className="ml-3 min-w-0 flex-1">
                                <div className="truncate text-base font-medium text-gray-800">
                                  {user?.name}
                                </div>
                                <div className="truncate text-sm font-medium text-gray-500">
                                  {user?.email}
                                </div>
                              </div>
                              <button
                                type="button"
                                className="relative ml-auto flex-shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
                              >
                                <span className="absolute -inset-1.5" />
                                <span className="sr-only">
                                  View notifications
                                </span>
                                <BellIcon
                                  className="h-6 w-6"
                                  aria-hidden="true"
                                />
                              </button>
                            </div>
                            <div className="mt-3 space-y-1 px-2">
                              {userNavigation.map((item) => (
                                <a
                                  key={item.name}
                                  href={item.href}
                                  className="block rounded-md px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-100 hover:text-gray-800"
                                >
                                  {item.name}
                                </a>
                              ))}
                              <button
                                onClick={() => logout()}
                                className={classNames(
                                  "block rounded-md px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-100 hover:text-gray-800"
                                )}
                              >
                                Sign out
                              </button>
                            </div>
                          </div>
                        </div>
                      </Popover.Panel>
                    </Transition.Child>
                  </div>
                </Transition.Root>
              </>
            )}
          </Popover>

          <div className="rounded-lg bg-white shadow max-w-[90%] mx-auto mt-10 sm:my-5 md:my-5 lg:my-5">
            <Formik
              initialValues={initialValues}
              onSubmit={(values) => {
                handleSubmit(values)
              }}
            >
              {(props) => (
                <Form className="-mt-24 px-4 pt-4 pb-8">
                  <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">
                      <h2 className="text-base font-semibold leading-7 text-gray-900">
                        Profile
                      </h2>
                      <p className="mt-1 text-sm leading-6 text-gray-600">
                        We need additional information to complete your patient
                        profile.
                      </p>
                    </div>

                    <div className="border-b border-gray-900/10 pb-12">
                      <h2 className="text-base font-semibold leading-7 text-gray-900">
                        Personal Information
                      </h2>
                      <p className="mt-1 text-sm leading-6 text-gray-600">
                        Use a permanent address where you can receive mail.
                      </p>

                      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-3">
                          <label
                            htmlFor="first-name"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            First name
                          </label>
                          <div className="mt-2">
                            <input
                              type="text"
                              name="firstName"
                              id="firstName"
                              onChange={props.handleChange}
                              onBlur={props.handleBlur}
                              value={props.values.firstName}
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>

                        <div className="sm:col-span-3">
                          <label
                            htmlFor="last-name"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Last name
                          </label>
                          <div className="mt-2">
                            <input
                              type="text"
                              name="lastName"
                              id="lastName"
                              onChange={props.handleChange}
                              onBlur={props.handleBlur}
                              value={props.values.lastName}
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>

                        <div className="sm:col-span-3">
                          <label
                            htmlFor="email"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Email address
                          </label>
                          <div className="mt-2">
                            <input
                              id="email"
                              name="email"
                              type="email"
                              onChange={props.handleChange}
                              onBlur={props.handleBlur}
                              value={props.values.email}
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>
                        <div className="sm:col-span-3">
                          <label
                            htmlFor="text"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Government Id
                          </label>
                          <div className="mt-2">
                            <input
                              id="governmentId"
                              name="governmentId"
                              type="text"
                              onChange={props.handleChange}
                              onBlur={props.handleBlur}
                              value={props.values.governmentId}
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>
                        <div className="sm:col-span-3">
                          <label
                            htmlFor="country"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Country
                          </label>
                          <div className="mt-2">
                            <select
                              id="country"
                              name="country"
                              onChange={props.handleChange}
                              onBlur={props.handleBlur}
                              value={props.values.country}
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:max-w-xs sm:text-sm sm:leading-6"
                            >
                              <option value=""></option>
                              <option>United States</option>
                              <option>Canada</option>
                              <option>Mexico</option>
                            </select>
                          </div>
                        </div>

                        <div className="col-span-full">
                          <label
                            htmlFor="street-address"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Street address
                          </label>
                          <div className="mt-2">
                            <input
                              type="text"
                              name="address"
                              id="address"
                              onChange={props.handleChange}
                              onBlur={props.handleBlur}
                              value={props.values.address}
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>

                        <div className="sm:col-span-2 sm:col-start-1">
                          <label
                            htmlFor="city"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            City
                          </label>
                          <div className="mt-2">
                            <input
                              type="text"
                              name="city"
                              id="city"
                              onChange={props.handleChange}
                              onBlur={props.handleBlur}
                              value={props.values.city}
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>

                        <div className="sm:col-span-2">
                          <label
                            htmlFor="state"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            State / Province
                          </label>
                          <div className="mt-2">
                            <input
                              type="text"
                              name="state"
                              id="state"
                              onChange={props.handleChange}
                              onBlur={props.handleBlur}
                              value={props.values.state}
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>

                        <div className="sm:col-span-2">
                          <label
                            htmlFor="postal-code"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            ZIP / Postal code
                          </label>
                          <div className="mt-2">
                            <input
                              type="text"
                              name="postalCode"
                              id="postalCode"
                              onChange={props.handleChange}
                              onBlur={props.handleBlur}
                              value={props.values.postalCode}
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button
                      type="button"
                      className="text-sm font-semibold leading-6 text-gray-900"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="rounded-md bg-cyan-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
                    >
                      Save
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      )}
    </>
  );
}
