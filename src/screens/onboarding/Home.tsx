import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { OnboardingStackParamList } from "@/Navigation";
import { Button } from "@/ui/Button";
import { Layout } from "@/ui/Layout";
import { SvgXml } from "react-native-svg";

type Props = NativeStackScreenProps<OnboardingStackParamList, "Home">;

export default function ({ navigation }: Props) {
  return (
    <Layout
      scrollable={false}
      footer={
        <>
          <Button
            text="Create a new keystore"
            onPress={() => navigation.navigate("ShowMnemonic")}
            type="main"
          />
          <Button
            text="Restore existing keystore"
            onPress={() => navigation.navigate("ImportKeystore")}
            type="secondary"
          />
        </>
      }
    >
      <View style={styles.content}>
        <SvgXml
          xml={`<svg width="245" height="140" viewBox="0 0 245 140" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M36.239 21.244C31.0838 9.82436 41.3339 -2.52292 53.5024 0.448335L179.208 31.1425C190.465 33.8911 194.511 47.8102 186.482 56.1681L110.391 135.379C103.02 143.052 90.2317 140.848 85.8535 131.149L36.239 21.244Z" fill="#FF7B00"/>
<path d="M5.9383 50.729C7.25191 50.729 8.56535 51.0452 10.2993 52.6219L31.8453 71.9672V51.3083H41.7776V80.4304C41.7774 85.1086 38.9388 87.0528 35.7859 87.0528C34.4198 87.0528 33.1062 86.738 31.4249 85.1613L9.87892 65.816V86.4748H0V57.3007C0 52.6222 2.83786 50.729 5.9383 50.729Z" fill="white"/>
<path d="M135.944 60.455H119.653C113.768 60.4552 109.354 63.9764 109.354 69.0224C109.354 74.0162 113.715 77.4334 119.653 77.4336H142.933L135.944 86.4748H119.653C107.462 86.4746 98.4756 78.7477 98.4756 68.5499C98.4756 58.2468 107.462 51.3085 119.653 51.3083H142.933L135.944 60.455Z" fill="white"/>
<path d="M157.64 63.7656H178.555V51.3083H189.38V86.4748H178.555V72.9123H157.64V86.4748H146.709V51.3083H157.64V63.7656Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M219.304 87.0528C202.173 87.0527 193.608 81.4284 193.608 68.8649C193.608 56.3016 202.173 50.7291 219.304 50.729C236.435 50.7291 245 56.3016 245 68.8649C245 81.4284 236.435 87.0527 219.304 87.0528ZM204.433 68.8649C204.433 61.2956 208.374 59.8757 219.304 59.8757C230.234 59.8757 234.175 61.2956 234.175 68.8649C234.175 76.4345 230.234 77.9061 219.304 77.9061C208.374 77.9061 204.433 76.4345 204.433 68.8649Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M48.7224 77.8447L65.1481 54.6723C66.589 52.6647 68.6812 50.7314 71.9792 50.7314C75.2771 50.7314 77.3693 52.6647 78.8102 54.6723L95.2359 77.8447C97.8025 81.4653 95.2145 86.4748 90.7775 86.4748H53.1809C48.7438 86.4748 46.1558 81.4653 48.7224 77.8447ZM61.8707 77.4336L71.9792 63.1355L82.0876 77.4336H61.8707Z" fill="white"/>
</svg>`}
          width={280}
          height={160}
        />
        <View style={styles.headerContainer}>
          <Text style={styles.headerLine1}>Your Sovereign</Text>
          <View style={styles.headerLine2Container}>
            <Text style={styles.orangeText}>Bitcoin </Text>
            <Text style={styles.whiteText}>Handle Keystore</Text>
          </View>
        </View>
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  headerContainer: {
    alignItems: "center",
    marginBottom: 48,
  },
  headerLine1: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 8,
  },
  headerLine2Container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  orangeText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FF7B00",
  },
  whiteText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
});
