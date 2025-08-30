import { useState } from 'react';
import {Text,Image,View,TextInput,TouchableOpacity} from 'react-native';

import styles from '../StylesForScreens/CreateHabitsScreenStyles.js'

import TopImage from '../assets/ImageApp.png'

import { SafeAreaView } from 'react-native-safe-area-context';

const CreateHabitScreen = ({navigation}) =>{
    const [name, setName] = useState('');
    const [objetive, setObjetive] = useState('');

    const handleCreateHabit = () => {

    };

    const searchHabitByName = () => {

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
                        <TextInput placeholder="Objetive" value={objetive} style={styles.inputs} onChangeText={setObjetive}/>
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button}>
                            <Text style={styles.textButton}>Add</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default CreateHabitScreen;
