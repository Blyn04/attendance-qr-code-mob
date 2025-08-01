import { StyleSheet, Platform } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff", // white background
    padding: 20,
    marginTop: 50,
  },

  header: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#0d1b2a", // navy
    marginBottom: 20,
    textAlign: "center",
  },

  addButton: {
    backgroundColor: "#1b263b", // dark navy
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 16,
  },

  addButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },

  eventList: {
    paddingBottom: 20,
  },

  eventCard: {
    backgroundColor: "#f0f4f8",
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 5,
    borderLeftColor: "#0d1b2a",
  },

  eventTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0d1b2a",
    marginBottom: 4,
  },

  eventMeta: {
    fontSize: 14,
    color: "#555",
  },

  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.4)", // translucent background
    padding: 20,
  },

  modalContent: {
    backgroundColor: "#ffffff",
    borderRadius: 16, 
    overflow: "hidden", 
    width: 340, 
    maxHeight: "90%",
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 10,
  },

  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#0d1b2a",
    marginBottom: 16,
    textAlign: "center",
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 12,
    fontSize: 16,
    backgroundColor: "#fff",
  },

  label: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 4,
    color: "#0d1b2a",
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 20,
    marginBottom: 10,
    color: "#0d1b2a",
  },

  submitButton: {
    backgroundColor: "#1b263b",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },

  submitButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },

  cancelButton: {
    marginTop: 20,
    alignItems: "center",
  },

  cancelButtonText: {
    color: "#0d1b2a",
    textDecorationLine: "underline",
    fontSize: 16,
  },

  backButton: {
    alignSelf: "flex-start",
    marginBottom: 10,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    backgroundColor: "#e0e0e0",
  },

  backButtonText: {
    color: "#0d1b2a",
    fontSize: 16,
    fontWeight: "600",
  },

  filterBar: {
  flexDirection: "row",
  justifyContent: "center",
  marginBottom: 12,
  gap: 10,
},

filterButton: {
  paddingVertical: 8,
  paddingHorizontal: 16,
  backgroundColor: "#e0e0e0",
  borderRadius: 20,
},

  filterButtonActive: {
    backgroundColor: "#1b263b",
  },

  filterButtonText: {
    fontSize: 14,
    color: "#333",
  },

  filterButtonTextActive: {
    color: "#fff",
    fontWeight: "600",
  },

  tabContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 20,
    borderRadius: 10,
    backgroundColor: "#f0f0f0",
    overflow: "hidden",
  },

  tabButton: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: "#e0e0e0",
    alignItems: "center",
  },

  tabButtonActive: {
    backgroundColor: "#1b263b",
  },

  tabButtonText: {
    color: "#333",
    fontWeight: "500",
  },

  tabButtonTextActive: {
    color: "#fff",
    fontWeight: "600",
  },

});
