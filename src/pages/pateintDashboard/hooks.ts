import { useAuth0 } from "@auth0/auth0-react";
import { useQuery } from "react-query";
import axios, { AxiosResponse } from "axios";
import { ServiceType } from "../../types/Service";

export type DashboardDataType = {
  availableResults: number;
  pendingResults: number;
  recentResultsDetails: ServiceType[];
  recentResults: number;
};

export const usePatientDashboard = () => {
  const { user } = useAuth0();

  const dashboardQuery = useQuery(
    "patientDashboardData",
    async () => {
      try {
        console.log(`${import.meta.env.VITE_API_URL}/v1/dashboards/patient/${user?.sub}`)
        const response: AxiosResponse<DashboardDataType> = await axios.get(
          `${import.meta.env.VITE_API_URL}/v1/dashboards/patient/${user?.sub}`
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
    dashboardQuery,
  };
};
