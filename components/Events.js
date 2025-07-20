import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal,
  Alert,
} from "react-native";
import {
  collection,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../config/FirebaseConfig";
import styles from "../styles/EventsStyle";
import dayjs from "dayjs";
import { useNavigation } from "@react-navigation/native";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [registrations, setRegistrations] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigation = useNavigation();

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

  const filteredEvents = events.filter((event) => {
    const title = event.title || "";
    const room = event.room || "";
    return (
        title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        room.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backButtonText}>← Back</Text>
      </TouchableOpacity>

      <Text style={styles.header}>Admin Events</Text>

      <TextInput
        style={styles.input}
        placeholder="Search by title or room..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <FlatList
        data={filteredEvents}
        keyExtractor={(item) => item.id}
        renderItem={renderEvent}
        contentContainerStyle={styles.eventList}
      />

      {/* Selected Event Details */}
      <Modal
        visible={!!selectedEvent}
        animationType="slide"
        transparent
        onRequestClose={() => setSelectedEvent(null)}
      >
        <View style={styles.modalOverlay}>
          <ScrollView contentContainerStyle={styles.modalContent}>
            <Text style={styles.modalTitle}>{selectedEvent?.title}</Text>
            <Text>Room: {selectedEvent?.room}</Text>
            <Text>Date: {selectedEvent?.date}</Text>
            <Text>
              Time: {selectedEvent?.startTime} - {selectedEvent?.endTime}
            </Text>
            <Text>
              Form Closes: {dayjs(selectedEvent?.formDeadline).format("YYYY-MM-DD HH:mm")}
            </Text>
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
        </View>
      </Modal>
    </View>
  );
};

export default Events;
