import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Animated,
  Easing,
} from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useNavigation } from "@react-navigation/native";
import styles from "../styles/AttendanceQRStyle";
import { db } from "../config/FirebaseConfig";
import { doc, getDoc } from "firebase/firestore";

const AttendanceQR = () => {
  const navigation = useNavigation();
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [scannedData, setScannedData] = useState("");
  const [userDetails, setUserDetails] = useState(null);
  const scanLineAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!permission) {
      requestPermission();
    }
  }, []);

  useEffect(() => {
    const startAnimation = () => {
      scanLineAnim.setValue(0);
      Animated.loop(
        Animated.timing(scanLineAnim, {
          toValue: 1,
          duration: 2000,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      ).start();
    };

    if (permission?.granted) {
      startAnimation();
    }
  }, [permission]);

  const handleBarCodeScanned = async ({ data }) => {
    try {
      setScanned(true);
      setScannedData(data);

      const segments = data.split("/").filter(Boolean);
      if (segments.length !== 4 || segments[0] !== "events" || segments[2] !== "registrations") {
        Alert.alert("Invalid QR Code", "The QR code does not contain a valid registration path.");
        return;
      }

      const eventId = segments[1];
      const registrationId = segments[3];

      const userRef = doc(db, "events", eventId, "registrations", registrationId);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const userData = userSnap.data();
        setUserDetails(userData);
        Alert.alert("User Found", `Name: ${userData.fullName}`);

      } else {
        Alert.alert("Not Found", "No registration data found.");
      }

    } catch (error) {
      console.error("QR Scan Error:", error);
      Alert.alert("Error", "Something went wrong while scanning the QR code.");
    }
  };

  const scanLineTranslateY = scanLineAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, styles.scanBox.height - 4],
  });

  return (
    <View style={styles.fullscreenContainer}>
      <CameraView
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
        style={styles.scanner}
      />

      <View style={styles.overlay}>
        <View style={styles.scanBox}>
          <Animated.View
            style={[
              styles.scanLine,
              {
                transform: [{ translateY: scanLineTranslateY }],
              },
            ]}
          />
        </View>
      </View>

      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>← Back</Text>
      </TouchableOpacity>

      {scanned && (
        <TouchableOpacity
          style={styles.scanAgainButton}
          onPress={() => {
            setScanned(false);
            setUserDetails(null);
          }}
        >
          <Text style={styles.buttonText}>Scan Again</Text>
        </TouchableOpacity>
      )}

      {userDetails && (
        <View style={{ padding: 16 }}>
          <Text>📛 Full Name: {userDetails.fullName}</Text>
          <Text>📧 Email: {userDetails.email}</Text>
          <Text>🧑‍🏫 Section: {userDetails.section}</Text>
          <Text>🎓 Year: {userDetails.year}</Text>
          <Text>✅ Data Privacy: {userDetails.dataPrivacyAgreement ? "Agreed" : "Not Agreed"}</Text>
          <Text>🎥 Video Consent: {userDetails.videoConsent ? "Yes" : "No"}</Text>
          <Text>📷 Photo Consent: {userDetails.photoConsent ? "Yes" : "No"}</Text>
          <Text>📩 Send Copy: {userDetails.sendCopy ? "Yes" : "No"}</Text>

          {userDetails.customAnswers && Object.keys(userDetails.customAnswers).length > 0 && (
            <View style={{ marginTop: 10 }}>
              <Text style={{ fontWeight: "bold" }}>📝 Custom Answers:</Text>
              {Object.entries(userDetails.customAnswers).map(([question, answer]) => (
                <Text key={question}>{question}: {answer}</Text>
              ))}
            </View>
          )}
        </View>
      )}
    </View>
  );
};

export default AttendanceQR;
