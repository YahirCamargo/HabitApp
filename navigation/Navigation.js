import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import {Entypo,Feather} from 'react-native-vector-icons'

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
  return (
    <NavigationContainer>
      <MainStack/>
    </NavigationContainer>
  );
};