import { Pressable, StyleSheet, Text, View, TextInput, Platform } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { theme } from '../../constants/themes'
import { wp, hp, defaultHitSlop } from '../../helpers/common'
import { ScrollView } from 'react-native'
import { AppConstants } from '../../constants/AppConstants'
import React, { useState } from 'react'
import DefaultStatusBar from '../../components/DefaultStatusBar'
import Ionicons from '@expo/vector-icons/Ionicons';
import Categories from '../../components/categories'
import { pixabayApiCall } from '../api'


const Header = () => {
    return (
        <View style={styles.header}>
            <Text style={styles.title}>Pixels</Text>
            <Pressable hitSlop={defaultHitSlop}>
                <View style={styles.menuButton}>
                    <View style={styles.line} ></View>
                    <View style={[styles.line, {marginLeft: 4}]} ></View>
                    <View style={styles.line} ></View>
                </View>
            </Pressable>
        </View>
    )
}


const SearchBar = ({handleSearch}) => {
    const [text, setText] = useState('')    
    const [loading, setLoading] = useState(false)

    const handleSubmit = async () => {
        if (loading == true) { return }
        setLoading(true)        
        await handleSearch(text)
        setLoading(false)
    }

    const handleKeyPress = async (e) => {
        if (e.nativeEvent.key === 'Enter') {
            handleSubmit()
        }
    }
 
    return (
        <View style={styles.searchBar} >
            <View style={{flex: 1}} >
                <TextInput
                    style={styles.textInput}
                    onChangeText={text => setText(text)}
                    placeholder="search"
                    value={text}
                    onSubmitEditing={handleSubmit}
                    {...(Platform.OS === 'web' && { onKeyPress: handleKeyPress })}
                    returnKeyType="search"
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
        </View>
    )
}


const HomeScreen = () => {
    let categories = AppConstants.categorites.map(
        (item, index) => ({name: item, index: index, isSelected: false})
    )
        
    let pageNum = 0

    const handleSearch = async (text) => {        
        const selectedCategories = categories.filter(item => item.isSelected)
        const selectedCategory = selectedCategories.length > 0 ? selectedCategories[0].name : null
        const params = {
            q: text,
            category: selectedCategory,
            page: pageNum,
            order: null
        }
        response = await pixabayApiCall(params)           
        console.log(response.data)
    }

    return (
         <SafeAreaView style={styles.container}>
            <View style={{flex: 1}}>
                <DefaultStatusBar></DefaultStatusBar>
                <Header></Header>
                <SearchBar handleSearch={handleSearch} ></SearchBar>                
                <ScrollView contentContainerStyle={{gap: 15}}>
                    <Categories categories={categories}></Categories>   
                </ScrollView>
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
        rowGap: 8        
    },
    line: {
        width: 30, 
        height: 3, 
        backgroundColor: theme.colors.black
    },
    textInput: {
        paddingVertical: 10,
        paddingLeft: 10,
        paddingRight: 40,
        color: theme.colors.black,
        fontSize: hp(1.8),        
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
    },
    searchBar: {
        flexDirection: 'row', 
        alignItems: "center", 
        justifyContent: "space-between", 
        columnGap: 10, 
        marginBottom: 16
    },
    searchButton: {
        height: 48, 
        width: 48,        
        backgroundColor: "black", 
        alignItems: "center", 
        justifyContent: "center"
    }
})