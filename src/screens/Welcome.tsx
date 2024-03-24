import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { loginIcon } from 'assets/images';
import { StyleSheet, View, Image, Dimensions, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { RootStackParamList } from '../navigation';

import { Button, Screen } from '~/component';
import { colors } from '~/theme/colors';

type WelcomeScreenNavigationProps = StackNavigationProp<RootStackParamList, 'welcome'>;

const { width, height } = Dimensions.get('window');

const Welcome = () => {
  const navigation = useNavigation<WelcomeScreenNavigationProps>();
  const onLogin = () => {
    navigation.navigate('login');
  };

  return (
    <Screen contentContainerStyle={styles.container}>
       <View>
        <View style={styles.logoContainer}>
          <Image source={loginIcon} resizeMode="contain" style={styles.imageStyle} />
        </View>

        
      </View>
      <View style={styles.footer}>
          <Button label="Login" onPress={onLogin} textColor={colors.palette.primary} />
        </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.palette.primary,
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
  },
  imageStyle: {
    width: 200,
    height: 300,
  },
  footer: {
    position: 'absolute',
    bottom: Platform.OS === 'android' ? 35 : 50,
    width,
    paddingHorizontal: 23,
    justifyContent: 'space-between',
    alignItems: 'center',
    right: 0,
    left: 0,
  },
});

export default Welcome;
