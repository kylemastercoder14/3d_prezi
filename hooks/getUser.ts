import { db } from "@/config/FirebaseConfig";
import { useUser } from "@clerk/clerk-expo";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useState, useEffect } from "react";

interface FirestoreUser {
  clerkId: string;
  email: string;
  fullName: string;
  profile: string;
  birthday: string;
  createdAt: string;
}

export const useGetUser = () => {
  const { user } = useUser();
  const [userData, setUserData] = useState<FirestoreUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      const id = user.id || "";

      try {
        const q = query(collection(db, "Users"), where("clerkId", "==", id));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const userDocs = querySnapshot.docs.map((doc) => doc.data() as FirestoreUser);
          setUserData(userDocs[0]);
        } else {
          setUserData(null);
        }
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user]);

  return { userData, loading, error };
};
