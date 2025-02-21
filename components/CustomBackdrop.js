import { StyleSheet } from 'react-native'
import Animated from 'react-native-reanimated'
import { BlurView } from 'expo-blur'
import React from 'react'


const CustomBackdrop = ({animatedIndex, style}) => {
    const backdropStyle = [
        StyleSheet.absoluteFill,
        style,
        styles.overlay,
    ]
    return (
        <Animated.View entering={FadeIn.delay(100).duration(400)} style={backdropStyle}>
            <BlurView style={StyleSheet.absoluteFill} tint='dark' intensity={25}/>
        </Animated.View>
    )
}

export default CustomBackdrop

const styles = StyleSheet.create({
    overlay: {
        backgroundColor: "rgba(0, 0, 0, 0.5)"
    }
})