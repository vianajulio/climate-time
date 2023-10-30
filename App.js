import { ActivityIndicator, Button, Platform, StyleSheet, Text, ToastAndroid, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import axios from 'axios';
import WeatherCard from './components/WeatherCard'
import * as Location from 'expo-location';
import Toast from 'react-native-root-toast';
import LoadingCard from './components/LoadingCard';
import CustomButton from './components/CustomButton';

export default function App() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  let lat = ''
  let long = ''

  // Solicita permissão para pegar a localização do smartphone
  useEffect(() => {
    (async () => {

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  if (errorMsg) {
  } else if (location) {
    lat = (JSON.stringify(location.coords.latitude).slice(0, 6));
    long = (JSON.stringify(location.coords.longitude).slice(0, 6));

    const coordText = 'Coordeandas aplicadas.'
    const toast = Toast.show(coordText, {
      duration: Toast.durations.SHORT,
    });

    if (Platform.OS === 'android') {
      ToastAndroid.show(coordText, ToastAndroid.SHORT);
    } else {
      toast
    }
    // TODO: adicionar ativação do bottão atualzar após pegar a localização
  }

  // Realiza requisão com a API
  const fetchData = () => {
    const apiKey = '5c9762e126ec77846cfbc54a43bd72e9'
    const baseWeatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric&lang=pt_br`
    setIsLoading(true);
    axios.get(baseWeatherURL)
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Erro na requisição:', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (isLoading && lat !== '' && long !== '') {
      fetchData();
    }
  }, [isLoading]);

  return (
    <View style={styles.container}>
      {
        data ? <WeatherCard data={data} /> : <LoadingCard />
      }
      <CustomButton label={'Atualizar'} onPress={() => setIsLoading(true)} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
