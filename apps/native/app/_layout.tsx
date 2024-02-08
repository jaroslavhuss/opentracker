import { SafeAreaView, StyleSheet, View } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { Slot } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
const _layout = () => {
  return (
    <LinearGradient
      // Button Linear Gradient
      colors={["#52d4fb", "#40ccf6", "#28c6f6"]}
      style={{
        flex: 1,
      }}
    >
      <SafeAreaView>
        <StatusBar hidden={true} />
        <Slot />
      </SafeAreaView>
    </LinearGradient>
  );
};

export default _layout;

const styles = StyleSheet.create({});
