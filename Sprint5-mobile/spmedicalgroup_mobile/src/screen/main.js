//Componentes React
import React from 'react';
import { StatusBar, View, StyleSheet } from 'react-native';

//Screens
import Tab from './tab/tab';

//Hooks
import { useRoute } from '@react-navigation/core';


export default function Main() {

    const route = useRoute();
    const role = route.params;


    return (
        <View style={styles.main}>
            <StatusBar
                hidden={false}
                backgroundColor='#025B5E'
            />
            <Tab role = {role.role}/>
        </View>
    );
}

const styles = StyleSheet.create({
    main: {
        flex: 1
    },

    icon: {
        width: 40,
        height: 30,

    },
});