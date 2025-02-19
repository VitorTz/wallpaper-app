import { Pressable, StyleSheet, Text, View, TextInput } from 'react-native'
import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaView } from 'react-native-safe-area-context'
import { theme } from '../../constants/themes'
import { wp, hp } from '../../helpers/common'
import Ionicons from '@expo/vector-icons/Ionicons';


const HomeScreen = () => {

    const [text, setText] = useState('');

    const searchImages = async() => {
        console.log("oi")
    }

    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={styles.container}>
                <StatusBar backgroundColor='white' style='light' ></StatusBar>
                
                <View style={styles.header}>
                    <Text style={styles.title}>Pixels</Text>
                    <Pressable hitSlop={{top: 10, bottom: 10, left: 20, right: 10}}>
                        <View style={styles.menuButton}>
                            <View style={styles.line} ></View>
                            <View style={[styles.line, {marginLeft: 4}]} ></View>
                            <View style={styles.line} ></View>
                        </View>
                    </Pressable>
                </View>

                <View style={{flexDirection: 'row', alignItems: "center", justifyContent: "space-between", columnGap: 10}} >
                    <View style={{flex: 1}} >
                        <TextInput 
                            defaultValue={text}
                            onChangeText={newText => setText(newText)}  
                            style={styles.textInput} 
                            placeholder='search' >
                        </TextInput>
                        <Pressable 
                            style={styles.closeIcon}
                            onPress={() => setText('')}
                            hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
                        >
                            <Ionicons name="close-circle-outline" size={24} color="black" />
                        </Pressable>
                    </View>

                    <View style={{height: hp(6), width: 48, backgroundColor: "black", alignItems: "center", justifyContent: "center"}} >
                        <Pressable onPress={searchImages}>
                            <Ionicons name="send" size={24} color="white" />
                        </Pressable>
                    </View>
                                        
                </View>

            </View>
        </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: wp(4),
        paddingVertical: hp(3),
        backgroundColor: theme.colors.white
    },
    title: {
        fontWeight: theme.fontWeights.semiBold,
        fontSize: hp(4)
    },
    menuButton: {
        padding: 8,         
        rowGap: 5        
    },
    line: {
        width: wp(5), 
        height: 3, 
        backgroundColor: theme.colors.black
    },
    textInput: {
        height: hp(6),
        paddingHorizontal: 10,
        color: theme.colors.black,
        borderWidth: 2,
        borderColor: theme.colors.black
    },
    header: {
        width: '100%', 
        flexDirection: "row", 
        alignItems: "center", 
        justifyContent: "space-between", 
        marginBottom: 16
    },
    closeIcon: {                
        position: 'absolute',                
        right: 0,
        top: 0,
        bottom: 0,
        marginRight: 10,
        justifyContent: "center",
        alignItems: "center",
    }
})