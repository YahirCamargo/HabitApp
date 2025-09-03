import { useState,useCallback, useEffect} from 'react';
import {Text,View,FlatList} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSQLiteContext } from "expo-sqlite";

import { 
  createTables, 
  getAllHabits, 
  checkIfCompletionExists, 
  insertHabitToComplete,
  getHabitsWithOutCompleteByDate,
  updateProgressHabitByName
} from '../db/DbConnection.js';

import { useFocusEffect } from '@react-navigation/native';

import Slider from '@react-native-community/slider';
//import ProgressBar from 'react-native-progress/Bar';

import styles from '../StylesForScreens/HomeScreenStyles.js';

/*
<ProgressBar
                    progress={progress}
                    width={350}
                    height={20}
                    color="#23D7C2"
                    unfilledColor="#29323C"
                    borderWidth={0.1}
                    borderColor="#000"
                />
                <Text style={styles.textPercentage}>
                    {Math.round(progress * 100)}%
                </Text>

*/

const HomeScreen = ({navigation}) =>{
    const [progress, setProgress] = useState(0);
    const [habits, setHabits] = useState([]);
    const [goalsSlider, setGoalsSlider] = useState({});
    const db = useSQLiteContext();
    
    const today = new Date().toISOString().slice(0, 10);


    useFocusEffect(
        useCallback(() => {
            const fetchData = async() =>{
                try {
                    const habits = await getAllHabits(db);
                    for (const habit of habits) {
                        const exists = await checkIfCompletionExists(db,habit.id, today);
                        if (!exists) {
                            await insertHabitToComplete(db, habit.id, today);
                        }
                    }
                    const result =await getHabitsWithOutCompleteByDate(db,today);
                    setHabits(result);
                    if (Object.keys(goalsSlider).length === 0) {
                        const initialGoalsSlider = {};
                        result.forEach(habit => {
                            initialGoalsSlider[habit.id] = habit.progress;
                        });
                        setGoalsSlider(initialGoalsSlider);
                    }
                } catch (error) {
                    console.error("Error loading habits: ", error);
                }
            }
            fetchData();
        return () => {
            
        };
        }, [db,today])
    );
    
    return(
        <SafeAreaView style={styles.safeStyle}>
            <View style={styles.background}>
                <Text style={styles.text}>
                    Today's Habits
                </Text>
                <FlatList
                    data={habits}
                    style={styles.list}
                    keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
                    renderItem={({ item }) => (
                        <View style={styles.habitItem}>
                            <Text style={styles.habitName}>{item.name}</Text>
                            <Text style={styles.progressStyle}>Progress:</Text>
                            <Slider
                            minimumValue={0}
                            maximumValue={item.goal}
                            value={goalsSlider[item.id] || 0}
                            onValueChange={value => {
                                setGoalsSlider(prev => ({
                                ...prev,
                                [item.id]: value
                                }));
                            }}
                            onSlidingComplete={async value => {
                                const roundProgress = Math.ceil(value);
                                await updateProgressHabitByName(db, item.id, roundProgress, today);
                            }}
                            />
                            {/*<Text style={styles.habitName}>{goalsSlider[item.id]?.toFixed(0) || 0}</Text>*/}
                            <Text style={styles.habitName}>{Math.ceil(goalsSlider[item.id])?.toFixed(0) || 0} {item.goal_unit}</Text>
                        </View>
                    )}
                />
            </View>
        </SafeAreaView>
    );
};

export default HomeScreen;
