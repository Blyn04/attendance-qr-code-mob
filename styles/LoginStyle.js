import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff", // white background
    justifyContent: "center",
    alignItems: "center",
  },

  loaderOverlay: {
    position: "absolute",
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
  },

  form: {
    width: "80%",
    alignItems: "center",
  },

  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
    resizeMode: "contain",
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#0d1b2a", // dark navy
  },

  error: {
    color: "#ff4d4d",
    marginBottom: 10,
    textAlign: "center",
  },

  input: {
    width: "100%",
    height: 45,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    paddingHorizontal: 15,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#1b263b", // navy border
    color: "#0d1b2a", // input text color
  },

  passwordWrapper: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },

  inputPassword: {
    flex: 1,
    height: 45,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    paddingHorizontal: 15,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#1b263b",
    color: "#0d1b2a", // input text color
  },

  eyeIcon: {
    position: "absolute",
    right: 15,
    tintColor: "#1b263b", // ensure navy color for eye icon (for Image)
    color: "#1b263b", // for Icon components like Feather or Ionicons
  },

  forgotText: {
    alignSelf: "flex-end",
    marginTop: 5,
    color: "#1b263b", // navy
    textDecorationLine: "underline",
  },

  loginButton: {
    marginTop: 20,
    backgroundColor: "#0d1b2a", // navy button
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
  },

  loginButtonText: {
    color: "#ffffff", // white text inside navy button
    fontSize: 16,
    fontWeight: "600",
  },

  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
  },

  modalContent: {
    width: "85%",
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
    elevation: 5,
  },

  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#0d1b2a",
  },

  resetButton: {
    backgroundColor: "#0d1b2a", // navy
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 10,
  },

  resetButtonText: {
    color: "#ffffff",
    fontWeight: "bold",
  },

  resetMessage: {
    marginTop: 10,
    color: "#1b263b", // navy-ish message
    textAlign: "center",
  },

  closeButton: {
    marginTop: 15,
  },

  closeButtonText: {
    color: "#1b263b", // navy
    textDecorationLine: "underline",
  },
});
