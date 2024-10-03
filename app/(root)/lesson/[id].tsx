import {
  View,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  Text,
  StyleSheet,
  ToastAndroid,
} from "react-native";
import React, { Suspense, useEffect, useState } from "react";
import { router, Stack, useLocalSearchParams } from "expo-router";
import ExclamationCircle from "react-native-vector-icons/AntDesign";
import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "@/config/FirebaseConfig";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import Modal from "@/components/Modal";
import { useGetUser } from "@/hooks/getUser";
import useControls from "r3f-native-orbitcontrols";

// Define Topic type
interface Topic {
  name: string;
  id: string;
  objective: string;
  content: string;
}

interface ReviewQuestion {
  answers: string[];
  correctAnswer: string;
  questions: string;
  reviewNumber: string;
  topicId: string;
  id: string;
}

const SpecificLesson = () => {
  const [OrbitControls, events] = useControls();
  const { id } = useLocalSearchParams();
  const [objectiveModal, setObjectiveModal] = useState(false);
  const [topic, setTopic] = useState<Topic | null>(null);
  const [reviewQuestions, setReviewQuestions] = useState<ReviewQuestion[]>([]);
  const [completedReviewQuestionIds, setCompletedReviewQuestionIds] = useState<
    string[]
  >([]);
  const [currentQuestion, setCurrentQuestion] = useState<ReviewQuestion | null>(
    null
  );
  const [modalVisible, setModalVisible] = useState(false);
  const [answerFeedback, setAnswerFeedback] = useState<string | null>(null);

  const { userData } = useGetUser();

  useEffect(() => {
    const fetchReviewQuestions = async () => {
      try {
        // Fetch the user's completed review question IDs
        const usersRef = collection(db, "Users");
        const userQuery = query(
          usersRef,
          where("clerkId", "==", userData?.clerkId)
        );
        const userQuerySnapshot = await getDocs(userQuery);

        let userCompletedQuestionIds: string[] = [];
        if (!userQuerySnapshot.empty) {
          const userDoc = userQuerySnapshot.docs[0].data();
          userCompletedQuestionIds =
            userDoc.reviewQuestion?.reviewQuestionId || []; // Adjust this path according to your Firestore structure
        }

        const questionsRef = collection(db, "ReviewQuestions");
        const q = query(questionsRef, where("topicId", "==", id));
        const querySnapshot = await getDocs(q);

        const questions: ReviewQuestion[] = [];
        querySnapshot.forEach((doc) => {
          const question = {
            ...doc.data(),
            id: doc.id,
          } as unknown as ReviewQuestion;

          questions.push(question);
        });

        console.log("All Questions: ", questions);
        console.log("User Completed IDs: ", userCompletedQuestionIds);

        // Filter out questions that exist in the user's completed questions
        const filteredQuestions = questions.filter((question) => {
          const isCompleted = userCompletedQuestionIds.includes(question.id);
          console.log(
            `Checking question ID: ${question.id}, isCompleted: ${isCompleted}`
          );
          return !isCompleted; // Return questions that are not completed
        });

        console.log("Filtered Questions: ", filteredQuestions);

        // Set the filtered questions
        setReviewQuestions(filteredQuestions);
      } catch (error) {
        console.error("Error fetching review questions:", error);
      }
    };

    // Only fetch review questions if userData is available
    if (userData) {
      fetchReviewQuestions();
    }
  }, [id, userData]);

  // Function to show a random question
  const showRandomQuestion = () => {
    if (reviewQuestions.length > 0) {
      // Create a filtered array of questions that are not completed
      const availableQuestions = reviewQuestions.filter(
        (question) => !completedReviewQuestionIds.includes(question.id)
      );

      if (availableQuestions.length > 0) {
        // Select a random question from the available questions
        const randomIndex = Math.floor(
          Math.random() * availableQuestions.length
        );
        const selectedQuestion = availableQuestions[randomIndex];
        console.log("Random Question Selected: ", selectedQuestion); // Log selected question

        setCurrentQuestion(selectedQuestion);
        setModalVisible(true);
        setAnswerFeedback(null);
      } else {
        console.log("All questions have been completed."); // Log if no available questions
      }
    } else {
      console.log("No more questions available."); // Log if no questions available
    }
  };

  const closeModal = () => {
    setModalVisible(false);
    setCurrentQuestion(null);
    setAnswerFeedback(null);
  };

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const topicDocRef = doc(db, "Topics", id as string);
        const topicDoc = await getDoc(topicDocRef);
        if (topicDoc.exists()) {
          setTopic({
            id: topicDoc.id,
            name: topicDoc.data().name,
            objective: topicDoc.data().objective,
            content: topicDoc.data().content,
          });
        } else {
          console.log("No such topic!");
        }
      } catch (error) {
        console.error("Error fetching topics:", error);
      }
    };

    fetchTopics();
  }, [id]);

  // Set up a timer to show random questions periodically
  useEffect(() => {
    const interval = setInterval(showRandomQuestion, 30000); // Show a question every 30 seconds
    return () => clearInterval(interval); // Clear the interval on component unmount
  }, [reviewQuestions]);

  const translationX = useSharedValue(0);
  const translationY = useSharedValue(0);
  const scale = useSharedValue(1);
  const prevTranslationX = useSharedValue(0);
  const prevTranslationY = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [
      { translateX: translationX.value },
      { translateY: translationY.value },
      { scale: scale.value },
    ],
  }));

  const pan = Gesture.Pan()
    .minDistance(1)
    .onStart(() => {
      prevTranslationX.value = translationX.value;
      prevTranslationY.value = translationY.value;
    })
    .onUpdate((event) => {
      translationX.value = prevTranslationX.value + event.translationX;
      translationY.value = prevTranslationY.value + event.translationY;
    })
    .runOnJS(true);

  const pinchGesture = Gesture.Pinch()
    .onUpdate((event) => {
      scale.value = event.scale;
    })
    .runOnJS(true);

  const doubleTap = Gesture.Tap()
    .numberOfTaps(2)
    .onEnd(() => {
      scale.value = 1;
      translationX.value = 0;
      translationY.value = 0;
    });

  const combinedGesture = Gesture.Simultaneous(pan, pinchGesture, doubleTap);

  // Function to add the correct answer to the user's collection
  const addReviewQuestionToUser = async (reviewQuestionId: string) => {
    if (!userData?.clerkId) {
      console.error("User ID is undefined. Cannot add review question.");
      return;
    }

    try {
      const usersRef = collection(db, "Users");
      const q = query(usersRef, where("clerkId", "==", userData.clerkId));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        console.error("No user found with the provided clerkId.");
        return;
      }

      const userDocRef = querySnapshot.docs[0].ref;

      // Updating to use arrayUnion
      await setDoc(
        userDocRef,
        {
          reviewQuestion: {
            reviewQuestionId: arrayUnion(reviewQuestionId),
            status: "completed",
            correct: true,
            timeStamp: new Date(),
          },
        },
        { merge: true }
      );

      console.log("Review question added successfully!");
    } catch (error) {
      console.error("Error adding review question:", error);
    }
  };

  return (
    <>
      <Modal isOpen={objectiveModal}>
        <View className="bg-white p-5 rounded-lg">
          <Text className="text-lg font-bold">Objective</Text>
          <Text className="mt-3">{topic?.objective}</Text>
          <TouchableOpacity
            onPress={() => setObjectiveModal(false)}
            className="bg-[#5e7119] mt-3 rounded-md py-2"
          >
            <Text className="text-center font-[500] text-white">Proceed</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <Modal isOpen={modalVisible}>
        <View className="bg-white p-5 rounded-lg">
          {currentQuestion && (
            <>
              <Text className="font-bold">{currentQuestion.questions}</Text>
              {currentQuestion.answers.map((answer, index) => (
                <TouchableOpacity
                  key={index}
                  className="bg-white border px-2 mt-3 rounded-md py-2"
                  onPress={async () => {
                    // Marked as async
                    // Handle answer selection
                    const isCorrect = answer === currentQuestion.correctAnswer;
                    if (isCorrect) {
                      await addReviewQuestionToUser(currentQuestion.id);
                      ToastAndroid.show("You are Correct!", ToastAndroid.SHORT);
                      router.push(`/lesson/${id}`); // Refresh the page
                      setModalVisible(false); // Close the modal for correct answer
                    } else {
                      setAnswerFeedback("Incorrect. Try again!"); // Set feedback for incorrect answer
                      // Do not close the modal
                    }
                  }}
                >
                  <Text>{answer}</Text>
                </TouchableOpacity>
              ))}
              {answerFeedback && (
                <Text className="mt-3 text-red-600">{answerFeedback}</Text> // Display feedback
              )}
            </>
          )}
        </View>
      </Modal>
      <Stack.Screen
        options={{
          title: topic?.name || "Micro-Learn Hub",
          headerStyle: {
            backgroundColor: "#5e7119",
          },
          headerTintColor: "#fff",
          headerRight: () => (
            <TouchableOpacity
              onPress={() => setObjectiveModal(true)}
              style={{ marginLeft: 12 }}
            >
              <ExclamationCircle
                name="exclamationcircleo"
                size={24}
                color="white"
              />
            </TouchableOpacity>
          ),
        }}
      />
      <ImageBackground
        source={require("@/assets/images/BG.png")}
        style={{ flex: 1 }}
      >
        <GestureHandlerRootView
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <GestureDetector gesture={combinedGesture}>
            <Animated.View style={animatedStyles}>
              <Animated.Image
                source={{ uri: topic?.content }}
                style={{
                  width: 400,
                  height: 400,
                  resizeMode: "contain",
                }}
              />
            </Animated.View>
          </GestureDetector>
          <TouchableOpacity onPress={() => router.push(`/quiz/${id}`)} className="bg-[#5e7119] py-2 px-3 rounded-md">
            <Text className="text-center font-[500] text-white">Start Your Quiz</Text>
          </TouchableOpacity>
        </GestureHandlerRootView>
      </ImageBackground>
    </>
  );
};

export default SpecificLesson;
