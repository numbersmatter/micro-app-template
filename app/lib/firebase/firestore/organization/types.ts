import { Timestamp } from "firebase-admin/firestore";

export type OrganizationApp = {
  id: string;
  name: string;
  description: string;
  createdDate: Date;
  updatedDate: Date;
};

export type OrganizationDb = {
  name: string;
  description: string;
  createdDate: Timestamp;
  updatedDate: Timestamp;
};

export type OrganizationCreate = {
  name: string;
  description: string;
};
