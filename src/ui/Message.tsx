import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface MessageProps {
  message: string;
  type: "success" | "error";
}

export function Message({ message, type }: MessageProps) {
  const getContainerStyle = () => {
    switch (type) {
      case "success":
        return [styles.container, styles.containerSuccess];
      case "error":
        return [styles.container, styles.containerError];
    }
  };

  const getTextStyle = () => {
    switch (type) {
      case "success":
        return [styles.text, styles.textSuccess];
      case "error":
        return [styles.text, styles.textError];
    }
  };

  return (
    <View style={getContainerStyle()}>
      <Text style={getTextStyle()}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#330000",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginTop: 20,
    marginBottom: 20,
  },
  text: {
    fontSize: 14,
    textAlign: "center",
    lineHeight: 20,
  },
  containerSuccess: {
    backgroundColor: "#003300",
  },
  textSuccess: {
    color: "#00FF00",
  },
  containerError: {
    backgroundColor: "#330000",
  },
  textError: {
    color: "#FF0000",
  },
});
