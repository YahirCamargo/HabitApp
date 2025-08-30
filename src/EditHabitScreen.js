import {Text,TextInput,View} from 'react-native';

import styles from '../StylesForScreens/EditHabitScreenStyles.js'

import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';

const EditHabitScreen = ({navigation}) =>{
    const [habit,setHabit]= useState('');
    return(
        <SafeAreaView style={styles.safeStyle}>
            <View style={styles.background}>
                <Text style={styles.textTitle}>
                    Edit habit's
                </Text>
                <TextInput value={habit} placeholder='Search habit' onChangeText={setHabit} style={styles.input}/>
            </View> 
        </SafeAreaView>
    );
};



export default EditHabitScreen;