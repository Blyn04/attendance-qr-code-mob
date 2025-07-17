import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles/DashboardStyle'; 

export default function Dashboard() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Attendance Tracker</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Events")}
      >
        <Text style={styles.buttonText}>Events</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("AttendanceQR")} 
      >
        <Text style={styles.buttonText}>QR Scanner</Text>
      </TouchableOpacity>

    </View>
  );
}
