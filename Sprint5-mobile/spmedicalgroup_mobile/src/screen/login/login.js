//Hooks e Components React
import React, { useState } from 'react'

//Services
import api from '../../services/api';

//Components Importados
import  AsyncStorage  from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/core';
import jwtDecode from 'jwt-decode';

//Components React Native
import { View, StyleSheet, Image, Text, TextInput, TouchableOpacity, Alert } from 'react-native';


export default function Login() {

    //Hooks
    const navigation = useNavigation();

    //States
    const [email, setEmail] = useState('ricardo.lemos@spmedicalgroup.com.br');
    const [senha, setSenha] = useState('12345678');
    
        async function Logar () {
            //Requisição 
         try {
            const resposta = await api.post('/Login/login', {
                email: email,
                senha: senha
            })

            const token = resposta.data.token;

            await AsyncStorage.setItem('userToken', token);


            if (resposta.status === 200) {
                if(jwtDecode(token).role == 2 ){
                    navigation.navigate("Main")
                }
                else if(jwtDecode(token).role == 1){
                    navigation.navigate("Main")
                } else {
                    Alert.alert('403');
                }
            }
         } catch (error) {
             console.warn(error)
         }
    }

    return (
        <View style={styles.container}>


            <View style={styles.logoBox}>
                <Image source={require("../../../assets/img/logo_login.png")} />
                <Text style={styles.logoText}>SpMedicalGroup</Text>
            </View>

            <View style={styles.loginFormBox}>
                <TextInput onChangeText={email => setEmail(email)} style={styles.loginFormBoxInput} placeholder="Email" />
                <TextInput onChangeText={senha => setSenha(senha)} style={styles.loginFormBoxInput} placeholder="Senha" />

                <TouchableOpacity onPress={Logar} style={styles.loginBotaoCadastrar}>
                    <Text style={styles.loginBotaoCadastrarText}>Entrar</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.loginFooter}>
                <Text style={styles.loginFooterText}>© 2021 SpMedicalGroup. Todos os direitos reservados.</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column'
        },

        logoBox: {
            alignItems: 'center',
            marginBottom: 20
        },

        logoText: {
            fontFamily: "TenorSans-Regular",
            fontSize: 27,
            color: 'black'
        },

        loginFormBox: {
            alignItems: 'center'
        },

        loginFormBoxInput: {
            width: 306,
            paddingLeft: 5,
            paddingBottom: 2,
            marginBottom: 10,
            fontSize: 19,
            borderBottomWidth: 1,
            borderBottomColor: '#025B5E',
            fontFamily: 'Barlow-Regular',
        },

        loginBotaoCadastrar: {
            width: 247,
            height: 42,
            marginTop: 35,
            backgroundColor: '#025B5E',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 20
        },

        loginBotaoCadastrarText: {
            color: 'white',
            fontSize: 23,
            fontFamily: 'TitilliumWeb-Bold'
        },

        loginFooter: {
            position: 'absolute',
            bottom: 35
        },

        loginFooterText: {
            fontFamily: 'TitilliumWeb-Bold',
            fontSize: 10,
            color: 'black'
        }
    }
);