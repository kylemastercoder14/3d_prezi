import { db } from "@/config/FirebaseConfig";
import { collection, addDoc } from "firebase/firestore";

export const createUser = async (
  clerkId: string,
  fullName: string,
  email: string,
  password: string
) => {
  try {
    const userCollectionRef = collection(db, "Users");

    // Add user document to the 'Users' collection
    await addDoc(userCollectionRef, {
      clerkId,
      fullName,
      email,
      password,
      profile: "",
      createdAt: new Date(), // Add a timestamp when the user is created
    });

    return { status: 200, message: "User added successfully" };
  } catch (error) {
    console.error("Error adding user:", error);
    return { status: 400, message: error };
  }
};
