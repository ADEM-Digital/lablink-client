import { ObjectId } from "mongodb"
import { TestType } from "./Test";

export type ServiceType = {
  _id: ObjectId;
  user: ObjectId;
  status: "pending results" | "results uploaded" | "opened";
  tests: TestType[];
  results?: string;
  createdAt: Date;
  updatedAt: Date;
};
