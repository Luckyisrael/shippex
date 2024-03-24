import LottieView from 'lottie-react-native';
import React, { useRef } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';

const { width, height } = Dimensions.get('window');

const AnimationScreen = () => {
  const animation = useRef(null);
  return (
    <View style={styles.animationContainer}>
      <LottieView
        autoPlay
        ref={animation}
        loop={false}
        style={styles.animation}
        source={require('../../assets/lottie/anime.json')}
      />
    </View>
  );
};

export default AnimationScreen;

const styles = StyleSheet.create({
  animationContainer: {
    //flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  animation: {
    width: width, // Set width to screen width
    height: height, // Set height to screen height
  },
});
