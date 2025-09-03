import { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSQLiteContext } from "expo-sqlite";

import {Entypo,Feather} from 'react-native-vector-icons';
import { 
  createTables, 
  getAllHabits, 
  checkIfCompletionExists, 
  insertHabitToComplete 
} from '../db/DbConnection.js';

import CreateHabitScreen from '../src/CreateHabitScreen.js';
import HomeScreen from '../src/HomeScreen.js';
import SplashScreen from '../src/SplashScreen.js';
import EditHabitScreen from '../src/EditHabitScreen.js';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'gray',
        tabBarShowLabel: true,
        headerShown: false,
        tabBarLabelPosition: 'below-icon',
        tabBarStyle: { height: 80 },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({color}) => <Entypo name="home" color={color} size={28} />,
        }}
      />
      <Tab.Screen
        name="Habits"
        component={CreateHabitScreen}
        options={{
          tabBarIcon: ({color}) => <Feather name="plus-circle" color={color} size={28} />,
        }}
      />
      <Tab.Screen
        name="Edit"
        component={EditHabitScreen}
        options={{
          tabBarIcon: ({color}) => <Feather name="settings" color={color} size={28} />,
        }}
      />
    </Tab.Navigator>
  );
};

function MainStack() {
  return (
    <Stack.Navigator
      initialRouteName="MainTabs"
      screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="MainTabs" component={TabNavigator} />
    </Stack.Navigator>
  );
}

export default function Navigation() {
  const [ready, setReady] = useState(false);
  const db = useSQLiteContext();

  useEffect(() => {
    const setupDb = async () => {
      await createTables(db);

      setReady(true);
    };
    setupDb();
  }, [db]);

  if (!ready) return <SplashScreen />;

  return (
    <NavigationContainer>
      <MainStack/>
    </NavigationContainer>
  );
};