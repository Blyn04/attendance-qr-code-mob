import { StyleSheet } from 'react-native';

const DashboardStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f0eb",
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#7c5132',
    marginBottom: 32,
  },
  button: {
    width: '80%',
    padding: 18,
    marginVertical: 10,
    backgroundColor: '#7c5132',
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default DashboardStyle;
