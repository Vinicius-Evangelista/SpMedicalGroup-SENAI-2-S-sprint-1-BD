//Componentes React
import React, { useEffect, useState } from "react";
import { View, FlatList, Text, StyleSheet } from "react-native";

//Components Importados
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../../services/api";
import { TouchableOpacity } from "react-native-gesture-handler";


export default function VerConsulta() {

    //States
    const [listaConsulta, setListaConsulta] = useState();

    async function BuscarConsulta() {
        try {

            const token = await AsyncStorage.getItem('userToken');

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
    }, []);

    const renderRow = ({ item }) => {
        return (
            <View style = {styles.card}>
                <View style = {styles.boxTextCard}>
                <Text style = {styles.textCard}>{item.idProntuarioNavigation.idUsuarioNavigation.nome}</Text>
                <Text style = {styles.textCard}>{item.idMedicoNavigation.nomeMedico}</Text>
                <Text style = {styles.textCard}>{item.idSituacaoNavigation.estadoSituacao}</Text>
                <Text style = {styles.textCard} >{item.idMedicoNavigation.idEspecialidadeNavigation.tituloEspecialidade}</Text>
                </View>

                <TouchableOpacity style = {styles.buttonCard}>
                    <Text style = {styles.buttonCardText}>Botao test</Text>
                </TouchableOpacity>
            </View>
        );
    }


    return (
        <View style={styles.container}>
            <View >
                <View style={styles.header}>
                    <Text style={styles.textHeader}>Minhas Consultas</Text>
                </View>
                <FlatList
                data = {listaConsulta}
                renderItem = {renderRow}
                keyExtractor = {item => item.idAgendamento}
                />
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