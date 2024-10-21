import {
  DocumentData,
  FieldValue,
  FirestoreDataConverter,
  getFirestore,
  QueryDocumentSnapshot,
} from "firebase-admin/firestore";
import * as m from "./types";
import { initFirebase } from "../../firebase.server";

const readFirestoreConverter: FirestoreDataConverter<m.TestDocApp> = {
  toFirestore: (doc: m.TestDocApp) => {
    return {
      id: doc.id,
      name: doc.name,
      description: doc.description,
    };
  },
  fromFirestore: (snapshot: QueryDocumentSnapshot<m.TestDocDbModel>) => {
    return {
      id: snapshot.id,
      name: snapshot.data().name,
      description: snapshot.data().description,
      createdDate: snapshot.data().createdDate.toDate(),
      updatedDate: snapshot.data().updatedDate.toDate(),
    };
  },
};

export const testCollectionDb = () => {
  const fireApp = initFirebase();
  const firestore = getFirestore(fireApp);

  // For reads
  const collectionRead = firestore
    .collection(`/organizations`)
    .withConverter(readFirestoreConverter);

  const collectionWrite = firestore.collection(`/test`);

  const create = async (data: m.TestDocDbModel) => {
    const docRef = collectionWrite.doc();
    const writeData = {
      ...data,
      createdDate: FieldValue.serverTimestamp(),
      updatedDate: FieldValue.serverTimestamp(),
    };
    await docRef.set(writeData);
    return docRef.id;
  };

  const read = async (id: string) => {
    const docSnap = await collectionRead.doc(id).get();
    const doc = docSnap.data();
    if (!doc) {
      return null;
    }
    return doc;
  };
  const update = async ({
    id,
    updateData,
  }: {
    id: string;
    updateData: DocumentData;
  }) => {
    const docRef = collectionWrite.doc(id);
    await docRef.update(updateData);
  };

  const list = async () => {
    const querySnapshot = await collectionRead.get();
    const docs = querySnapshot.docs.map((doc) => doc.data());
    return docs;
  };

  return {
    read,
    list,
    create,
    update,
  };
};
