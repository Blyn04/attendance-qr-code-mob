import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Modal,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import {
  collection,
  addDoc,
  getDocs,
  onSnapshot,
  doc,
  setDoc,
} from "firebase/firestore";
import { db } from "../config/FirebaseConfig";
import DateTimePicker from "@react-native-community/datetimepicker";
import styles from "../styles/EventsStyle";
import dayjs from "dayjs";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [room, setRoom] = useState("");
  const [date, setDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [formDeadline, setFormDeadline] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [registrations, setRegistrations] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "events"), (snapshot) => {
      const list = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      list.sort((a, b) => dayjs(a.date).diff(dayjs(b.date)));
      setEvents(list);
    });

    return () => unsub();
  }, []);

  const handleAddEvent = async () => {
    if (!title || !room || !date || !startTime || !endTime) {
      return Alert.alert("Error", "Please fill in all fields.");
    }

    try {
      const docRef = await addDoc(collection(db, "events"), {
        title,
        room,
        date: dayjs(date).format("YYYY-MM-DD"),
        startTime: dayjs(startTime).format("HH:mm"),
        endTime: dayjs(endTime).format("HH:mm"),
        formDeadline: formDeadline.toISOString(),
      });

      const defaultForm = {
        questions: [
          { type: "text", label: "Full Name", required: true },
          { type: "email", label: "Email", required: true },
          { type: "text", label: "Year", required: true },
          { type: "text", label: "Section (Format: INF###)", required: true },
          { type: "checkbox", label: "Photo Consent" },
          { type: "checkbox", label: "Video Consent" },
          { type: "checkbox", label: "Agree to Data Privacy Policy", required: true },
        ],
      };

      await setDoc(doc(db, "events", docRef.id, "form", "template"), defaultForm);

      setModalVisible(false);
      setTitle("");
      setRoom("");
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Failed to add event.");
    }
  };

  const openEventDetails = async (event) => {
    setSelectedEvent(event);
    const regSnapshot = await getDocs(collection(db, "events", event.id, "registrations"));
    const regList = regSnapshot.docs.map((doc) => doc.data());
    setRegistrations(regList);
  };

  const renderEvent = ({ item }) => (
    <TouchableOpacity style={styles.eventCard} onPress={() => openEventDetails(item)}>
      <Text style={styles.eventTitle}>{item.title}</Text>
      <Text style={styles.eventMeta}>
        📍 {item.room} | 🗓️ {item.date} | ⏰ {item.startTime} - {item.endTime}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Admin Events</Text>

      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.addButtonText}>Add Event</Text>
      </TouchableOpacity>

      <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        renderItem={renderEvent}
        contentContainerStyle={styles.eventList}
      />

      {/* Add Event Modal */}
      <Modal visible={modalVisible} animationType="slide">
        <ScrollView style={styles.modalContent}>
          <Text style={styles.modalTitle}>Add New Event</Text>

          <TextInput
            style={styles.input}
            placeholder="Event Title"
            value={title}
            onChangeText={setTitle}
          />

          <TextInput
            style={styles.input}
            placeholder="Venue / Room"
            value={room}
            onChangeText={setRoom}
          />

          <Text style={styles.label}>Date:</Text>
          <DateTimePicker value={date} mode="date" onChange={(e, val) => setDate(val)} />

          <Text style={styles.label}>Start Time:</Text>
          <DateTimePicker value={startTime} mode="time" onChange={(e, val) => setStartTime(val)} />

          <Text style={styles.label}>End Time:</Text>
          <DateTimePicker value={endTime} mode="time" onChange={(e, val) => setEndTime(val)} />

          <Text style={styles.label}>Form Deadline:</Text>
          <DateTimePicker value={formDeadline} mode="datetime" onChange={(e, val) => setFormDeadline(val)} />

          <TouchableOpacity style={styles.submitButton} onPress={handleAddEvent}>
            <Text style={styles.submitButtonText}>Create Event</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </ScrollView>
      </Modal>

      {/* Selected Event Details */}
      <Modal visible={!!selectedEvent} animationType="slide">
        <ScrollView style={styles.modalContent}>
          <Text style={styles.modalTitle}>{selectedEvent?.title}</Text>
          <Text>Room: {selectedEvent?.room}</Text>
          <Text>Date: {selectedEvent?.date}</Text>
          <Text>Time: {selectedEvent?.startTime} - {selectedEvent?.endTime}</Text>
          <Text>Form Closes: {dayjs(selectedEvent?.formDeadline).format("YYYY-MM-DD HH:mm")}</Text>
          <Text style={styles.sectionTitle}>Registrations ({registrations.length})</Text>

          {registrations.length === 0 ? (
            <Text>No one has registered yet.</Text>
          ) : (
            registrations.map((reg, idx) => (
              <Text key={idx}>• {reg.fullName} ({reg.email})</Text>
            ))
          )}

          <TouchableOpacity style={styles.cancelButton} onPress={() => setSelectedEvent(null)}>
            <Text style={styles.cancelButtonText}>Close</Text>
          </TouchableOpacity>
        </ScrollView>
      </Modal>
    </View>
  );
};

export default Events;