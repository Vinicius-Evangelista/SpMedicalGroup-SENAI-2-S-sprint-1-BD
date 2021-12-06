//Componentes React
import React, { useEffect, useState } from "react";
import { View, FlatList, Text, StyleSheet } from "react-native";

//Components Importados
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../../services/api";


export default function VerConsulta() {

    //States
    const [listaConsulta, setListaConsulta] = useState();

    async function BuscarConsulta() {
        try {

            const token = await AsyncStorage.getItem('userToken');

            //mudar aqui
            const resposta = await api.get('/Medicos/listar', {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            });

            if (resposta.status === 200) {
                setListaConsulta(resposta.data);
            }
        } catch (error) {
            console.warn(error)
        }
    }


    useEffect(() => {
        BuscarConsulta();
    }, [] );


    return (
        <View style={styles.container}>
            <View >
                <View style={styles.header}>
                    <Text style={styles.textHeader}>Minhas Consultas Paciente</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
    },

    header: {
        flex: 1
    },

    textHeader: {
        color: 'black'
    }

})