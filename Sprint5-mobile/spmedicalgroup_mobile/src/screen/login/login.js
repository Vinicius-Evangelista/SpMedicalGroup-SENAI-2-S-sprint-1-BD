//Hooks e Components React
import React, { useState } from 'react'

//Services
import api from '../../services/api';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/core';

//Components React Native
import { View, StyleSheet, Image, Text } from 'react-native';


export default function Login() {

    //Hooks
    const asyncStorage = useAsyncStorage();
    const navigation = useNavigation();

    //States
    const [email, setEmail] = useState();
    const [senha, setSenha] = useState();

    function Logar() {

        try {
            //Requisição 
            const resposta = api.post('/Login/login', {
                email: email,
                senha: senha
            })

            //setando token
            const token = resposta.data.token;

            // Colocando token no localStorage do celular
            asyncStorage.setItem('userToken', token);

            if (resposta.status === 200) {
                navigation.navigate("Main")
            }
        } catch (error) {
            console.warn(error)
        }
    }

    return (
        <View styles={styles.container}>
            <View styles={styles.logoBox}>
                <Image source={require("../../../assets/img/logo_login.png")} />
                <Text style={styles.logoText}>SpMedicalGroup</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create(
    {
        container: {
            flex: 1
        },

        logoBox: {
            flex: 1,
            flexDirection: 'column'
        },

        logoText: {
            fontFamily: "TenorSans-Regular",
            fontSize: 27
        }
    }
);