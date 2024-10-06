import { organizationDb } from "../firebase/db/organization/crud.server";

export const db = {
  organizations: organizationDb,
};
