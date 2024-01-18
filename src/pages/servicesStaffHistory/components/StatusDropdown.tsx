import { Fragment, useEffect, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { classNames, sentenceToCaps } from '../../../utils/stringUtils'
import { ServiceFilterType } from '../hooks'


const statusList: {id: number; name: "pending results" | "results uploaded" | "opened" ;}[] = [
  { id: 1, name: 'pending results' },
  { id: 2, name: 'results uploaded' },
  { id: 3, name: 'opened' },

]

type StatusDropdownPropsType = {
    filters: ServiceFilterType;
    setFilters: React.Dispatch<React.SetStateAction<ServiceFilterType>>;
}

export default function StatusDropdown({filters, setFilters} : StatusDropdownPropsType) {
    
  const [selected, setSelected] = useState<{id: number; name: "pending results" | "results uploaded" | "opened" ;} | undefined>()
  


  useEffect(() => {
    if(filters.status) {
        const filteredStatus = statusList.find((status) => status.name === filters.status);
        if(filteredStatus) setSelected(filteredStatus)
    }
    
  }, [])
  return (
    <Listbox value={selected} onChange={(e): void => {
        setFilters({...filters, status: e.name})
        setSelected(e)
    }}>
      {({ open }) => (
        <>
          
          <div className="relative mt-2">
            <Listbox.Button className="min-h-[34px] relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-600 sm:text-sm sm:leading-6">
              <span className="block truncate">{selected?.name ? sentenceToCaps(selected?.name) : ""}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className={`fixed z-10 mt-1 w-[315px] max-h-60 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm`}>
                {statusList.map((status) => (
                  <Listbox.Option
                    key={status.id}
                    className={({ active }) =>
                      classNames(
                        active ? 'bg-cyan-600 text-white' : 'text-gray-900',
                        'relative cursor-default select-none py-2 pl-3 pr-9'
                      )
                    }
                    value={status}
                  >
                    {({ selected, active }) => (
                      <>
                        <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                          {sentenceToCaps(status.name)}
                        </span>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? 'text-white' : 'text-cyan-600',
                              'absolute inset-y-0 right-0 flex items-center pr-4'
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  )
}
