import { ObjectId } from "mongodb"
import { TestType } from "./Test";

export type ServiceType = {
  _id?: ObjectId | string;
  user: ObjectId | string;
  status: "pending results" | "results uploaded" | "opened";
  tests: (TestType | string)[];
  results?: string;
  createdAt: string;
  updatedAt: string;
};
