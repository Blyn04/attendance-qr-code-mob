import { StyleSheet } from 'react-native';

const DashboardStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff", // white background
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0d1b2a', // dark navy
    marginBottom: 32,
  },

  button: {
    width: '80%',
    padding: 18,
    marginVertical: 10,
    backgroundColor: '#1b263b', // navy button
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },

  buttonText: {
    color: '#ffffff', // white text
    fontSize: 18,
    fontWeight: '600',
  },
});

export default DashboardStyle;
