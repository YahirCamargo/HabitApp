import { useState } from 'react';
import {Alert,Text,Image,View,TextInput,TouchableOpacity} from 'react-native';
import { Picker } from '@react-native-picker/picker'; 
import {createHabit,borrarDespuesDeUsarBorrarTablas} from '../db/DbConnection.js'
import styles from '../StylesForScreens/CreateHabitsScreenStyles.js'
import { useSQLiteContext } from "expo-sqlite";

import TopImage from '../assets/ImageApp.png'

import { SafeAreaView } from 'react-native-safe-area-context';



const CreateHabitScreen = ({navigation}) =>{
    const [name, setName] = useState('');
    const [goal, setGoal] = useState('');
    const [goalUnit, setGoalUnit] = useState('');
    const [showPicker, setShowPicker] = useState(true);
    const [showInput, setShowInput] = useState(false);
    const db = useSQLiteContext();

    const handleCreateHabit = async (habitName,habitGoal,habitGoalUnit) => {
        if(!habitName || !habitGoal || isNaN(habitGoal) || !habitGoalUnit){
            Alert.alert("Error", "Please, complete all data.");
            return;
        }
        try{
            const response = await createHabit(db,{habitName,habitGoal: Number(habitGoal),habitGoalUnit});
            if(response===0){
                setName('');
                setGoal('');
                setGoalUnit('');
                setShowPicker(true);
                setShowInput(false);
                Alert.alert("Success", "Habit added!");
                return;
            }
            Alert.alert("Error", "There is another habit with the same name");
        }catch(error){
            console.error('Error: ',error);
            Alert.alert("Error", "Habit cannot be added.");
        }
    };

    const showOrNotPicker = async(habitGoalUnit) =>{
        if(habitGoalUnit === 'Personalized'){
            setGoalUnit('');
            setShowPicker(true);
            setShowInput(true);
        }
        else{
            setShowPicker(true);
            setShowInput(false);
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
                        <TextInput placeholder="Name Habit" value={name} style={styles.inputs} onChangeText={setName} />
                        <TextInput placeholder="Habit Goal" value={goal} style={styles.inputs} onChangeText={setGoal} keyboardType="numeric"/>
                        {showPicker&& (
                            <Picker 
                                style={styles.pickerStyle}
                                selectedValue={goalUnit}
                                enabled={showPicker}
                                onValueChange={(itemValue)=> {
                                    setGoalUnit(itemValue);
                                    showOrNotPicker(itemValue);
                                }}>
                                <Picker.Item label="Seconds" value="Seconds" />
                                <Picker.Item label="Minutes" value="Minutes" />
                                <Picker.Item label="Hours" value="Hours" />
                                <Picker.Item label="Personalized" value="Personalized" />
                            </Picker>)}
                        {showInput && (
                            <TextInput placeholder="Goal Unit" value={goalUnit} style={styles.inputs} onChangeText={setGoalUnit}/>)}
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button} onPress={() => handleCreateHabit(name,goal,goalUnit)}>
                            <Text style={styles.textButton}>Add</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default CreateHabitScreen;
