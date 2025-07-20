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
  const [filter, setFilter] = useState("all"); 
  const [attendees, setAttendees] = useState([]);
  const [activeTab, setActiveTab] = useState("registrations"); 
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

    const attSnapshot = await getDocs(collection(db, "events", event.id, "attendance"));
    const attList = attSnapshot.docs.map((doc) => doc.data());
    setAttendees(attList);
  };

  const renderEvent = ({ item }) => (
    <TouchableOpacity style={styles.eventCard} onPress={() => openEventDetails(item)}>
      <Text style={styles.eventTitle}>{item.title}</Text>
      <Text style={styles.eventMeta}>
        📍 {item.room} | 🗓️ {item.date} | ⏰ {item.startTime} - {item.endTime}
      </Text>
    </TouchableOpacity>
  );

const filteredEvents = events
  .filter((event) => {
    const title = event.title || "";
    const room = event.room || "";
    return (
      title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      room.toLowerCase().includes(searchQuery.toLowerCase())
    );
  })
  .filter((event) => {
    const isPast = dayjs(event.date).isBefore(dayjs(), "day");
    if (filter === "upcoming") return !isPast;
    if (filter === "past") return isPast;
    return true; 
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>

      <Text style={styles.header}>Admin Events</Text>

      <View style={styles.filterBar}>
        <TouchableOpacity
          style={[styles.filterButton, filter === "all" && styles.filterButtonActive]}
          onPress={() => setFilter("all")}
        >
          <Text style={[styles.filterButtonText, filter === "all" && styles.filterButtonTextActive]}>
            All
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.filterButton, filter === "upcoming" && styles.filterButtonActive]}
          onPress={() => setFilter("upcoming")}
        >
          <Text style={[styles.filterButtonText, filter === "upcoming" && styles.filterButtonTextActive]}>
            Upcoming
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.filterButton, filter === "past" && styles.filterButtonActive]}
          onPress={() => setFilter("past")}
        >
          <Text style={[styles.filterButtonText, filter === "past" && styles.filterButtonTextActive]}>
            Past
          </Text>
        </TouchableOpacity>
      </View>

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

            <View style={styles.tabContainer}>
              <TouchableOpacity
                style={[styles.tabButton, activeTab === "registrations" && styles.tabButtonActive]}
                onPress={() => setActiveTab("registrations")}
              >
                <Text
                  style={[
                    styles.tabButtonText,
                    activeTab === "registrations" && styles.tabButtonTextActive,
                  ]}
                >
                  Registrations ({registrations.length})
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.tabButton, activeTab === "attendees" && styles.tabButtonActive]}
                onPress={() => setActiveTab("attendees")}
              >
                <Text
                  style={[
                    styles.tabButtonText,
                    activeTab === "attendees" && styles.tabButtonTextActive,
                  ]}
                >
                  Attendees ({attendees.length})
                </Text>
              </TouchableOpacity>
            </View>

            {activeTab === "registrations" ? (
              <>
                <Text style={styles.sectionTitle}>Registrations ({registrations.length})</Text>
                {registrations.length === 0 ? (
                  <Text>No one has registered yet.</Text>
                ) : (
                  registrations.map((reg, idx) => (
                    <Text key={idx}>• {reg.fullName} ({reg.email})</Text>
                  ))
                )}
              </>
            ) : (
              <>
                <Text style={styles.sectionTitle}>Attendees ({attendees.length})</Text>
                {attendees.length === 0 ? (
                  <Text>No attendees yet.</Text>
                ) : (
                  attendees.map((att, idx) => (
                    <Text key={idx}>✓ {att.fullName} ({att.email})</Text>
                  ))
                )}
              </>
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
