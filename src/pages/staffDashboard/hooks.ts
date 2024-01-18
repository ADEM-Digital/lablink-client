import { useAuth0 } from "@auth0/auth0-react";
import axios, { AxiosResponse } from "axios";
import { useQuery } from "react-query";
import { FullServiceType } from "../../types/Service";

export type StaffDashboardDataType = {
    completedServices: number;
    unopenedServices: number;
    pendingServices: number;
    recentServices: FullServiceType[];
  };
export const useStaffDashboard = () => {
  const { user, isLoading } = useAuth0();

  const staffDashboardQuery = useQuery("staffDashboardData", async () => {
    try {
        const response: AxiosResponse<StaffDashboardDataType> = await axios.get(`${import.meta.env.VITE_API_URL}/v1/dashboards/staff/${user?.sub}`);

        return response.data
    } catch (error) {
        console.log(error)
    }
  }, {
    enabled: !isLoading && user?.sub !== undefined
  });

  return {
    staffDashboardQuery
  }
};
