import { useQuery } from "react-query";
import axios, { AxiosResponse } from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { FullServiceType } from "../../types/Service";
import { useState } from "react";

export const usePatientHistory = () => {
  const { user } = useAuth0();
    
  const [selectedService, setSelectedService] = useState<FullServiceType>()

  const patientServicesQuery = useQuery(
    "patientHistoryQuery",
    async () => {
      try {
        const response: AxiosResponse<FullServiceType[]> = await axios.get(
          `${import.meta.env.VITE_API_URL}/v1/services/user/${user?.sub}`
        );
        return response.data;
      } catch (error) {
        console.log(error);
      }
    },
    {
      enabled: user?.sub !== undefined,
    }
  );

  return {
    patientServicesQuery,
    selectedService,
    setSelectedService
  };
};
