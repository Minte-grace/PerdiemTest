import React from 'react';
import {StyleSheet, Pressable, View, Image, Text} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';

const slides = [
  {
    key: 'one',
    text: `Mobile apps made to order`,
    image:
      'https://images.unsplash.com/photo-1633250391894-397930e3f5f2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
  },
  {
    key: 'two',

    text: `Launching your own app shouldn’t be so hard`,
    image:
      'https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80',
  },
  {
    key: 'three',
    text: `Mobile app users spend 3x more`,
    image:
      'https://images.unsplash.com/photo-1541560052-3744e48ab80b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
  },
];

const renderItem = ({item}) => {
  return (
    <View style={styles.slide}>
      <Image style={styles.image} source={{uri: item.image}} />
      <Text style={styles.text}>{item.text}</Text>
    </View>
  );
};

const Intro = ({navigation}) => {
  return (
    <AppIntroSlider
      renderDoneButton={() => (
        <Pressable
          onPress={() => navigation.navigate('Login')}
          style={{
            backgroundColor: '#0071EA',
            padding: 15,
            borderRadius: 10,
          }}>
          <Text style={{color: 'white', fontWeight: 'bold', fontSize: 15}}>
            Done
          </Text>
        </Pressable>
      )}
      activeDotStyle={{backgroundColor: '#0071EA'}}
      dotStyle={{backgroundColor: '#0071EA', opacity: 0.3}}
      renderItem={renderItem}
      data={slides}
    />
  );
};
export default Intro;

const styles = StyleSheet.create({
  slide: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: '60%',
  },
  text: {
    color: 'black',
    fontSize: 35,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 80,
  },
});
