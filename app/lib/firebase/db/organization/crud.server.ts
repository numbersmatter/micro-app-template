import {
  FieldValue,
  FirestoreDataConverter,
  getFirestore,
  QueryDocumentSnapshot,
} from "firebase-admin/firestore";
import * as m from "./types";
import { initFirebase } from "../../firebase.server";

const readFirestoreConverter: FirestoreDataConverter<m.OrganizationApp> = {
  toFirestore: (organization: m.OrganizationApp) => {
    return {
      id: organization.id,
      name: organization.name,
      description: organization.description,
    };
  },
  fromFirestore: (snapshot: QueryDocumentSnapshot<m.OrganizationDb>) => {
    return {
      id: snapshot.id,
      name: snapshot.data().name,
      description: snapshot.data().description,
      createdDate: snapshot.data().createdDate.toDate(),
      updatedDate: snapshot.data().updatedDate.toDate(),
    };
  },
};

export const organizationDb = () => {
  const fireApp = initFirebase();
  const firestore = getFirestore(fireApp);
  const collectionRead = firestore
    .collection(`/organizations`)
    .withConverter(readFirestoreConverter);

  const read = async (id: string) => {
    const docSnap = await collectionRead.doc(id).get();
    const doc = docSnap.data();
    if (!doc) {
      return null;
    }
    return doc;
  };

  const list = async () => {
    const querySnapshot = await collectionRead.get();
    const docs = querySnapshot.docs.map((doc) => doc.data());
    return docs;
  };

  const collectionWrite = firestore.collection(`/organizations`);
  const create = async (data: m.OrganizationDb) => {
    const docRef = collectionWrite.doc();
    const writeData = {
      ...data,
      createdDate: FieldValue.serverTimestamp(),
      updatedDate: FieldValue.serverTimestamp(),
    };
    await docRef.set(writeData);
    return docRef.id;
  };

  return {
    read,
    list,
    create,
  };
};
