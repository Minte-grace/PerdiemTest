import {
  StyleSheet,
  Alert,
  Pressable,
  Dimensions,
  ScrollView,
  Image,
  TextInput,
  Text,
  View,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {WEBCLIENTID, BASEURL, IOSCLIENTID} from '../constants/Constants';

const windowHeight = Dimensions.get('window').height;

const Login = ({navigation}) => {
  const [name, onChangeName] = React.useState('');
  const [password, onChangePassword] = React.useState('');
  const [user, setUser] = useState({});
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: WEBCLIENTID,
      offlineAccess: true,
      forceCodeForRefreshToken: true,
      iosClientId: IOSCLIENTID,
    });
    isSignedIn();
  }, []);
  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo);
      setUser(userInfo);
    } catch (error) {
      console.log('Message', error.message);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('User Cancelled the Login Flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Signing In');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('Play Services Not Available or Outdated');
      } else {
        console.log('Some Other Error Happened');
      }
    }
  };
  const isSignedIn = async () => {
    const isSignedIn = await GoogleSignin.isSignedIn();
    if (!!isSignedIn) {
      getCurrentUserInfo();
    } else {
      console.log('Please Login');
    }
  };
  const getCurrentUserInfo = async () => {
    try {
      const userInfo = await GoogleSignin.signInSilently();
      setUser(userInfo);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_REQUIRED) {
        alert('User has not signed in yet');
        console.log('User has not signed in yet');
      } else {
        alert("Something went wrong. Unable to get user's info");
        console.log("Something went wrong. Unable to get user's info");
      }
    }
  };

  useEffect(() => {
    if (user.idToken) {
      navigation.navigate('Home');
    }
  }, [user]);

  const loginUsingUserName = async () => {
    let response = await fetch(BASEURL);
    let data = await response.json();
    if (name == '' && password == '') {
      Alert.alert('Username and Password is Required');
    } else if (data[0].username == name && data[0].password == password) {
      navigation.navigate('Home');
    } else {
      Alert.alert("Sorry you can't sign in with these credentials");
    }
  };

  return (
    <ScrollView bounce="false">
      <View style={{flex: 1}}>
        <Image
          style={styles.image}
          source={{
            uri: 'https://images.unsplash.com/photo-1509822929063-6b6cfc9b42f2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
          }}
        />
        <TextInput
          style={styles.input}
          onChangeText={onChangeName}
          value={name}
          placeholder="Username"
          autoCapitalize="none"
          autoCorrect={false}
        />
        <TextInput
          style={styles.input}
          onChangeText={onChangePassword}
          value={password}
          autoCapitalize="none"
          placeholder="Password"
          secureTextEntry
          autoCorrect={false}
        />
        <Pressable
          onPress={() => loginUsingUserName()}
          style={styles.buttonLogin}>
          <Text style={styles.textLogin}>Login</Text>
        </Pressable>
        <Text style={styles.textOr}>Or sign in using </Text>
        <View style={styles.textContainer}>
          <GoogleSigninButton
            style={styles.buttonGoogle}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={signIn}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default Login;

const styles = StyleSheet.create({
  slide: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: windowHeight / 2,
    marginBottom: 20,
  },
  text: {
    color: 'black',
    fontSize: 35,
    fontWeight: '700',
    textAlign: 'center',
    marginVertical: 20,
  },
  input: {
    height: 50,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 30,
  },
  textOr: {
    textAlign: 'center',
    fontWeight: 'bold',
    marginVertical: 20,
    fontSize: 16,
  },
  buttonGoogle: {
    width: '100%',
    height: 48,
  },
  textLogin: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  buttonLogin: {
    height: 55,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 30,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    paddingHorizontal: 12,
  },
});
