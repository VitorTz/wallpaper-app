import { StyleSheet, View, Pressable } from 'react-native'
import { defaultHitSlop } from '../helpers/common'
import { theme } from '../constants/themes'
import React from 'react'


const MenuButton = ({onPress}) => {
  return (
    <Pressable hitSlop={defaultHitSlop} onPress={onPress}>
        <View style={styles.menuButton}>
            <View style={styles.line} ></View>
            <View style={[styles.line, {marginLeft: 4}]} ></View>
            <View style={styles.line} ></View>
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