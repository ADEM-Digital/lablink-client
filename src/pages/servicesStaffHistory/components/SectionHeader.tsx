import { PlusIcon } from '@heroicons/react/24/outline'
import FilterMenu from './FilterMenu'
import { ServiceFilterType } from '../hooks';
import { Context, useContext, useEffect } from 'react';
import { ServicesSlideOverContext, ServicesSlideOverContextType } from '../../../context/ServiceSlideOver';
import { ServiceType } from '../../../types/Service';

type SectionHeaderPropsType = {
    filters: ServiceFilterType;
    setFilters: React.Dispatch<React.SetStateAction<ServiceFilterType>>;
    selectedService: ServiceType | undefined;
}

const SectionHeader = ({filters, setFilters, selectedService} : SectionHeaderPropsType) => {
    const {setIsServicesSlideOverOpen} = useContext(ServicesSlideOverContext as Context<ServicesSlideOverContextType>)

    useEffect(() => {
        console.log(selectedService)
    }, [selectedService])
  return (
    <div className="bg-white shadow">
      <div className="px-4 sm:px-6 lg:mx-auto lg:max-w-6xl lg:px-8">
        <div className="py-6 md:flex md:items-center md:justify-between lg:border-t lg:border-gray-200">
          <div className="min-w-0 flex-1">
            {/* Profile */}
            <div className="flex items-center">
              
              <div>
                <div className="flex items-center">
               
                  <h1 className="ml-3 text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:leading-9">
                    {`Service history`}
                  </h1>
                </div>
                
              </div>
            </div>
          </div>
          <div className="mt-6 flex space-x-3 md:ml-4 md:mt-0">
             {selectedService === undefined && (<FilterMenu filters={filters} setFilters={setFilters}/>)}
            <button
              onClick={() => setIsServicesSlideOverOpen(true)}
              type="button"
              className="inline-flex gap-2 items-center rounded-md bg-cyan-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
            >
              <PlusIcon className="w-4 h-4" />
              Add service
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SectionHeader