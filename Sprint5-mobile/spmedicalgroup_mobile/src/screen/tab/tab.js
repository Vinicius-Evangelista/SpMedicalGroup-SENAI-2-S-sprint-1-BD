//Componentes React
import React from 'react';
import { Image, StyleSheet } from 'react-native';
//Componentes importados
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


//Screens
import VerConsultaPaciente from '../paciente/verconsultas';
import VerConsultaMedico from '../medico/verconsultas';
import { NavigationContainer } from '@react-navigation/native';

const bottomTab = createBottomTabNavigator();

export default function Tab(props) {

    return (
        <NavigationContainer independent={true}>
            <bottomTab.Navigator


                screenOptions={({ route }) => ({
                    tabBarIcon: () => {
                        if (route.name === 'Minhas Consultas') {


                            return (
                                <Image
                                    source={require('../../../assets/img/consulta-icon.png')}
                                    style={styles.icon}
                                />
                            );
                        }
                    },
                    headerShown: false,
                    tabBarShowLabel: true,
                    tabBarStyle: {
                        height: 68,
                        borderTopRightRadius: 20,
                        borderTopLeftRadius: 20,
                        overflow: 'hidden',
                        elevation: 10,
                        shadowColor: '#000',
                        shadowOffset: {
                            width: 10,
                            height: 12
                        },
                        shadowOpacity: 1,
                        shadowRadius: 16,

                    },
                    tabBarActiveBackgroundColor: '#025B5E',
                    tabBarLabelStyle: {
                        color: 'white',
                        fontFamily: 'Open Sans',
                        fontSize: 10,
                        paddingBottom: 5
                    },
                })
                }


            >
                <bottomTab.Screen name="Minhas Consultas" component={props.role == 1 ? VerConsultaPaciente : VerConsultaMedico} />
            </bottomTab.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    icon: {
        width: 40,
        height: 30
    },

});