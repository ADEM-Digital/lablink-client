import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";

import {
  FunnelIcon,
  //   PhoneIcon,
  //   PlayCircleIcon,
} from "@heroicons/react/20/solid";
import { CalendarDaysIcon, QueueListIcon } from "@heroicons/react/24/outline";
import StatusDropdown from "./StatusDropdown";
import { ServiceFilterType } from "../hooks";

// const callsToAction = [
//   { name: "Watch demo", href: "#", icon: PlayCircleIcon },
//   { name: "Contact sales", href: "#", icon: PhoneIcon },
// ];

type FilterMenuPropsType = {
    filters: ServiceFilterType;
    setFilters: React.Dispatch<React.SetStateAction<ServiceFilterType>>;
}

export default function FilterMenu({filters, setFilters} : FilterMenuPropsType) {
  return (
    <Popover className="relative">
      <Popover.Button className="flex items-center gap-2 rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-cyan-600 shadow-sm ring-1 ring-inset ring-cyan-600 hover:bg-gray-50">
        <FunnelIcon className="w-4 h-4" />
        <span>Filters</span>
      </Popover.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Popover.Panel className="absolute left-1/2 z-10 mt-5 flex w-screen max-w-max -translate-x-1/2 px-4">
          <div className="w-screen max-w-md flex-auto overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5">
            <div className="p-4">
              <form>
                {/* Date filter */}
                <div className=" relative flex items-center gap-x-6 rounded-lg p-4 hover:bg-gray-50">
                  <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                    <CalendarDaysIcon
                      className="h-6 w-6 text-gray-600 group-hover:text-cyan-600"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">
                      Date{" "}
                      <span className="mt-0 text-gray-600 font-normal">
                        {" "}
                        - Filter services by date
                      </span>
                      
                    </p>
                    <input
                        
                      type="date"
                      name="date"
                      id="date"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
                      placeholder="Select a date"
                      onChange={(e) => setFilters({...filters, createdAt: e.currentTarget.value})}
                      value={filters.createdAt}
                    />
                  </div>
                </div>
                {/* Status filter */}
                <div className=" relative flex items-center gap-x-6 rounded-lg p-4 hover:bg-gray-50">
                  <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                    <QueueListIcon
                      className="h-6 w-6 text-gray-600 group-hover:text-cyan-600"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">
                      Status{" "}
                      <span className="mt-0 text-gray-600 font-normal">
                        {" "}
                        - Filter services by status
                      </span>
                      
                    </p>
                    <StatusDropdown filters={filters} setFilters={setFilters}/>
                  </div>
                </div>
              </form>
            </div>
            {/* <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50">
              {callsToAction.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="flex items-center justify-center gap-x-2.5 p-3 font-semibold text-gray-900 hover:bg-gray-100"
                >
                  <item.icon
                    className="h-5 w-5 flex-none text-gray-400"
                    aria-hidden="true"
                  />
                  {item.name}
                </a>
              ))}
            </div> */}
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}
