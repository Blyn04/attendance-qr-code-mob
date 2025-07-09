import { StyleSheet } from 'react-native';

const DashboardStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },

  pageTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#0d1b2a',
    marginBottom: 40,
    textAlign: 'center',
  },

  button: {
    width: '80%',
    padding: 18,
    marginVertical: 10,
    backgroundColor: '#1b263b',
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },

  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default DashboardStyle;
