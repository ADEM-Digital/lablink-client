import { useAuth0 } from "@auth0/auth0-react";
import axios, { AxiosResponse } from "axios";
import { useQuery } from "react-query";
import { ServiceType } from "../../types/Service";
import { useEffect, useState } from "react";

export type ServiceFilterType = {
  createdAt?: string;
  status?: "pending results" | "results uploaded" | "opened";
};

export const useServicesStaffHistory = () => {
  
  const { user } = useAuth0();
  const [filters, setFilters] = useState<ServiceFilterType>({
    createdAt: undefined,
    status: undefined,
  });
  const [selectedService, setSelectedService] = useState<ServiceType>()

  const staffServicesQuery = useQuery(
    "staffServices",
    async () => {
      try {
        const response: AxiosResponse<ServiceType[]> = await axios.get(
          `${import.meta.env.VITE_API_URL}/v1/services/user/${user?.sub}`,
          {
            params: filters,
          }
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

  useEffect(() => {
    console.log(filters);
    staffServicesQuery.refetch();
  }, [filters]);

  return {
    staffServicesQuery,
    filters,
    setFilters,
    selectedService,
    setSelectedService
  };
};
