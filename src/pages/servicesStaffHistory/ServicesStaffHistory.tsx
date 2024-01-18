import SectionHeader from "./components/SectionHeader";
import ServiceDetails from "./components/ServiceDetails";
import ServicesList from "./components/ServicesList";
import { useServicesStaffHistory } from "./hooks";

const ServicesStaffHistory = () => {
  const { staffServicesQuery, filters, setFilters, selectedService, setSelectedService } = useServicesStaffHistory();
  return (
    <>
      <SectionHeader filters={filters} setFilters={setFilters} selectedService={selectedService}/>
      <div className="mt-8">
        {!selectedService && <ServicesList staffServicesQuery={staffServicesQuery} setSelectedService={setSelectedService} />}
        {selectedService && <ServiceDetails selectedService={selectedService} setSelectedService={setSelectedService}/>}
      </div>
    </>
  );
};

export default ServicesStaffHistory;
