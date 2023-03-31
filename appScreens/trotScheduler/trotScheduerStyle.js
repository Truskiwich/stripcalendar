import { StyleSheet } from "react-native"

const styles = StyleSheet.create({

    header: {
      fontSize: 20, 
      padding: 15, 
      alignSelf: 'center',
      width: 300, textAlign: 'center', 
      backgroundColor: 'darkgrey', 
      borderRadius: 50
    },
    
    genericContainer: {
      // backgroundColor: 'blue',
      flexDirection: 'row',
      padding: 10,
      margin: 15,
      borderRadius: 100,
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center',
  
    },
  
    backgroundContainer: {
      padding: 5,
      backgroundColor: '#eee',
      flexDirection: 'column',
      margin: 15,
      alignSelf: 'center',
      borderRadius: 10,
    },
  
    tinyLogo: {
      width: 22,
      height: 22,
    },
    
    input: {
      margin: 15,
      textAlign: 'center',
      width:300,
      height: 40,
      borderColor: 'blue',
      borderWidth: 1,
      alignSelf: 'center',
    },
    
    btnContainer: {
      flexDirection: 'row',
      alignItems: 'center'
    },
  
    buttonText:{
      color: 'black',
      textAlign: 'center',
      fontSize: 16,
    },
    
    pickedDateTime: {
      fontSize: 16,
      color: 'black',
      padding: 10,
      borderColor: 'blue',
      borderWidth: 1,
      borderRadius: 10
    },
    
    // This only works on iOS
    datePicker: {
      width: 320,
      height: 260,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start',
    },
  })

  export default styles;