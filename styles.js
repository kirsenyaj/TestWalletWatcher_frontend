import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  // --- Shared Layouts ---
  container: { 
    flex: 1, 
    padding: 20, 
    backgroundColor: '#ffdf5d' 
  },
  containerCenter: { 
    flex: 1, 
    justifyContent: 'center', 
    padding: 20, 
    backgroundColor: '#ffdf5d' 
  },
  
  // --- Cards (Used in Lists and Forms) ---
  card: { 
    backgroundColor: 'white', 
    padding: 20, 
    borderWidth: 2, 
    borderColor: '#000',
    marginBottom: 15,
    // Android Shadow
    elevation: 5,
    // iOS Shadow
    shadowColor: "#000",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0
  },
  listCard: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    backgroundColor: 'white', 
    padding: 15, 
    marginBottom: 10, 
    borderWidth: 2, 
    borderColor: '#000',
    elevation: 3
  },

  // --- Text Styles ---
  mainTitle: { 
    fontSize: 28, 
    fontWeight: '900', 
    textAlign: 'center', 
    marginBottom: 30,
    color: '#000'
  },
  welcomeText: { 
    fontSize: 20, 
    fontWeight: 'bold', 
    marginBottom: 15 
  },
  itemTitle: { 
    fontSize: 16, 
    fontWeight: 'bold' 
  },
  itemCategory: { 
    fontSize: 12, 
    fontStyle: 'italic', 
    color: '#555' 
  },
  itemAmount: { 
    fontSize: 16, 
    color: '#d32f2f', 
    fontWeight: 'bold' 
  },
  emptyText: { 
    textAlign: 'center', 
    marginTop: 20,
    color: '#666'
  },
  
  // --- Form Inputs ---
  label: { 
    fontWeight: 'bold', 
    marginBottom: 5,
    fontSize: 14
  },
  input: { 
    borderWidth: 1, 
    borderColor: '#000', 
    padding: 10, 
    marginBottom: 15, 
    backgroundColor: '#f9f9f9',
    borderRadius: 4
  },
  
  // --- Details View ---
  detailLabel: { 
    fontSize: 14, 
    color: '#555', 
    marginTop: 10 
  },
  detailValue: { 
    fontSize: 18, 
    fontWeight: 'bold',
    marginBottom: 5
  },
  linkText: {
    color: '#007bff', // Blue color like a link
    marginTop: 15,
    textAlign: 'center',
    fontWeight: 'bold',
  }
});

export default styles;