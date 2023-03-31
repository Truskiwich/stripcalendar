/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React, { Component, useState } from 'react';
 import { View, Text, Button, StyleSheet, TouchableOpacity, TextInput, ScrollView, date, Image } from 'react-native';
 import CalendarStrip from 'react-native-calendar-strip';
 import moment from 'moment';
 import AsyncStorage from '@react-native-async-storage/async-storage';
 import DateTimePicker from '@react-native-community/datetimepicker';
 import styles from './trotScheduerStyle.js'

 var dates = [];
 var times = [];
 var descriptions = [];
 var tempindex = 0;
 var timeindex = 0;


 // const listItems = fruits.map((fruit) =>
 //   <Text>{fruit}</Text>
 // );

 function listTimes(date){
  if(dates.includes(date)){
    tempindex = dates.indexOf(date)
    return times[tempindex].map((time, index)=> <Text key={index}>{time}</Text>)
  }
  else{
    return <Text>Nothing is scheduled for this day!</Text>
  }
 }

 function listDesc(date){
  if(dates.includes(date)){
    tempindex = dates.indexOf(date)
    return descriptions[tempindex].map((time, index)=> <Text key={index}>{time}</Text>)
  }
  else{
    return <Text></Text>
  }
 }

 function addTrot(date, time, desc){
  console.log('desc = ', desc)
   if(dates.includes(date)){
     tempindex = dates.indexOf(date)
     times[tempindex].push(time)
     descriptions[tempindex].push(desc)
   }
   else{
     dates.push(date)
     times.push([time])
     descriptions.push([desc])
   }
 }

 function removeTrot(date, time){
   tempindex = dates.indexOf(date)
   timeindex = times[tempindex].indexOf(time)
   delete date[tempindex]
   delete timeindex[tempindex][timeindex]
 }

 const storeData = async () => {
  try {
    await AsyncStorage.setItem('dateValues', JSON.stringify(dates))
    await AsyncStorage.setItem('timeValues', JSON.stringify(times))
    await AsyncStorage.setItem('descValues', JSON.stringify(descriptions))
    console.log('Values Stored!')
  } catch (e) {
    console.log('Values are unable to be stored!')
  }
}

const getData = async () => {
  try {
    const datesValue = await AsyncStorage.getItem('dateValues')
    const timesValue = await AsyncStorage.getItem('timeValues')
    const descValue = await AsyncStorage.getItem('descValues')
    if(datesValue!= null && timesValue!= null){ 
      dates = JSON.parse(datesValue)
      times = JSON.parse(timesValue)
      descriptions = JSON.parse(descValue)
    }
    console.log('Data retrieved!')
  } catch(e) {
    if(datesValue != null){
      console.log('No date values are stored!')
    }
    else if(timesValue != null){
      console.log('No time values are stored!')
    }
    else console.log('No values are stored!')
  }
}



 const App = (props) => {
  const[state, setState] = useState({ selectedDate: new Date(), datePick: new Date()})
  // var[date, handleDate] = useState({currentDate: undefined})
  // var[time, handleTime] = useState({currentTime:undefined})
  const [isPickerShow, setIsPickerShow] = useState({datePicker: false, timePicker: false});
  const [isTimePickerShow, setIsTimePickerShow] = useState(false);
  // const sourceDate = sourceMoment.local().toDate();
  const [date, setDate] = useState(new Date(Date.now()));
  const [desc, setDesc] = useState('default');
  const [val, setVal] = useState('')

   onDateSelected = selectedDate => {
     setState({ selectedDate });
     setState({ formattedDate: selectedDate.format('YYYY-MM-DD')});
   }   

   const showDatePicker = () => {
    setIsPickerShow({datePicker: true});
  };

  const showTimePicker = () => {
    setIsPickerShow({timePicker: true});
  };


    getData()

    const onChange = (event, value) => {
      // if(x instanceof Date){}
      setDate(value);
      if (Platform.OS === 'android') {
        setIsPickerShow({ datePicker: false});
      }
    };

     return (
       <ScrollView>
         <CalendarStrip
           scrollable
           calendarAnimation={{type: 'sequence', duration: 30}}
           daySelectionAnimation={{type: 'background', duration: 300, highlightColor: '#9265DC'}}
           style={{height:200, paddingTop: 20, paddingBottom: 10}}
           calendarHeaderStyle={{color: 'white'}}
           calendarColor={'#3343CE'}
           dateNumberStyle={{color: 'white'}}
           dateNameStyle={{color: 'white'}}
           iconContainer={{flex: 0.1}}
           customDatesStyles={props.customDatesStyles}
           highlightDateNameStyle={{color: 'white'}}
           highlightDateNumberStyle={{color: 'lightblue'}}
           highlightDateContainerStyle={{backgroundColor: 'black'}}
           markedDates={props.markedDates}
           selectedDate={state.selectedDate}
           onDateSelected={onDateSelected}
           useIsoWeekday={false}
          />

          <View style = {styles.backgroundContainer}>
            <Text style={styles.header}>Selected Date: {state.formattedDate}</Text>
            
            <View style = {styles.genericContainer}>
              <View style={{padding: 10}}>{listTimes(state.formattedDate)}</View>  
              <View style={{paddingLeft: 20}}>{listDesc(state.formattedDate)}</View>
            </View>
          </View>
          

          {/* Container for the currently chosen date and the button to open date picker */}
          <View style={styles.backgroundContainer}>
            {/* <View style = {{flexDirection: 'row', alignItems: 'center'}}> */}
            <Text style={styles.header}>Schedule a Trot </Text>
            {/* </View> */}
          
            {/* Button to open Date picker */}
            {!isPickerShow.datePicker && (
              // <View style={styles.btnContainer}>
              //   <Button style={styles.Button} title="Select Date" color="blue" onPress={showDatePicker} />
              // </View>
              <View style = {styles.btnContainer}>
                <TouchableOpacity
                style = {styles.genericContainer}
                onPress = {
                  () => {showDatePicker()}
                }>
                <Text style = {styles.buttonText}> Select Date </Text>
                </TouchableOpacity>
                {/* Shows user current date selection */}
                <Text style={styles.pickedDateTime}>{moment(date).format('MM/DD/YYYY')}</Text>
              </View>
            )}

            {!isPickerShow.timePicker && (
              <View style={styles.btnContainer}>
                <TouchableOpacity
                style = {styles.genericContainer}
                onPress = {showTimePicker}
                >
                  <Text style = {styles.buttonText}> Select Time </Text>
                </TouchableOpacity>
                <Text style={styles.pickedDateTime}>{moment(date).format('h:mm a')}</Text>
              </View>
            )}
            
                   

            <TextInput style = {styles.input}
              underlineColorAndroid = "transparent"
              placeholder = "Description"
              autoCapitalize = "none"
              onChangeText = {text => setVal(text)}
              defaultValue={val}/>
              
            <TouchableOpacity
              style = {styles.genericContainer}
              onPress = {
                () => {addTrot(moment(date).format('YYYY-MM-DD'), moment(date).format('h:mm a'), val), storeData(), setVal('')}
              }>
              <Image
                style={styles.tinyLogo}
                source={require('stripcalendar/pictures/button.png')}
              />
              <Text style = {styles.buttonText}> Add Date and Time </Text>
            </TouchableOpacity>
          </View>

          {/* The date picker object */}
          {isPickerShow.datePicker && (
            <DateTimePicker
              value={date}
              mode={'date'}
              display={"calendar"}
              is24Hour={true}
              onChange={onChange}
              style={styles.datePicker}
            />
          )}  

          {/* The time picker object */}
          {isPickerShow.timePicker && (
            <DateTimePicker
              value={date}
              mode={'time'}
              display={'clock'}
              onChange={onChange}
              style={styles.datePicker}
              minuteInterval={10}
            />
          )}
          
        </ScrollView>
     );
 }

 

  export default App;