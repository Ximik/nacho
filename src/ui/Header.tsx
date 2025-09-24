import React from "react";
import { Text, View, StyleSheet } from "react-native";

interface HeaderProps {
  headText: string;
  tailText: string;
  subText?: string;
}

export function Header({ headText, tailText, subText }: HeaderProps) {
  return (
    <>
      <View style={styles.header}>
        <Text style={styles.orangeText}>{headText} </Text>
        <Text style={styles.whiteText}>{tailText}</Text>
      </View>
      {subText && <Text style={styles.subheader}>{subText}</Text>}
    </>
  );
}

interface SubheaderProps {
  text: string;
}

export function Subheader({ text }: SubheaderProps) {
  return <Text style={styles.subheader}>{text}</Text>;
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  orangeText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FF7B00",
  },
  whiteText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  subheader: {
    fontSize: 18,
    color: "#D6D6D6",
    textAlign: "center",
    lineHeight: 26,
    marginBottom: 40,
    paddingHorizontal: 20,
  },
});
