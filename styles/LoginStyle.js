import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f0eb",
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
    color: "#2e1e17",
  },

  error: {
    color: "red",
    marginBottom: 10,
    textAlign: "center",
  },

  input: {
    width: "100%",
    height: 45,
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 15,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#ccc",
  },

  passwordWrapper: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  
  inputPassword: {
    flex: 1,
    height: 45,
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 15,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#ccc",
  },

  eyeIcon: {
    position: "absolute",
    right: 15,
  },

  forgotText: {
    alignSelf: "flex-end",
    marginTop: 5,
    color: "#7c5132",
    textDecorationLine: "underline",
  },

  loginButton: {
    marginTop: 20,
    backgroundColor: "#7c5132",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
  },

  loginButtonText: {
    color: "#fff",
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
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
    elevation: 5,
  },

  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },

  resetButton: {
    backgroundColor: "#7c5132",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 10,
  },

  resetButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },

  resetMessage: {
    marginTop: 10,
    color: "#444",
    textAlign: "center",
  },

  closeButton: {
    marginTop: 15,
  },

  closeButtonText: {
    color: "#7c5132",
    textDecorationLine: "underline",
  },
});
