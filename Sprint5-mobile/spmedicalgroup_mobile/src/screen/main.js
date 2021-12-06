//React Components
import React from "react";
import { View, StatusBar, StyleSheet, Image } from 'react-native';

//Componentes importados
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
const bottomTab = createBottomTabNavigator();

//Screens
import VerConsultaMedico from "./medico/verconsultas";
import VerConsultaPaciente from "./paciente/verconsultas";

export default function Main() {
    <View style={styles.bottomTabMain}>
        <StatusBar hidden={false}
            backgroundColor='#025B5E'
        />

        <bottomTab.Navigator
            screenOptions={({ route }) => ({

                tabBarIcon: () => {
                    if (route.name) {
                        return (
                            <Image
                                source={(require("../../assets/img/consulta-icon.png"))}
                            />
                        );
                    }
                },

                headerShown: false,
                tabBarShowLabel: true,
                tabBarBackground: '#025B5E',
                tabBarStyle: {
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    height: 68,


                },
                tabBarLabelStyle: {
                    fontFamily: 'Open Sans',
                    fontSize: 10,
                    color: 'white'
                }
            })}


        >
            <bottomTab.Screen name="VerConsultaMedico" component={VerConsultaMedico} />
            <bottomTab.Screen name = "VerConsultaPaciente" component = {VerConsultaPaciente} />
        </bottomTab.Navigator>
    </View>
}

const styles = StyleSheetList.create({

});