import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useStore } from "@/Store";
import { validateMnemonic, xprvFromMnemonic, xpubFromXprv } from "@/keys";
import { OnboardingStackParamList } from "@/Navigation";
import { Button } from "@/ui/Button";
import { Header } from "@/ui/Header";
import { Layout } from "@/ui/Layout";
import { Message } from "@/ui/Message";

type Props = NativeStackScreenProps<OnboardingStackParamList, "EnterMnemonic">;

export default function ({ navigation, route }: Props) {
  const { xpub, handles } = route.params;
  const isNew = handles === undefined;
  type ValidationError = "invalid" | "mismatch" | null;

  const { setupKeystore } = useStore();
  const [inputWords, setInputWords] = useState<string[]>("abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about".split(" "));
  const [error, setError] = useState<ValidationError>(null);
  const inputRefs = useRef<(TextInput | null)[]>(Array(12).fill(null));

  const handleWordChange = (index: number, value: string) => {
    const newWords = [...inputWords];
    newWords[index] = value.toLowerCase().trim();
    setInputWords(newWords);

    if (error) {
      setError(null);
    }
  };

  const handleContinue = () => {
    setError(null);

    const mnemonic = inputWords.join(" ");
    if (!validateMnemonic(mnemonic)) {
      setError("invalid");
      return;
    }

    const xprv = xprvFromMnemonic(mnemonic);
    if (xpub !== xpubFromXprv(xprv)) {
      setError("mismatch");
      return;
    }

    setupKeystore(xprv, handles || {});
  };

  const getMessage = (error: ValidationError): string => {
    switch (error) {
      case "invalid":
        return "The entered seed phrase is not valid. Please check your words.";
      case "mismatch":
        if (isNew) {
          return "The entered seed phrase doesn't match. Please try again.";
        } else {
          return "The entered seed phrase doesn't correspond to the keystore. Please try again.";
        }
      default:
        return "";
    }
  };

  const isComplete = inputWords.every((word) => word.length > 0);

  return (
    <Layout
      footer={
        <Button
          text="Verify Seed Phrase"
          onPress={handleContinue}
          type="main"
          disabled={!isComplete}
        />
      }
    >
      <Header
        headText={isNew ? "Confirm" : "Enter"}
        tailText="Seed Phrase"
        subText={
          isNew
            ? "Enter your 12-word seed phrase to confirm you've saved it correctly."
            : "Enter your 12-word seed phrase to confirm you have the private key associated with the keystore."
        }
      />

      <View style={styles.inputContainer}>
        {inputWords.map((word, index) => (
          <TouchableOpacity
            key={index}
            style={styles.wordInputContainer}
            onPress={() => inputRefs.current[index]?.focus()}
          >
            <Text style={styles.wordInputNumber}>{index + 1}.</Text>
            <TextInput
              ref={(ref) => (inputRefs.current[index] = ref)}
              style={styles.wordInput}
              value={word}
              onChangeText={(value) => handleWordChange(index, value)}
              placeholder=""
              placeholderTextColor="#4A4A4A"
              selectionColor="#FFFFFF"
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="off"
            />
          </TouchableOpacity>
        ))}
      </View>

      {error && <Message message={getMessage(error)} type="error" />}
    </Layout>
  );
}

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 12,
    marginTop: 20,
    marginBottom: 30,
  },
  wordInputContainer: {
    width: (width - 60) / 2 - 6,
    backgroundColor: "#1A1A1A",
    borderRadius: 8,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  wordInputNumber: {
    fontSize: 14,
    color: "#FF7B00",
    fontWeight: "500",
  },
  wordInput: {
    flex: 1,
    fontSize: 14,
    fontWeight: "400",
    color: "#FFFFFF",
    padding: 0,
    margin: 0,
    textAlign: "left",
    // @ts-ignore - web-only style to remove focus outline
    outlineStyle: "none",
  } as any,
});
