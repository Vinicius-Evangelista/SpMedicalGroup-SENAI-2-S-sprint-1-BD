//Componentes React
import React, { useEffect, useState } from "react";
import { View, FlatList, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

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
            const resposta = await api.get('/Prontuarios/listar', {
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
            <View style={styles.card}>
                <View style={styles.boxTextCard}>
                    <Text style={styles.textCardTitulo} >{item.idMedicoNavigation.idEspecialidadeNavigation.tituloEspecialidade}</Text>
                    <Text style={styles.textCardSubTitulo}>Data:</Text>
                    <Text style={styles.textCard}>{Intl.DateTimeFormat("pt-BR", {
                            year: 'numeric', month: 'short', day: 'numeric',
                        }).format(new Date(item.dataConsulta))}</Text>
                    
                    <Text style={styles.textCardSubTitulo}>Horário:</Text>
                    <Text style={styles.textCard}>{Intl.DateTimeFormat("pt-BR", {
                            hour: 'numeric', minute: 'numeric', hour12: true
                        }).format(new Date(item.dataConsulta))}</Text>
                   
                    <Text style={styles.textCardSubTitulo}>Situação:</Text>
                    <Text style={styles.textCard}>{item.idSituacaoNavigation.estadoSituacao}</Text>
                </View>

                <TouchableOpacity style={styles.buttonCard}>
                    <Text style={styles.buttonCardText}>Mais Informações</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style = {styles.main} >
                <View style={styles.header}>
                    <Text style={styles.textHeader}>Minhas Consultas</Text>
                </View>

                <TouchableOpacity style = {styles.boxRefresh}>
                    <Image source = {require('../../../assets/img/refresh-icon.png')} />
                    <Text onPress = {BuscarConsulta} style = {styles.boxRefreshText}>Atualizar</Text>
                </TouchableOpacity>

                <FlatList
                   contentContainerStyle = {styles.listaCosultaBox}
                    data={listaConsulta}
                    renderItem={renderRow}
                    keyExtractor={item => item.idAgendamento}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        flex : 1
    },

    main : {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        backgroundColor: '#FFF'
    },

    header: {
        width: 411,
        height: 90,
        backgroundColor: '#025B5E',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        elevation: 24,
        shadowColor: '#000',
        shadowOffset :{
            width : 10,
            height : 12
        },
        shadowOpacity : 1,
        shadowRadius : 16,
        alignItems : 'center',
        justifyContent : 'center'
    },

    textHeader: {
        color: 'white',
        fontSize : 29,
        fontFamily : 'Barlow-SemiBold'
    },

    boxRefresh : {
        width : 113,
        flexDirection : 'row',
        justifyContent : 'space-evenly',
        marginTop : 10,
    },

    boxRefreshText : {
        fontSize : 16,
        fontFamily : 'Open Sans',
        color : '#025B5E',
        letterSpacing : 2,
        marginLeft : 3     
    },

    listaCosultaBox : {
        paddingTop : 20
    },

    card : {
        width : 369,
        height : 116,
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'space-around',
        backgroundColor : '#03A5AB',
        borderRadius : 5,
        marginBottom : 20,

    },

    textCard : {
        fontFamily : 'Barlow'
    },

    boxTextCard : {
        width: 155,
        height : 90,
        flexWrap : 'wrap',
        flexDirection: 'row'
    },

    textCardTitulo : {
        fontSize : 19,
        color : 'white',
        fontFamily : 'Barlow-Bold'
    },

    textCardSubTitulo : {
        color : 'white',
        fontFamily : 'Barlow-SemiBold',
        fontSize : 16,
        marginRight : 2
    },

    textCard : {
        color : 'white',
        fontFamily : 'Barlow-Regular'
    },

    buttonCard : {
        width :  154,
        height : 46,
        borderRadius : 10,
        backgroundColor : '#025B5E',
        alignItems : 'center',
        justifyContent : 'center'
    },

    buttonCardText : {
        color : 'white',
        fontFamily : 'TitilliumWeb-SemiBold',
        fontSize : 17
    }
})