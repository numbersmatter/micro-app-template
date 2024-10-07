import { organizationDb } from "../firebase/firestore/organization/crud.server";

export const db = {
  organizations: organizationDb,
};
