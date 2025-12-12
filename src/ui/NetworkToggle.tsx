import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { useStore, Network } from "@/Store";

export function NetworkToggle() {
  const { network, setNetwork } = useStore();

  const handleToggle = async () => {
    const newNetwork: Network = network === "testnet4" ? "mainnet" : "testnet4";
    await setNetwork(newNetwork);
  };

  return (
    <TouchableOpacity onPress={handleToggle} style={styles.container}>
      <Text style={styles.text}>
        {network === "testnet4" ? "Testnet4" : "Mainnet"}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingRight: 16,
  },
  text: {
    color: "#FF7B00",
    fontSize: 16,
    fontWeight: "400",
  },
});