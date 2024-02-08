import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { useCameraPermissions } from "expo-camera/next";
import { useState, useEffect } from "react";
import BarCode from "../components/BarCode";

const Home = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const [triggerCamera, setTriggerCamera] = useState(false);
  const [userData, setUserData] = useState<string>("");
  const [parsedData, setParsedData] = useState<{
    privateId: string;
    nickname: string;
    questionnaires: {
      id: string;
      name: string;
      description: string;
      maxrange: number;
      questiones: string[];
    }[];
  } | null>();
  useEffect(() => {
    if (!permission) {
      requestPermission();
    }
  }, [useCameraPermissions()]);

  useEffect(() => {
    if (userData) {
      setParsedData(JSON.parse(userData));
    }
  }, [userData]);
  return (
    <View>
      <Text
        style={{
          textAlign: "center",
          fontSize: 30,
          fontWeight: "bold",
          marginTop: 10,
          color: "white",
        }}
      >
        OpenTracker
      </Text>
      {!parsedData && (
        <>
          <TouchableOpacity
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => setTriggerCamera(true)}
          >
            <View
              style={{
                marginTop: 10,
                backgroundColor: "#e004e0",
                borderRadius: 5,
                padding: 10,
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 20,
                  fontWeight: "bold",
                  color: "white",
                  backgroundColor: "transparent",
                }}
              >
                <AntDesign name="qrcode" size={20} color="white" /> NAČÍST QR
                KÓD
              </Text>
            </View>
          </TouchableOpacity>
        </>
      )}

      {parsedData && (
        <View
          style={{
            marginTop: 20,
          }}
        >
          <Text style={{ color: "black", textAlign: "center", fontSize: 40 }}>
            {parsedData.privateId}
          </Text>
          <Text style={{ color: "gray", textAlign: "center", fontSize: 20 }}>
            {parsedData.nickname}
          </Text>
          <Text>{"\n"}</Text>
          <TouchableOpacity
            style={{
              backgroundColor: "#08759e",
              padding: 10,
              borderRadius: 5,
              maxWidth: 290,
              justifyContent: "center",
              alignItems: "center",
              margin: "auto",
            }}
          >
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              {parsedData.questionnaires.map((q, i) => (
                <Text
                  style={{
                    color: "white",
                    fontSize: 20,
                  }}
                  key={i}
                >
                  <AntDesign name="pluscircleo" size={20} color="white" />{" "}
                  Vyplnit {q.name}
                </Text>
              ))}
            </View>
          </TouchableOpacity>
        </View>
      )}
      {triggerCamera && (
        <BarCode
          user={(data) => {
            setTriggerCamera(false);
            setUserData(data);
          }}
        />
      )}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  camera: {
    width: 300,
    height: 300,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
    margin: 10,
  },
  text: {
    fontSize: 20,
  },
});
