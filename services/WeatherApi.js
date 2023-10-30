import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";


export default function WeatherData({lat, lon}) {
    baseWeatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=5c9762e126ec77846cfbc54a43bd72e9&units=metric&lang=pt_br`

    const [carregando, setCarregado] = useState(true);
    const [dados, setDados] = useState(null);

    useEffect(
        () => {
            fetch(baseWeatherURL)
                .then((response) => response.json())
                .then((json) => setDados(json))
                .catch((erro) => (alert(erro)))
                .finally(() => setCarregado(false))
        }, []
    );

    return (
        <View>
            {
                carregando ? <ActivityIndicator /> : (
                    <Text>
                        {dados}
                    </Text>
                )
            }

        </View>
    );

}
