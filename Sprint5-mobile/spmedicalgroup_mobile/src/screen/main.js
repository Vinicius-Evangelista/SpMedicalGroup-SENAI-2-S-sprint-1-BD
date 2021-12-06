//Componentes React
import React from 'react';
import { Image, StatusBar, View, StyleSheet } from 'react-native';
//Componentes importados
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


const bottomTab = createBottomTabNavigator();

//Screens
import VerConsultaPaciente from './paciente/verconsultas';
import VerConsultaMedico from './medico/verconsultas';



export default function Main() {

    return (
        <View style={styles.main}>
            <StatusBar
                hidden={false}
                backgroundColor='#025B5E'
            />
            <bottomTab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: () => {
                        if (route.name === 'VerConsulta') {


                            return (
                                <Image
                                    source={require('../../assets/img/consulta-icon.png')}
                                    style = {styles.icon}
                                />
                            );
                        }
                    },

                    headerShown: false,
                    tabBarShowLabel: true,
                    tabBarStyle: { height: 68 },
                    tabBarActiveBackgroundColor: '#025B5E',
                    
                })}
            >
                <bottomTab.Screen name="VerConsulta" component={VerConsultaMedico} />
            </bottomTab.Navigator>
        </View>
    );
}

const styles = StyleSheet.create({
    main: {
        flex: 1
    },

    icon : {
        width : 40,
        height : 30
    }
});