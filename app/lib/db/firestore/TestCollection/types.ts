import { Timestamp } from "firebase-admin/firestore";

export type TestDocApp = {
  id: string;
  name: string;
  description: string;
  createdDate: Date;
  updatedDate: Date;
};

export type TestDocDbModel = {
  name: string;
  description: string;
  createdDate: Timestamp;
  updatedDate: Timestamp;
};

export type TestDocCreate = {
  name: string;
  description: string;
};
