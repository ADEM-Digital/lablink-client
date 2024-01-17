import { ObjectId } from "mongodb";
import { User } from "./User";

export type UserProfileType = {
  _id?: ObjectId;
  userId?: string;
  name?: string;
  governmentId?: string;
  phone?: string;
  address?: string;
  role?: "patient" | "staff";
  user?: User
};
