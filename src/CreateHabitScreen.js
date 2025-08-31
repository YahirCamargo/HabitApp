import { useState } from 'react';
import {Alert,Text,Image,View,TextInput,TouchableOpacity} from 'react-native';
import {createHabit} from '../db/DbConnection.js'
import styles from '../StylesForScreens/CreateHabitsScreenStyles.js'

import TopImage from '../assets/ImageApp.png'

import { SafeAreaView } from 'react-native-safe-area-context';

const CreateHabitScreen = ({navigation}) =>{
    const [name, setName] = useState('');
    const [goal, setGoal] = useState('');

    const handleCreateHabit = async (habitName,habitGoal) => {
        if(!habitName || !habitGoal || isNaN(habitGoal)){
            Alert.alert("Error", "Please, complete all data.");
            return;
        }
        try{
            const response = await createHabit({habitName,habitGoal: Numer(habitGoal)});
            if(response===0){
                setName('');
                setGoal('');
                Alert.alert("Success", "Habit added!");
                return;
            }
            Alert.alert("Error", "There is another habit with the same name");
        }catch(error){
            console.error('Error: ',error);
            Alert.alert("Error", "Habit cannot be added.");
        }
    };
 
    return(
        <SafeAreaView style={styles.safeStyle}>
            <View style={styles.background}>
                <View style={styles.logoContainer}>
                    <Image style={styles.logo} source={TopImage}/> 
                </View>
                <View style={styles.backgroundBottom}>
                    <Text style={styles.texts}>
                        Create Habit
                    </Text>
                    <View style={styles.inputsContainer}>
                        <TextInput placeholder="Name" value={name} style={styles.inputs} onChangeText={setName} />
                        <TextInput placeholder="Goal" value={goal} style={styles.inputs} onChangeText={setGoal} keyboardType="numeric"/>
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button} onPress={() => handleCreateHabit(name,goal)}>
                            <Text style={styles.textButton}>Add</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default CreateHabitScreen;
