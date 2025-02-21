import { StyleSheet, Text, Pressable, TextInput, View } from 'react-native'
import { useState, useRef, useCallback } from 'react'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { theme } from '../constants/themes'
import { hp, defaultHitSlop } from '../helpers/common'
import { debounce } from 'lodash'


const SearchBar = ({handleSearch, text, setText}) => {
    const searchInputRef = useRef(null)
    
    const handleKeyPress = async (text) => {
        handleSearch(text)
    }

    const handleTextDebounce = useCallback(
        debounce(handleKeyPress, 400),
        []
    )
    
    return (
        <View style={styles.searchBar} >
            <TextInput
                style={styles.textInput}
                onChangeText={newText => handleKeyPress(newText)}
                ref={searchInputRef}
                placeholder="search"
                
                returnKeyType="done"
            />
            {
                text && 
                <Pressable 
                    style={styles.closeIcon}                            
                    onPress={() => setText('')}
                    hitSlop={defaultHitSlop}
                >
                    <Ionicons name="close-circle-outline" size={26} color="black" />
                </Pressable>
            }
        </View>
    )
}

export default SearchBar

const styles = StyleSheet.create({
    searchBar: {
        marginBottom: 16
    },
    textInput: {
        paddingVertical: 10,
        paddingLeft: 10,
        paddingRight: 40,
        borderRadius: 4,
        borderCurve: "continuous",
        color: theme.colors.black,
        fontSize: hp(1.8),        
        borderWidth: 1,
        borderColor: theme.colors.black
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