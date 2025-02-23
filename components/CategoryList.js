import { View, Text, StyleSheet, FlatList, Pressable, Platform } from 'react-native'
import React, { useState, useEffect } from 'react'
import Animated, { FadeIn, FadeInLeft, FadeInRight } from 'react-native-reanimated'
import { hp } from '../helpers/common'
import { theme } from '../constants/themes'
import { AppConstants } from '../constants/AppConstants'


const CategoryList = ({selectedCategory, handleChangeCategory}) => {

    const CategoryItem = ({ isActive, itemName, itemIndex }) => {                
        return (
            <View entering={FadeIn.delay(itemIndex * 200)}>
                <Pressable 
                    onPress={() => { isActive ? handleChangeCategory(null) : handleChangeCategory(itemName)}} 
                    style={[styles.categoryContainerBase, isActive && styles.categoryContainerActive]}
                >
                    <Text 
                    style={[styles.categoryTextBase, isActive && styles.categoryTextActive]}
                    >
                    {itemName}
                    </Text>
                </Pressable>
            </View>
        )
    }

    return ( 
        <View style={styles.container}>
            <FlatList
                horizontal                
                showsHorizontalScrollIndicator={Platform.OS === "web"}
                data={AppConstants.categorites}
                keyExtractor={item => item}
                renderItem={
                    ({ item, index }) => (
                        <CategoryItem isActive={selectedCategory == item} itemName={item} itemIndex={index}/>
                    )
                }>
            </FlatList>
        </View>
        
  )
}

export default CategoryList


const styles = StyleSheet.create({
    container: {  
        marginBottom: 10        
    },
    categoryContainerBase: {
        borderRadius: 4,        
        padding: 4,
        marginRight: 4,
        paddingVertical: 8, 
        paddingHorizontal: 16,
        backgroundColor: theme.colors.grayBG
    },
    categoryContainerActive: {        
        backgroundColor: theme.colors.black
    },
    categoryTextBase: {
        fontSize: hp(1.8),
        fontWeight: theme.fontWeights.medium,
        userSelect: 'none',
        color: theme.colors.black
    },    
    categoryTextActive: {
        color: theme.colors.white        
    }
})