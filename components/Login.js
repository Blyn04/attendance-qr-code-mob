import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  Modal,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../config/FirebaseConfig";
import { FontAwesome } from "@expo/vector-icons";
import jpcsLogo from "../assets/jpcs.png";
import styles from "../styles/LoginStyle";

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [resetEmail, setResetEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [resetMessage, setResetMessage] = useState("");

  const handleSubmit = async () => {
    setLoading(true);
    setError("");

    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (/\s/.test(trimmedEmail) || /\s/.test(trimmedPassword)) {
      setError("Inputs must not contain spaces.");
      setLoading(false);
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, trimmedEmail, trimmedPassword);
      navigation.navigate("Dashboard");

    } catch (err) {
      switch (err.code) {
        case "auth/user-not-found":
          setError("No account found with that email.");
          break;
          
        case "auth/wrong-password":
        case "auth/invalid-credential":
          setError("Incorrect password. Please try again.");
          break;

        case "auth/invalid-email":
          setError("Invalid email format.");
          break;

        case "auth/too-many-requests":
          setError("Too many failed attempts. Please try again later.");
          break;

        default:
          setError("Login failed: " + err.message);
      }

    } finally {
      setLoading(false);
    }
  };

  const handleReset = async () => {
    setResetMessage("");

    const trimmedResetEmail = resetEmail.trim();

    if (!trimmedResetEmail) {
      setResetMessage("Please enter your email.");
      return;
    }

    if (/\s/.test(trimmedResetEmail)) {
      setResetMessage("Email must not contain spaces.");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, trimmedResetEmail);
      setResetMessage("Password reset email sent!");

    } catch (error) {
      setResetMessage("Error: " + error.message);
    }
  };

  return (
    <View style={styles.container}>
      {loading && (
        <View style={styles.loaderOverlay}>
          <ActivityIndicator size="large" color="#0d1b2a" />
        </View>
      )}

      <View style={styles.form}>
        <Image source={jpcsLogo} style={styles.logo} />
        <Text style={styles.title}>Login</Text>
        {error ? <Text style={styles.error}>{error}</Text> : null}

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#aaa"
          value={email}
          onChangeText={(text) => setEmail(text.replace(/\s/g, ""))}
          onKeyPress={({ nativeEvent }) => {
            if (nativeEvent.key === " ") return;
          }}
          keyboardType="email-address"
          autoCapitalize="none"
          editable={!loading}
        />

        <View style={styles.passwordWrapper}>
          <TextInput
            style={styles.inputPassword}
            placeholder="Password"
            placeholderTextColor="#aaa"
            value={password}
            onChangeText={(text) => setPassword(text.replace(/\s/g, ""))}
            onKeyPress={({ nativeEvent }) => {
              if (nativeEvent.key === " ") return;
            }}
            secureTextEntry={!showPassword}
            editable={!loading}
          />

          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setShowPassword((prev) => !prev)}
          >
            <FontAwesome
              name={showPassword ? "eye-slash" : "eye"}
              size={20}
              color="#0d1b2a"
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => setModalOpen(true)}>
          <Text style={styles.forgotText}>Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.loginButton}
          onPress={handleSubmit}
          disabled={loading}
        >
          <Text style={styles.loginButtonText}>
            {loading ? "Logging in..." : "Log In"}
          </Text>
        </TouchableOpacity>
      </View>

      <Modal visible={modalOpen} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Reset Password</Text>

            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              placeholderTextColor="#aaa"
              value={resetEmail}
              onChangeText={(text) => setResetEmail(text.replace(/\s/g, ""))}
              onKeyPress={({ nativeEvent }) => {
                if (nativeEvent.key === " ") return;
              }}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
              <Text style={styles.resetButtonText}>Send Reset Email</Text>
            </TouchableOpacity>

            {resetMessage ? (
              <Text style={styles.resetMessage}>{resetMessage}</Text>
            ) : null}

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => {
                setModalOpen(false);
                setResetEmail("");
                setResetMessage("");
              }}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Login;
