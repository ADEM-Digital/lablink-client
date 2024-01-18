import ServicesTable from "./components/ServicesTable";
import RecentServices from "./components/RecentServices";
import { usePatientHistory } from "./hooks";
import ServiceDetails from "./components/ServiceDetails";

const PatientHistory = () => {
  const { patientServicesQuery, selectedService, setSelectedService } = usePatientHistory();
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8 mt-10 lg:mt-0">
      <h1 className="sr-only">Profile</h1>
      {/* Main 3 column grid */}
      <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-3 lg:gap-8">
        {/* Left column */}
        <div className="grid grid-cols-1 gap-4 lg:col-span-2">
          {!selectedService && <ServicesTable patientServicesQuery={patientServicesQuery} setSelectedService={setSelectedService} />}
          {selectedService && <ServiceDetails selectedService={selectedService} setSelectedService={setSelectedService}/>}
        </div>

        {/* Right column */}
        <div className="grid grid-cols-1 gap-4">
          {/* Recent Tests */}
          <RecentServices patientServicesQuery={patientServicesQuery} setSelectedService={setSelectedService}/>
        </div>
      </div>
    </div>
  );
};

export default PatientHistory;
