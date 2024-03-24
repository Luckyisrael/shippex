/* eslint-disable prettier/prettier */
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { Dimensions, Platform, StyleSheet, View } from 'react-native';

import { Button, Screen, Text } from '~/component';
import GoBack from '~/component/Goback';
import { BottomTabParamList, RootStackParamList } from '~/navigation';
import { colors } from '~/theme/colors';
import { Input } from '../../../components/sidcn/ui/input';

const { width, height } = Dimensions.get('window');
type WelcomeScreenNavigationProps = StackNavigationProp<RootStackParamList, 'login'>;
type HomeScreenNavigationProps = BottomTabNavigationProp<BottomTabParamList, 'Shippment'>;

const Login = () => {
  const navigation = useNavigation<WelcomeScreenNavigationProps>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [apiData, setApiData] = useState(null);
  const [isValidCredentials, setIsValidCredentials] = useState(false);

  // Function to check if both email and password are not empty and match the provided credentials
  const isLoginEnabled = () => {
    return email.trim() !== '' && password.trim() !== '' && isValidCredentials;
  };

  // Function to handle login
  const handleLogin = async () => {
    try {
      console.log(apiData);
      
      // Navigate to the 'Shippment' screen upon successful login
      navigation.navigate('app', { screen: 'Shippment' });
    } catch (error) {
      console.error('Error logging in:', error);
      // Handle login error
    }
  };

  // Function to validate username and password
  const validateCredentials = () => {
    const validUsername = email.trim() === 'test@brandimic.com';
    const validPassword = password.trim() === 'testy123@';
    setIsValidCredentials(validUsername && validPassword);
  };

  useEffect(() => {
    validateCredentials();
  }, [email, password]);

  return (
    <Screen safeAreaEdges={['top']} contentContainerStyle={styles.container}>
      <GoBack />
      <View style={styles.contentContainer}>
        <View>
          <Text size={20} family='bold' style={{ marginBottom: 5}}>Login</Text>
          <Text size={16} family='light'>Please enter your First, Last name and your phone number in order to register.</Text>
        </View>
        <View>
          <View style={styles.inputContainer}>
            <Input type="Link" placeholder="URL" style={styles.input} />
          </View>
          <View style={styles.inputContainer}>
            <Input 
              type="email" 
              placeholder="username/email" 
              style={styles.input}  
              value={email} 
              onChangeText={setEmail}
            />
          </View>
          <View style={styles.inputContainer}>
            <Input 
              secureTextEntry 
              placeholder="Password" 
              style={styles.input} 
              value={password} 
              onChangeText={setPassword} 
            />
          </View>
        </View>
      </View>
      <View style={styles.footer}>
        <Button 
          label="Login" 
          variant='primary' 
          textColor='#fff' 
          color={isLoginEnabled() ? colors.palette.primary : colors.palette.grey}  
          onPress={handleLogin}
          disabled={!isLoginEnabled()}
        />
      </View>
    </Screen>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    marginHorizontal: 20,
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
  input: {
    width: '100%', 
    //borderWidth: 1, 
    borderRadius: 5, 
    height: 55,
  },
  inputContainer: {marginTop: 20, backgroundColor: '#F4F2F8', borderRadius: 10}
});
