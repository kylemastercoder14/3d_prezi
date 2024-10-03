import { View, Text, TouchableOpacity, ScrollView, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { router, Stack, useLocalSearchParams } from "expo-router";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "@/config/FirebaseConfig";
import { animation } from "@/constants";
import LottieView from "lottie-react-native";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import { useGetUser } from "@/hooks/getUser";

interface Question {
  answers: string[];
  correctAnswer: string;
  question: string;
}

interface QuizData {
  id: string;
  topicId: string;
  questions: Question[];
}

const Quizzes = () => {
  const { userData } = useGetUser();
  const { id } = useLocalSearchParams();
  const [quizData, setQuizData] = useState<QuizData | null>(null);
  const [introduction, setIntroduction] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [answerStatus, setAnswerStatus] = useState<string | null>(null); // Track correct/incorrect status
  const [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    const fetchQuizData = async () => {
      if (!id) return;

      try {
        const quizQuery = query(
          collection(db, "Quizzes"),
          where("topicId", "==", id)
        );
        const quizSnapshot = await getDocs(quizQuery);

        if (!quizSnapshot.empty) {
          const quizDocs = quizSnapshot.docs.map((doc) => {
            const quizData = doc.data();

            const questions: Question[] = quizData.questions;

            return {
              id: doc.id,
              topicId: quizData.topicId,
              questions: questions,
            } as QuizData;
          });

          setQuizData(quizDocs.length > 0 ? quizDocs[0] : null);
        } else {
          setQuizData(null);
        }
      } catch (error) {
        console.error("Error fetching quizzes:", error);
      }
    };

    fetchQuizData();
  }, [id]);

  const handleAnswerSelection = (selectedAnswer: string) => {
    if (!quizData) return;

    const currentQuestion = quizData.questions[currentQuestionIndex];
    const correctAnswer = currentQuestion.correctAnswer;

    setSelectedAnswer(selectedAnswer); // Set the selected answer

    if (selectedAnswer === correctAnswer) {
      setAnswerStatus("correct");
      setScore((prevScore) => prevScore + 1);
    } else {
      setAnswerStatus("incorrect");
    }

    // Delay moving to the next question for a moment so the color change is visible
    setTimeout(() => {
      setAnswerStatus(null); // Reset the answer status
      setSelectedAnswer(null); // Reset selected answer

      if (currentQuestionIndex < quizData.questions.length - 1) {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      } else {
        console.log(`Quiz finished! Your score: ${score}`);
        // Show score alert at the end of the quiz
        Alert.alert(
          "Quiz Finished!",
          `Your score: ${score} out of ${quizData.questions.length}`,
          [
            {
              text: "OK",
              onPress: () => {
                saveQuizResults();
              },
            },
          ]
        );
      }
    }, 2000); // 1 second delay
  };

  const saveQuizResults = async () => {
    if (!userData?.clerkId) return; // Ensure clerkId is available

    const quizResult = {
      score: score,
      quizId: quizData?.id,
      timestamp: new Date().toISOString(),
    };

    try {
      // Query the Users collection to find the user document matching the clerkId
      const userQuery = query(
        collection(db, "Users"),
        where("clerkId", "==", userData.clerkId) // Match clerkId
      );

      const userSnapshot = await getDocs(userQuery);

      if (!userSnapshot.empty) {
        const userDoc = userSnapshot.docs[0]; // Get the first matching user document

        // Prepare the new quizzes field or update the existing one
        const existingQuizzes = userDoc.data().quizzes || {
          score: [],
          quizId: [],
          timestamps: [],
        }; // Initialize if not present

        // Update the quizzes field
        await updateDoc(doc(db, "Users", userDoc.id), {
          quizzes: {
            score: [...existingQuizzes.score, quizResult.score], // Append new score
            quizId: [...existingQuizzes.quizId, quizResult.quizId], // Append new quizId
            timestamps: [...existingQuizzes.timestamps, quizResult.timestamp], // Append new timestamp
          },
        });

        console.log("Quiz results saved:", quizResult);
        router.push("/history");
      } else {
        console.error("No user found with the specified clerkId.");
      }
    } catch (error) {
      console.error("Error saving quiz results:", error);
    }
  };

  const getButtonStyle = (answer: string) => {
    if (selectedAnswer === answer) {
      return answerStatus === "correct" ? "bg-green-500" : "bg-red-500";
    }
    return "bg-gray-200";
  };

  return (
    <>
      {introduction ? (
        <>
          <Stack.Screen
            options={{
              headerShown: false,
            }}
          />
          <View className="items-center justify-center mt-32 p-5">
            <LottieView
              source={animation.quiz}
              autoPlay
              loop
              style={{ width: "100%", height: 300 }}
            />
            <Text className="text-center text-lg font-semibold">
              Welcome to Micro-Learn Hub Quiz
            </Text>
            <Text className="text-center">
              We’re excited to have you here! This quiz is designed to challenge
              your knowledge and skills in this current topic. You have four
              choices to select from, and you have 60 seconds to answer each
              question. Good luck!
            </Text>
            <TouchableOpacity
              className="bg-emerald-800 rounded-lg mt-5 py-2 w-full"
              onPress={() => setIntroduction(false)}
            >
              <Text className="text-center text-white font-semibold text-[18px]">
                Get Started
              </Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <>
          <Stack.Screen
            options={{
              title: "Micro-Learn Hub",
              headerStyle: {
                backgroundColor: "#5e7119",
              },
              headerTintColor: "#fff",
            }}
          />
          <ScrollView className="p-5 flex-1">
            <View className="mt-5">
              {quizData ? (
                <View>
                  <Text className="text-center font-[500] mt-3 mb-10">
                    Question {currentQuestionIndex + 1} /{" "}
                    {quizData.questions.length}
                  </Text>
                  <View
                    className="bg-white justify-center mb-5 items-center w-full"
                    style={{
                      height: 180,
                      borderRadius: 20,
                      marginTop: 50,
                      elevation: 5,
                      padding: 16,
                      shadowColor: "#000",
                      shadowOffset: { width: 0, height: 0 },
                      shadowOpacity: 0.4,
                      shadowRadius: 5,
                    }}
                  >
                    <View
                      style={{
                        marginTop: -100,
                        marginBottom: 50,
                        backgroundColor: "#fff",
                        borderRadius: 50,
                      }}
                    >
                      <CountdownCircleTimer
                        isPlaying={isPlaying}
                        key={currentQuestionIndex}
                        duration={60}
                        colors={["#006400", "#A30000"]}
                        size={80}
                        colorsTime={[60, 10]}
                        onComplete={() => {
                          handleAnswerSelection(""); // Handle if time runs out without selection
                          return { shouldRepeat: false };
                        }}
                      >
                        {({ remainingTime }) => <Text>{remainingTime}</Text>}
                      </CountdownCircleTimer>
                    </View>
                    <Text className="font-[500] text-center text-[14px]">
                      {quizData.questions[currentQuestionIndex].question}
                    </Text>
                  </View>
                  <View className="mt-3">
                    {quizData.questions[currentQuestionIndex].answers.map(
                      (answer, index) => (
                        <TouchableOpacity
                          key={index}
                          className={`${getButtonStyle(
                            answer
                          )} py-2 px-4 rounded-lg mb-3`}
                          onPress={() => handleAnswerSelection(answer)}
                          disabled={selectedAnswer !== null} // Disable after selecting an answer
                        >
                          <Text className="text-center">{answer}</Text>
                        </TouchableOpacity>
                      )
                    )}
                  </View>
                </View>
              ) : (
                <Text>No quizzes found for this topic.</Text>
              )}
            </View>
          </ScrollView>
        </>
      )}
    </>
  );
};

export default Quizzes;
