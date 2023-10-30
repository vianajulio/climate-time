import { useEffect, useState } from "react";
import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";
// Json
// Imgs / Icones
import imgErro from '../assets/favicon.png'

import rainD from '../assets/climateIcons/rainD.png'
import rainN from '../assets/climateIcons/rainN.png'

import cloundsD from '../assets/climateIcons/fewCloundsD.png'
import cloundsN from '../assets/climateIcons/fewCloundsN.png'

import clearD from '../assets/climateIcons/clearD.png'
import clearN from '../assets/climateIcons/clearD.png'

import windIcon from '../assets/climateIcons/wind.png'
import rainBottom from '../assets/climateIcons/rain_bottom.png'

import snow from '../assets/climateIcons/snow.png'
import mist from '../assets/climateIcons/mist.png'
import showRain from '../assets/climateIcons/showerRain.png'
import thunderstorm from '../assets/climateIcons/thunderstorm.png'
import brokenClounds from '../assets/climateIcons/brokenClouds.png'
import scatteredClouds from '../assets/climateIcons/scatteredClouds.png'



export default function WeatherCard({ data }) {

    const [cidade, setCidade] = useState(null)
    const [descricaoTempo, setDescricaoTempo] = useState(null)
    const [temperatura, setTemperatura] = useState(null)
    const [humidade, setHumidade] = useState(null)
    const [wind, setWind] = useState(null)
    const [strIconTempo, setStrIconTempo] = useState(null)

    const [time, setTime] = useState(null);

    useEffect(() => {
        setCidade(data !== null ? data.name : '')
        setDescricaoTempo(data !== null ? data.weather[0].description : '')
        setTemperatura(data !== null ? data.main.temp : '')
        setHumidade(data !== null ? data.main.humidity : '')
        setWind(data !== null ? data.wind.speed : '')
        setStrIconTempo(data !== null ? data.weather[0].main : '')
    }, []);

    useEffect(() => {
        let time = formatCurrentTime();
        setTime(time);
    }, []);

    const getCurrentTime = () => {
        let today = new Date();
        const day = today.getDay();
        const hours = String(today.getHours()).padStart(2, '0');
        const minutes = String(today.getMinutes()).padEnd(2, '0');
        if (minutes) {

        }
        return [day, hours, minutes];
    };

    const formatCurrentTime = () => {
        const today = getCurrentTime();

        let day = getDayOfWeek(today[0]);
        let hourMinutes = `${today[1]}:${today[2]}`

        return `${day}, ${hourMinutes}`;
    };

    const getDayOfWeek = (intDay) => {
        listDays = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
        return listDays[intDay]
    };

    /**
     * A função recebe o estado do clima atual 
     * para compara um um clima fixo, 
     * retornando o icone de acordo com o clima verificado.
     * 
     * Clima atual -> cliamteState
    **/
    const checkClimate = (climateState) => {
        // const hour = 15;
        const hour = getCurrentTime()[1]
        climateState = 'Rain';
        const isDayTime = (hour >= 6 && hour < 18);

        const climateMap = {
            'Rain': isDayTime ? rainD : rainN,
            'Clouds': isDayTime ? cloundsD : cloundsN,
            'Clear': isDayTime ? clearD : clearN,
            'Snow': snow,
            'Mist': mist,
            'ShowRain': showRain,
            'Thunderstorm': thunderstorm,
            // Adicione casos para 'brokenClounds' e 'scatteredClouds'.
        };

        return climateMap[climateState] || imgErro;
    };


    const checkIcon = (strIcon) => {
        const climateIcon = checkClimate(strIcon)
        return climateIcon;
    }



    return (
        <View style={styles.cardContainer}>
            <View>
                <View style={{ width: '100%' }}>
                    <Text style={{ fontSize: 32 }}>
                        {cidade}
                    </Text>
                    <Text style={styles.smallText}>
                        {time}, {descricaoTempo}
                    </Text>
                </View>
                <View style={[styles.flexRow]}>
                    <Text style={{ fontSize: 72 }}>
                        {temperatura}
                    </Text>
                    <Text style={{ fontSize: 24 }} >
                        °c
                    </Text>
                    <Image style={styles.iconClimate} source={checkIcon(strIconTempo)} />
                </View>
                <View style={[styles.flexRow, styles.bottom]}>
                    <View style={[styles.bottomItems, styles.smallText]}>
                        <Image style={styles.smallIcon} source={rainBottom} />
                        <Text>Humidade {humidade}%</Text>
                    </View>
                    <View style={[styles.bottomItems, styles.smallText]}>
                        <Image style={styles.smallIcon} source={windIcon} />
                        <Text>Vento {wind} km/h</Text>
                    </View>
                </View>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    cardContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

        width: 300,
        height: 320,
        paddingHorizontal: 24,
        gap: 20,

        backgroundColor: '#ffffff',
        shadowColor: '#292F36',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    flexRow: {
        display: 'flex',
        flexDirection: 'row'
    },
    bottom: {
        width: '100%',
        justifyContent: 'space-evenly',
        marginTop: 8,
    },
    bottomItems: {
        height: 80,
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    smallText: {
        fontSize: 12
    },
    iconClimate: {
        alignSelf: 'center',
        marginHorizontal: 8,
        height: 80,
        width: 80,
        backgroundColor: '#A8D5E2',
        borderRadius: 50,
    },
    smallIcon: {
        width: 32,
        height: 32
    },
    loadingBox: {
        backgroundColor: '#D1E9F0'
    }
});


