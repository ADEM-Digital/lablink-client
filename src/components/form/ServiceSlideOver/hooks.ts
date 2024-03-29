import axios, { AxiosResponse } from "axios";
import { useQuery, useQueryClient } from "react-query";
import { UserProfileType } from "../../../types/UserProfile";
import { TestType } from "../../../types/Test";
import { ServiceType } from "../../../types/Service";

type FormDataType = {
  patientList: UserProfileType[];
  testList: TestType[];
};

type formData = {
  selectedPatient: { label: string; value: string } | undefined;
  selectedTests: { label: string; value: string }[];
};

export const useSlideOverForm = () => {
  const queryClient = useQueryClient()
  const saveService = async (newService: ServiceType) => {
    try {
      const response: AxiosResponse<ServiceType> = await axios.post(
        `${import.meta.env.VITE_API_URL}/v1/services`,
        newService
      );

      queryClient.refetchQueries("staffServices");
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };
 
  const ServiceDataQuery = useQuery("serviceFormData", async () => {
    try {
      const response: AxiosResponse<FormDataType> = await axios.get(
        `${import.meta.env.VITE_API_URL}/v1/services/formData`
      );

      return response.data;
    } catch (error) {
      console.log(error);
    }
  });

  const initialValues: formData = {
    selectedPatient: undefined,
    selectedTests: [],
  };

  return {
    ServiceDataQuery,
    initialValues,
    saveService,
  };
};
