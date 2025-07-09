import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingTop: 60,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#1b263b",
  },

  scanner: {
    width: width * 0.9,
    height: width * 0.9,
    borderRadius: 20,
    overflow: "hidden",
  },

  button: {
    marginTop: 20,
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
    marginTop: 15,
    fontSize: 16,
    color: "#0d1b2a",
  },
  
  errorText: {
    color: "red",
    fontSize: 16,
    marginBottom: 10,
  },
});
