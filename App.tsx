import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { Dimensions } from 'react-native';
import { useFonts } from "expo-font";

import RootStack from './src/navigation';
import { useCallback, useEffect, useState } from 'react';
import * as SplashScreen from "expo-splash-screen";
import AnimationScreen from '~/animation/animation';

//SplashScreen.preventAutoHideAsync();
const { width, height } = Dimensions.get('window');

export default function App() {
  const [appReady, setAppReady] = useState(false);

  const [fontsLoaded] = useFonts({
    "CircularStd-Black": require("./assets/fonts/CircularStd-Black.otf"),
    "CircularStd-BlackItalic": require("./assets/fonts/CircularStd-BlackItalic.otf"),
    "CircularStd-Bold": require("./assets/fonts/CircularStd-Bold.otf"),
    "CircularStd-BoldItalic": require("./assets/fonts/CircularStd-BoldItalic.otf"),
    "CircularStd-Book": require("./assets/fonts/CircularStd-Book.otf"),
    "CircularStd": require("./assets/fonts/CircularStd.otf"),
    "CircularStd-Light": require("./assets/fonts/CircularStd-Light.otf"),
    "CircularStd-Medium": require("./assets/fonts/CircularStd-Medium.otf"),
  });


  useEffect(() => {
    if (fontsLoaded) {
      //await SplashScreen.hideAsync();
      setAppReady(true)
    }
	}, [fontsLoaded]);

	if (!appReady) {
		return (
      <AnimationScreen/>
    );
	}

  return (
    <NavigationContainer >
      <RootStack />
    </NavigationContainer>
  );
}

const xm = width <= 360 && height <= 640;
const sm = width > 360 && height > 640;

export { sm, xm };
