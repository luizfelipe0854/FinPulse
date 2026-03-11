import {
  doc,
  setDoc,
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
  Timestamp,
  deleteDoc,
  orderBy,
  query,
  getDocs,
} from "firebase/firestore";
import { app } from "./config";

const db = getFirestore(app);

interface ICreateTransaction {
  type: "entrada" | "saida";
  amount: number;
  category: string;
  description: string;
  date: Date;
}

export const createUserCollection = async (
  uid: string,
  displayName: string,
  email: string,
): Promise<void> => {
  if (!uid) throw new Error("é necessário informar o uid do usuário");
  if (!email) throw new Error("é necessário informar o email do usuário");

  await setDoc(
    doc(db, "users", uid),
    {
      displayName,
      email,
      currency: "BRL",
      createdAt: serverTimestamp(),
    },
    { merge: true },
  );
};

export const createTransaction = async (
  uid: string,
  data: ICreateTransaction,
): Promise<string> => {
  if (!uid) throw new Error("é necessário informar o uid do usuário");

  if (!data.type) throw new Error("é necessário informar o tipo da transação");

  if (!data.amount || data.amount <= 0)
    throw new Error("o valor da transação deve ser maior que zero");

  if (!data.date) throw new Error("é necessário informar a data da transação");

  const ref = collection(db, "users", uid, "transactions");

  const docRef = await addDoc(ref, {
    ...data,
    date: Timestamp.fromDate(data.date),
    createdAt: serverTimestamp(),
  });

  return docRef.id;
};

//
// GET TRANSACTIONS
//

export const getTransactions = async (
  uid: string,
): Promise<ICreateTransaction[]> => {
  if (!uid) throw new Error("uid is required");

  const ref = collection(db, "users", uid, "transactions");

  const q = query(ref, orderBy("date", "desc"));

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => {
    const data = doc.data();

    return {
      id: doc.id,
      type: data.type,
      amount: data.amount,
      category: data.category,
      description: data.description,
      date: data.date.toDate(),
      createdAt: data.createdAt?.toDate(),
    };
  });
};

//
// DELETE TRANSACTION
//

export const deleteTransaction = async (
  uid: string,
  transactionId: string,
): Promise<void> => {
  if (!uid) throw new Error("uid is required");
  if (!transactionId) throw new Error("transactionId is required");

  const ref = doc(db, "users", uid, "transactions", transactionId);

  await deleteDoc(ref);
};
