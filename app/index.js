import { StyleSheet, Text, View, Image, Pressable } from 'react-native'
import React from 'react'
import { wp, hp } from '../helpers/common'
import Animated, { FadeInDown } from 'react-native-reanimated'
import { LinearGradient } from 'expo-linear-gradient'
import { theme } from '../constants/themes'
import { useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar'


const BackgroundImage = () => {
    return (
        <Image 
            source={require("../assets/images/welcome.png")} 
            style={styles.backgroundImage}
            resizeMode='cover'>
        </Image>
    )
}


const Header = () => {
    const router = useRouter()

    return (
        <Animated.View entering={FadeInDown.duration(600)} style={{flex: 1}}>
            <LinearGradient
                colors={['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0.5)', 'white', 'white']}
                style={styles.gradient}
                start={{x: 0.5, y: 0}}
                end={{x: 0.5, y: 0.8}}
            />
            <View style={styles.contentContainer}>
                
                <Animated.Text entering={FadeInDown.delay(400).springify()} style={styles.title}>Pixels</Animated.Text>
                
                <Animated.Text entering={FadeInDown.delay(550).springify()} style={styles.punchLine}>Every Pixel tells a history</Animated.Text>

                <Animated.View entering={FadeInDown.delay(650).springify()}>
                    <Pressable onPress={() => router.push("home")} style={styles.button}>
                        <Text style={styles.buttonText}>Start to Explore</Text>
                    </Pressable>
                </Animated.View>

            </View>
        </Animated.View>
    )
}

const WelcomeScreen = () => {    
    return (    
        <View style={styles.container}>
            <StatusBar style='light'></StatusBar>
            <BackgroundImage></BackgroundImage>
            <Header></Header>
        </View>
    )
}

export default WelcomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white"        
    },
    contentContainer: {        
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-end",
        gap: 20,
        marginBottom: 20
    },
    backgroundImage: {
        width: wp(100),
        height: hp(100),
        position: 'absolute'
    },
    gradient: {
        width: wp(100),
        height: hp(65),
        position: "absolute",
        bottom: 0
    },
    title: {
        fontSize: hp(8),
        fontWeight: theme.fontWeights.bold
    },
    punchLine: {
        fontWeight: theme.fontWeights.medium,
        fontSize: hp(2),
        marginBottom: 10,
        letterSpacing: 1
    },
    buttonText: {
        fontSize: hp(3),
        color: theme.colors.white,
        fontWeight: theme.fontWeights.bold,
        letterSpacing: 1
    },
    button: {
        maxWidth: 500,
        maxHeight: 80,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: theme.colors.neutral(0.9),
        paddingVertical: 15,
        paddingHorizontal: 80,
        borderRadius: 16        
    }
})