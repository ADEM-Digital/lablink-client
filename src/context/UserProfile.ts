import { useAuth0 } from "@auth0/auth0-react";
import { createContext, useEffect, useState } from "react";
import { ObjectId } from "mongodb";
import axios from "axios";

export type UserProfileContextType = {
  _id?: ObjectId;
  userId?: string;
  name?: string;
  governmentId?: string;
  phone?: string;
  address?: string;
  role?: "patient" | "staff";

};

export const UserProfileContext = createContext<
  UserProfileContextType | undefined
>(undefined);

export const useUserProfileContext = () => {
  const { user, isAuthenticated } = useAuth0();
  const [userProfile, setUserProfile] = useState<
    UserProfileContextType
  >();


  useEffect(() => {
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
            setUserProfile(profileDocuments.data[0]);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    checkUserData();
  }, [user, isAuthenticated]);

  useEffect(() => {
    console.log(userProfile);
  }, [userProfile]);

  return {
    UserProfileContext,
    userProfile,
 
  };
};
