import { FontAwesome6, MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { ProfileCircle, Wallet3 } from 'iconsax-react-native';
import { Text, View, StyleSheet } from 'react-native';

import welcome from '../screens/Welcome';

import Login from '~/screens/Auth/Login';
import Profile from '~/screens/Tab/Profile';
import Scan from '~/screens/Tab/Scan';
import Shippment from '~/screens/Tab/Shippment';
import Wallet from '~/screens/Tab/Wallet';
import { colors } from '~/theme/colors';

export type RootStackParamList = {
  welcome: undefined;
  login: undefined;
  app: undefined;
};

export type BottomTabParamList = {
  Shippment: undefined;
  Profile: undefined;
  Scan: undefined;
  Wallet: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function RootStack() {
  return (
    <Stack.Navigator initialRouteName="welcome" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="welcome" component={welcome} />
      <Stack.Screen name="login" component={Login} />
      <Stack.Screen name="app" children={BottomTabNavigator} />
    </Stack.Navigator>
  );
}

const Tab = createBottomTabNavigator<BottomTabParamList>();

const BottomTabNavigator = ({ route }: any) => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 50,
          backgroundColor: '#F2F2F2',
          paddingVertical: 5,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: 5,
        },
        tabBarInactiveTintColor: 'grey',
        tabBarActiveTintColor: colors.palette.primary
      }}>
      <Tab.Screen
        name="Shippment"
        component={Shippment}
        options={{
          tabBarIcon: ({ color, size }: any) => (
            <FontAwesome6 name="boxes-stacked" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Scan"
        component={Scan}
        options={{
          tabBarIcon: ({ color, size }: any) => (
            <MaterialCommunityIcons name="barcode-scan" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Wallet"
        component={Wallet}
        options={{
          tabBarIcon: ({ color, size }: any) => <Wallet3 size="24" color={color} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color, size }: any) => <ProfileCircle size="24" color={color}/>,
        }}
      />
    </Tab.Navigator>
  );
};

export { BottomTabNavigator }