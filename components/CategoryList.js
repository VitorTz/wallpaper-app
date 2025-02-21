import { View, Text, StyleSheet, FlatList, Pressable, Platform } from 'react-native'
import React, { useState } from 'react'
import Animated, { FadeIn } from 'react-native-reanimated'
import { hp } from '../helpers/common'
import { theme } from '../constants/themes'


const CategoryItem = ({name, index, handleChangeCategory}) => {
    const [isSelected, setSelected] = useState(false)    

    const handlePress = () => {        
        setSelected(!isSelected)
        handleChangeCategory(name)
    }

    return (
        <Animated.View         
            entering={FadeIn.delay(index * 200)}             
        >
            <Pressable onPress={handlePress} style={[styles.categoryContainerBase, isSelected ? styles.categoryContainerActive : styles.categoryContainerInactive]} >
                <Text 
                    style={
                        [styles.categoryTextBase, isSelected ? styles.categoryTextActive : styles.categoryTextInactive]
                    }>
                        {name}
                </Text>                
            </Pressable>
        </Animated.View>
    )
}


const CategoryList = ({categories, handleChangeCategory}) => {
    return ( 
        <View style={styles.container}>
            <FlatList                            
                horizontal
                showsHorizontalScrollIndicator={Platform.OS === "web"}                
                data={categories}
                keyExtractor={item => item}
                renderItem={
                    ({ item, index }) => (                                        
                        <CategoryItem name={item} index={index} handleChangeCategory={handleChangeCategory} ></CategoryItem>
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
        paddingHorizontal: 16
    },    
    categoryContainerInactive: {
        backgroundColor: theme.colors.grayBG

    },
    categoryContainerActive: {        
        backgroundColor: theme.colors.black
    },
    categoryTextBase: {
        fontSize: hp(1.8),
        fontWeight: theme.fontWeights.medium,
        userSelect: 'none'
    },
    categoryTextInactive: {
        color: theme.colors.black
    },
    categoryTextActive: {
        color: theme.colors.white        
    }
})