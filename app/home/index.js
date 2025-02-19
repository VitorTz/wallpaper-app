import { Pressable, StyleSheet, Text, View, TextInput } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { theme } from '../../constants/themes'
import { wp, hp } from '../../helpers/common'

const HomeScreen = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
        <View style={styles.container}>
            <StatusBar backgroundColor='white' style='light' ></StatusBar>
            
            <View style={styles.header}>
                <Text style={styles.title}>Pixels</Text>
                <Pressable hitSlop={{top: 10, bottom: 10, left: 20, right: 10}}>
                    <View style={styles.menuButton}>
                        <View style={styles.line} ></View>
                        <View style={styles.line} ></View>
                        <View style={styles.line} ></View>
                    </View>
                </Pressable>
            </View>

            <View style={{width: '100%'}} >
                <TextInput style={styles.textInput} ></TextInput>

            </View>

        </View>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: theme.colors.white
    },
    title: {
        fontWeight: theme.fontWeights.medium,
        fontSize: hp(4)
    },
    menuButton: {
        padding: 8, 
        backgroundColor: theme.colors.black, 
        rowGap: 5        
    },
    line: {
        width: wp(5), 
        height: 2, 
        backgroundColor: theme.colors.white
    },
    textInput: {
        width: '100%',
        height: hp(6),
        paddingVertical: 20,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: theme.colors.black
    },
    header: {
        width: '100%', 
        flexDirection: "row", 
        alignItems: "center", 
        justifyContent: "space-between", 
        marginBottom: 16
    }
})