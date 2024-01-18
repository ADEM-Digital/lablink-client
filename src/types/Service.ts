import { ObjectId } from "mongodb";
import { TestType } from "./Test";
import { UserProfile } from "auth0";

export type ServiceType = {
  _id?: ObjectId | string;
  user: UserProfile | ObjectId | string;
  status: "pending results" | "results uploaded" | "opened";
  tests: (TestType | string)[];
  results?: string;
  createdAt: string;
  updatedAt: string;
};

export type FullServiceType = {
  _id?: ObjectId | string;
  user: UserProfile;
  status: "pending results" | "results uploaded" | "opened";
  tests: TestType[];
  results?: string;
  createdAt: string;
  updatedAt: string;
};
