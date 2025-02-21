import { StyleSheet, View, Pressable } from 'react-native'
import { defaultHitSlop } from '../helpers/common'
import { theme } from '../constants/themes'
import { Ionicons } from '@expo/vector-icons'
import React from 'react'


const MenuButton = ({onPress}) => {
  return (
    <Pressable hitSlop={defaultHitSlop} onPress={onPress}>
        <View style={styles.menuButton} >
          <Ionicons name='menu' size={32}></Ionicons>
        </View>        
    </Pressable>
  )
}

export default MenuButton

const styles = StyleSheet.create({
     menuButton: {
        padding: 8,
        rowGap: 8
    },
    line: {
        width: 30, 
        height: 3, 
        borderRadius: 2,
        backgroundColor: theme.colors.black
    }
})