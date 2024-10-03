import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import Crossword from "@/components/CrossWord";

const Game = () => {
  return (
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
      <SafeAreaView className="bg-general-500 px-5 h-screen">
        <Crossword />
      </SafeAreaView>
    </>
  );
};

export default Game;
