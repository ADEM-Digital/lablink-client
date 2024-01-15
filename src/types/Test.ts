import { ObjectId } from "mongodb"

export type TestType = {
    _id: ObjectId;
    name: string;
    description: string;
    resultTime: string;
}