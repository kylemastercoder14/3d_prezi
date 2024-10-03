import GridSlider from "@/components/GridSlider";
import { router } from "expo-router";
import React from "react";
import {
  Dimensions,
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Activity = () => {
  const data = [
    { id: "1", title: "Crossword Puzzle" },
    { id: "2", title: "Jumbled Words" },
    { id: "3", title: "4 pics 1 word" },
  ];

  const { width } = Dimensions.get("window");
  const itemWidth = width / 2 - 20;
  const renderItem = ({ item }: { item: { id: string; title: string } }) => (
    <View
      style={{ width: itemWidth }}
      className="mr-2 mt-2 h-32 bg-white justify-center items-center rounded-md"
    >
      <Text className="text-black font-semibold">{item.title}</Text>
      <TouchableOpacity onPress={() => item.id === "1" ? router.push(`/game/${item.id}`) : ""} className="mt-2">
        <Text className="text-primary">Play</Text>
      </TouchableOpacity>
    </View>
  );
  return (
    <SafeAreaView className="bg-general-500 px-5 h-screen">
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <View className="mt-10">
          <View className="flex-row justify-between items-center">
            <Text className="text-zinc-600 font-semibold text-lg">
              Available Activities
            </Text>
            <TouchableOpacity>
              <Text className="font-semibold text-primary">See All</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Activity;
