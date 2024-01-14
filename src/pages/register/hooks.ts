import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type formValues = {
  firstName?: string;
  lastName?: string;
  email?: string;
  governmentId?: string;
  country?: string;
  address?: string;
  city?: string;
  state?: string;
  postalCode?: string;
};

export const useRegistration = () => {
  const [checkingUserProfile, setCheckingUserProfile] = useState(true);
  const { user } = useAuth0();
  const navigate = useNavigate();

  const handleSubmit = async (values: formValues) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/v1/userProfiles`,
        {
          userId: user?.sub,
          name: `${values.firstName} ${values.lastName}`,
          ...values,
          address: `${values.address}. ${values.city}, ${values.state} ${values.postalCode}`,
          role: "patient",
        }
      );

      console.log(response.data);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const initialValues: formValues = {
    firstName: user?.given_name,
    lastName: user?.family_name,
    email: user?.email,
    governmentId: undefined,
    country: undefined,
    address: undefined,
    city: undefined,
    state: undefined,
    postalCode: undefined,
  };

  useEffect(() => {
    if (user?.sub) {
      console.log(user.sub);
      const checkUserData = async () => {
        try {
          if (user?.sub) {
            const profileDocuments = await axios.get(
              `${import.meta.env.VITE_API_URL}/v1/userProfiles`,
              {
                params: {
                  userId: user.sub,
                },
              }
            );

            if (profileDocuments.data.length > 0) {
              navigate("/");
            }
            setCheckingUserProfile(false)
          }
        } catch (error) {
          console.log(error);
        }
      };
      checkUserData();
    }
  }, [user, navigate]);

  return { initialValues, handleSubmit, checkingUserProfile };
};
