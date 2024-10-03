/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
import {
  View,
  Text,
  FlatList,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/config/FirebaseConfig";
import { useRouter } from "expo-router";
import { useGetUser } from "@/hooks/getUser";

type RecentTopicProps = {
  data: { id: string; name: string; image: string; status: string }[];
};

const RecentTopic = ({ data }: RecentTopicProps) => {
  const router = useRouter();
  const { userData } = useGetUser();
  const { width } = Dimensions.get("window");
  const itemWidth = width / 1 - 100;

  const [progressData, setProgressData] = useState<
    { id: string; progress: number }[]
  >([]);

  useEffect(() => {
    const fetchProgress = async () => {
      if (!userData?.clerkId) return; // Make sure userData is available

      const newProgressData = [];

      // Fetch the user data to get completed review question IDs
      const userRef = collection(db, "Users");
      const userQuery = query(
        userRef,
        where("clerkId", "==", userData?.clerkId)
      );
      const userSnapshot = await getDocs(userQuery);
      let completedReviewQuestionIds: string[] = [];

      userSnapshot.forEach((doc) => {
        const userData = doc.data();
        completedReviewQuestionIds =
          userData.reviewQuestion.reviewQuestionId || []; // Extract completed question IDs
      });

      // Iterate through each topic to calculate progress
      for (const topic of data) {
        // Fetch review questions for the topic
        const questionsRef = collection(db, "ReviewQuestions");
        const questionsQuery = query(
          questionsRef,
          where("topicId", "==", topic.id)
        );
        const questionsSnapshot = await getDocs(questionsQuery);

        const totalQuestions = questionsSnapshot.size;
        const completedCount = questionsSnapshot.docs.filter((doc) =>
          completedReviewQuestionIds.includes(doc.id)
        ).length;

        const progress =
          totalQuestions > 0 ? (completedCount / totalQuestions) * 100 : 0;

        newProgressData.push({ id: topic.id, progress });
      }

      setProgressData(newProgressData);
    };

    fetchProgress();
  }, [data, userData]);

  const renderItem = ({
    item,
  }: {
    item: { id: string; name: string; image: string; status: string };
  }) => {
    const progressWidth =
      progressData.find((p) => p.id === item.id)?.progress || 0;

    return (
      <View
        style={{ width: itemWidth }}
        className={`mr-2 mt-2 h-[150px] p-5 bg-[#94b447] rounded-2xl ${
          item.status === "close" ? "hidden" : ""
        }`}
      >
        <View className="flex-row items-start">
          <View>
            <Text className="text-black text-[14px] w-40 font-black">
              {item.name}
            </Text>
            <View
              style={{ elevation: 5, shadowColor: "#000" }}
              className="bg-gray-100 w-full py-2 px-0.5 justify-center h-3 rounded-xl mt-3"
            >
              <View
                className="bg-[#5c6d1d] rounded-xl h-3"
                style={{ width: `${progressWidth}%` }}
              />
            </View>
            <TouchableOpacity
              onPress={() => router.push(`/topics/${item.id}`)}
              className="bg-primary mt-2 py-2 rounded-xl"
            >
              <Text className="text-white text-xs font-bold text-center">
                Continue
              </Text>
            </TouchableOpacity>
          </View>
          <Image
            source={{ uri: item.image }}
            style={{ width: 80, height: 80 }}
          />
        </View>
      </View>
    );
  };

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      horizontal
      showsHorizontalScrollIndicator={false}
    />
  );
};

export default RecentTopic;
