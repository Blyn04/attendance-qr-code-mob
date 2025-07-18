import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");
const SCAN_BOX_SIZE = width * 0.7;

export default StyleSheet.create({
  fullscreenContainer: {
    flex: 1,
    position: "relative",
  },

  scanner: {
    flex: 1,
  },

  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },

  scanBox: {
    width: SCAN_BOX_SIZE,
    height: SCAN_BOX_SIZE,
    borderColor: "#ffffff",
    borderWidth: 2,
    borderRadius: 12,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    overflow: "hidden",
  },

  scanLine: {
    width: "100%",
    height: 4,
    backgroundColor: "#00ffcc",
    position: "absolute",
    top: 0,
    left: 0,
  },

  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    backgroundColor: "#ffffffcc",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    zIndex: 10,
  },

  backButtonText: {
    fontSize: 16,
    color: "#1b263b",
    fontWeight: "bold",
  },

  scanAgainButton: {
    position: "absolute",
    bottom: 100,
    alignSelf: "center",
    backgroundColor: "#1b263b",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
  },

  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },

  dataText: {
    position: "absolute",
    bottom: 60,
    alignSelf: "center",
    fontSize: 16,
    color: "#ffffff",
    backgroundColor: "rgba(0,0,0,0.6)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },

  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  errorText: {
    color: "red",
    fontSize: 16,
    marginBottom: 10,
  },

  button: {
    marginTop: 20,
    backgroundColor: "#1b263b",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
  },
});
