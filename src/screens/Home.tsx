import {
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Switch,
  View,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const options = [
  {
    option: 1,
    isEnabled: false,
  },
  {
    option: 2,
    isEnabled: false,
  },
  {
    option: 3,
    isEnabled: false,
  },
  {
    option: 4,
    isEnabled: false,
  },
  {
    option: 5,
    isEnabled: false,
  },
  {
    option: 6,
    isEnabled: false,
  },
  {
    option: 7,
    isEnabled: false,
  },
  {
    option: 8,
    isEnabled: false,
  },
  {
    option: 9,
    isEnabled: false,
  },
  {
    option: 10,
    isEnabled: false,
  },
];
const Home = () => {
  const [data, setData] = useState(options);
  const [loading, setLoading] = useState(false);
  const toggleSwitch = option => {
    setData(current =>
      current.map(obj => {
        if (obj.option === option) {
          return {...obj, option: option, isEnabled: !obj.isEnabled};
        }
        return obj;
      }),
    );
  };

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const value = await AsyncStorage.getItem('BUTTON_DATA');
        if (value !== null && value.length > 0) {
          setData(JSON.parse(value));
          setLoading(false);
        } else {
          setData(options);
          setLoading(false);
        }
      } catch (e) {
        console.log(e);
        setLoading(false);
      }
      await AsyncStorage.setItem('LOGIN', 'True');
    };
    getData();
  }, []);

  useEffect(() => {
    const storeData = async value => {
      try {
        const jsonValue = JSON.stringify(data);
        await AsyncStorage.setItem('BUTTON_DATA', jsonValue);
      } catch (e) {
        console.log(e);
      }
    };
    storeData(data);
  }, [data]);

  return (
    <ScrollView>
      <View style={styles.container}>
        {loading && <ActivityIndicator size="large" />}
        {!loading &&
          data?.map((item, index) => (
            <Switch
              trackColor={{false: '#767577', true: '#81b0ff'}}
              thumbColor={item.isEnabled ? '#0071EA' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={() => toggleSwitch(item.option)}
              value={item.isEnabled}
              style={{marginTop: 25}}
            />
          ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 150,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Home;
