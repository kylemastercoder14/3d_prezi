import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, ScrollView } from "react-native";

const grid = [
  ["E", "S", "C", "H", "E", "R", "I", "C", "H", "I", "A"],
  [" ", " ", " ", " ", " ", " ", "O", " ", " ", " ", "L"],
  ["W", "A", "R", "D", "T", "A", "T", "U", "M"],
  [" ", "F", "L", "E", "M", "I", "N", "G"],
  [" ", " ", " ", "K", "O", "C", "H"],
  [" ", " ", "B", "E", "T", "T", "Y"],
  [" ", "P", "E", "T", "R", "I"],
  ["U", "L", "C", "E", "R", "S"],
  ["A", "G", "A", "R"],
];

const clues = {
  across: [
    "Theodore Escherich describes a bacterium which was later to be called ________ coli.",
    "The scientist who accidentally discovered penicillin.",
    "Pioneering food safety microbiologist...",
    "A disease caused by Helicobacteria pylori.",
    "A dish invented by Julius Petri used for culturing bacteria.",
  ],
  down: [
    "He and Joshua Lederberg produced the first gene map of E. coli K12...",
    "NCTC introduce this to ensure longevity...",
    "A German scientist who provides proof of germ theory...",
    "Antibacterial compounds discovered by Waksman",
    "A scientist who invented the agar-coated glass dish...",
  ],
};

const Crossword = () => {
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});

  const handleChangeText = (text: string, row: any, col: any) => {
    const newAnswers = { ...answers, [`${row}-${col}`]: text };
    setAnswers(newAnswers);
  };

  return (
    <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false} style={styles.container}>
      <View style={styles.grid}>
        {grid.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((cell, colIndex) => (
              <View key={colIndex} style={styles.cell}>
                {cell !== " " ? (
                  <TextInput
                    style={styles.input}
                    maxLength={1}
                    value={answers[`${rowIndex}-${colIndex}`] || ""}
                    onChangeText={(text) =>
                      handleChangeText(text, rowIndex, colIndex)
                    }
                  />
                ) : (
                  <View style={styles.emptyCell} />
                )}
              </View>
            ))}
          </View>
        ))}
      </View>

      <View style={styles.clues}>
        <Text style={styles.clueHeader}>Across</Text>
        {clues.across.map((clue, index) => (
          <Text key={`across-${index}`} style={styles.clueText}>
            {index + 1}. {clue}
          </Text>
        ))}

        <Text style={styles.clueHeader}>Down</Text>
        {clues.down.map((clue, index) => (
          <Text key={`down-${index}`} style={styles.clueText}>
            {index + 1}. {clue}
          </Text>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  grid: {
    flexDirection: "column",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
  },
  cell: {
    width: 30,
    height: 30,
    borderWidth: 1,
    borderColor: "#000",
  },
  input: {
    textAlign: "center",
    fontSize: 18,
  },
  emptyCell: {
    width: 30,
    height: 30,
    backgroundColor: "#000",
  },
  clues: {
    marginTop: 20,
  },
  clueHeader: {
    fontWeight: "bold",
    fontSize: 18,
    marginVertical: 10,
  },
  clueText: {
    fontSize: 16,
  },
});

export default Crossword;
