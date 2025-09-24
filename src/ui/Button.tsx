import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

interface ButtonProps {
  text: string;
  onPress: () => void;
  type: "main" | "secondary" | "danger";
  disabled?: boolean;
}

export function Button({
  text,
  onPress,
  type = "main",
  disabled = false,
}: ButtonProps) {
  const getButtonStyle = () => {
    switch (type) {
      case "main":
        return [
          styles.button,
          styles.mainButton,
          disabled && styles.mainButtonDisabled,
        ];
      case "danger":
        return [
          styles.button,
          styles.dangerButton,
          disabled && styles.dangerButtonDisabled,
        ];
      case "secondary":
        return [
          styles.button,
          styles.secondaryButton,
          disabled && styles.secondaryButtonDisabled,
        ];
    }
  };

  const getTextStyle = () => {
    switch (type) {
      case "main":
        return [
          styles.buttonText,
          styles.mainButtonText,
          disabled && styles.mainButtonTextDisabled,
        ];
      case "danger":
        return [
          styles.buttonText,
          styles.dangerButtonText,
          disabled && styles.dangerButtonTextDisabled,
        ];
      case "secondary":
        return [
          styles.buttonText,
          styles.secondaryButtonText,
          disabled && styles.secondaryButtonTextDisabled,
        ];
    }
  };

  return (
    <TouchableOpacity
      style={getButtonStyle()}
      onPress={disabled ? undefined : onPress}
      disabled={disabled}
    >
      <Text style={getTextStyle()}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 50,
    paddingVertical: 18,
    paddingHorizontal: 24,
    marginBottom: 16,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "400",
  },
  mainButton: {
    backgroundColor: "#FF7B00",
  },
  mainButtonText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
  mainButtonDisabled: {
    backgroundColor: "#271300",
  },
  mainButtonTextDisabled: {
    color: "#FFFFFF",
  },
  secondaryButton: {
    backgroundColor: "transparent",
  },
  secondaryButtonText: {
    color: "#FF7B00",
  },
  secondaryButtonDisabled: {
    backgroundColor: "transparent",
  },
  secondaryButtonTextDisabled: {
    color: "#B8571F",
  },
  dangerButton: {
    backgroundColor: "#330000",
  },
  dangerButtonText: {
    color: "#FF0000",
  },
  dangerButtonDisabled: {
    backgroundColor: "#1A0000",
  },
  dangerButtonTextDisabled: {
    color: "#800000",
  },
});
