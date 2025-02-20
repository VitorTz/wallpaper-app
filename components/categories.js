import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native'
import React, { useState } from 'react'
import { hp } from '../helpers/common'
import { theme } from '../constants/themes'
import Animated, { FadeInRight } from 'react-native-reanimated'


const CategoryItem = ({categories, index}) => {
    const [catIsSelected, setSelected] = useState(false)
    const handlePress = () => {        
        const state = !categories[index].isSelected        
        setSelected(state)
        categories[index].isSelected = state
    }
    return (
        <Animated.View entering={FadeInRight.delay(200 * index).duration(1000).springify().damping(14)} style={[styles.categoryContainerBase, catIsSelected ? styles.categoryContainerActive : styles.categoryContainerInactive]} >
            <Pressable onPress={handlePress} style={{paddingVertical: 8, paddingHorizontal: 16}}>
                <Text 
                    style={
                        [styles.categoryTextBase, catIsSelected ? styles.categoryTextActive : styles.categoryTextInactive]
                    }>
                        {categories[index].name} 
                </Text>                
            </Pressable>
        </Animated.View>
    )
}


const Categories = ({categories}) => {

  return (  
    <FlatList 
        horizontal 
        contentContainerStyle={styles.container} 
        showsHorizontalScrollIndicator={false} 
        data={categories}
        keyExtractor={item => item.name}
        renderItem={
            ({ index }) => (                
                <CategoryItem categories={categories} index={index} ></CategoryItem>
            )
        }> 

    </FlatList>
  )
}

export default Categories

const styles = StyleSheet.create({
    container: {
        gap: 8
    },
    categoryContainerBase: {        
        borderWidth: 2,
        borderColor: theme.colors.text        
    },    
    categoryContainerInactive: {
        backgroundColor: theme.colors.white
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