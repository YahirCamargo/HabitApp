import { useState } from 'react';
import {Text,StyleSheet,View} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import ProgressBar from 'react-native-progress/Bar';

import styles from '../StylesForScreens/HomeScreenStyles.js';


const HomeScreen = ({navigation}) =>{
const [progress, setProgress] = useState(0.2);

    
    return(
        <SafeAreaView style={styles.safeStyle}>
            <View style={styles.background}>
                <Text style={styles.text}>
                    Today's Habits
                </Text>
                <Text style={styles.textPercentage}>
                    {Math.round(progress * 100)}%
                </Text>
                <ProgressBar
                    progress={progress}
                    width={350}
                    height={20}
                    color="#23D7C2"
                    unfilledColor="#29323C"
                    borderWidth={0.1}
                    borderColor="#000"
                />
            </View>
        </SafeAreaView>
    );
};

export default HomeScreen;
