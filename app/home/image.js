import { Alert, Platform, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { defaultHitSlop, hp } from '../../helpers/common'
import { wp } from '../../helpers/common'
import React, { useState } from 'react'
import { BlurView } from 'expo-blur'
import Animated, { FadeInDown, FadeInLeft } from 'react-native-reanimated'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { Image } from 'expo-image'
import { Ionicons } from '@expo/vector-icons'
import { ActivityIndicator } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { sleep } from '../../helpers/common'
import Toast from 'react-native-toast-message'
import * as FileSystem from 'expo-file-system'
import * as Sharing from 'expo-sharing';
import { theme } from '../../constants/themes'


const ImageScreen = () => {
    const router = useRouter()
    const item = useLocalSearchParams()
    const [status, setStatus] = useState('loading')
    const filename = item.filename.split("/").pop()
    
    const imageFilePath = `${FileSystem.documentDirectory}${filename}`
    const imageUri = item.uri

    const onLoad = () => {
        setStatus('')
    }

    const maxWidth = Platform.OS === "web" ? wp(42) : wp(80)
    const maxHeight = Platform.OS === "web" ? hp(88) : hp(90)

    const getSize = () => {

        let width = item.width
        let height = item.height
        
        if (height > maxHeight) {
            height = maxHeight
            width = height * (item.width / item.height)
        }

        if (width > maxWidth) {
            width = maxWidth
            height = width * (item.height / item.width)
        } 

        return {
            width: width,
            height: height            
        }
    }

    const handleDownload = async () => {
        setStatus('downloading')        
        const data = await downloadFile()
        if (data.success) {
            showToast('Image downloaded')
        }
        setStatus('')
    }

    const handleShare = async () => {
        setStatus("sharing")        
        const {success, status, uri}  = await downloadFile()
        if (success) {
            await Sharing.shareAsync(uri)
            await FileSystem.deleteAsync(uri)            
        }
        setStatus('')
    }

    const downloadFile = async () => {
        try {
            await sleep(500)
            const {uri, status} = await FileSystem.downloadAsync(imageUri, imageFilePath)            
            return {
                success: true,
                status: status,
                uri: uri
            }
        } catch (err) {
            console.log(err)
            Alert.alert("Image", err.message)
            return {success: false, error: err}
        }
    }

    const toastConfig = {
        success: ({text1, props, ...rest}) => {
            return (
                <View style={styles.toast}>
                    <Text style={styles.toastText}>{text1}</Text>
                </View>
            )
        }
    }
    
    const showToast = (msg) => {        
        Toast.show(
            {
                type: "success",
                bottomOffset: 60,
                text1: msg,
                position: "bottom"                
            }
        )
    }

    return (    
        <BlurView tint='dark' intensity={80} style={styles.container} > 
            <StatusBar hidden={true} />
            
            <View style={{flexDirection: "row", gap: 51, alignItems: "center", justifyContent: "center", marginBottom: 6}} >
                <Animated.View entering={FadeInLeft.springify().delay(200)} >
                    {
                        status == "sharing" ? 
                        <View style={styles.button}>
                            <ActivityIndicator size={hp(4)} color={"white"} />
                        </View>
                        :
                        <Pressable hitSlop={defaultHitSlop} style={styles.button} onPress={handleShare}>
                            <Ionicons name='share-social-outline' size={hp(4)} color={"white"} />
                        </Pressable>
                    }
                </Animated.View>

                <Animated.View entering={FadeInLeft.springify().delay(300)} >
                    {
                        status == "downloading" ? 
                        <View style={styles.button}>
                            <ActivityIndicator size={hp(4)} color={"white"} />
                        </View> 
                        :
                        <Pressable hitSlop={defaultHitSlop} style={styles.button} onPress={handleDownload}>
                            <Ionicons name='download-outline' size={hp(4)} color={"white"} />
                        </Pressable>
                    }
                </Animated.View>
                
                <Animated.View entering={FadeInLeft.springify().delay(400)} >
                    <Pressable onPress={() => router.back()} hitSlop={defaultHitSlop} style={styles.button}>
                        <Ionicons size={hp(4)} color={"white"} name="close-circle-outline" />
                    </Pressable>                    
                </Animated.View>
            </View>

            <View style={getSize()} >
                <View style={styles.loading} >
                    {
                        status == 'loading' &&
                        <ActivityIndicator size={"large"} color={"white"}/>
                    }
                </View>
                <Animated.View entering={FadeInDown.springify().delay(100)} >
                    <Image transition={100} style={[styles.image, getSize()]} source={item.uri} onLoad={onLoad}/>
                </Animated.View>
            </View>
                            
            <Toast config={toastConfig} visibilityTime={2000} />

        </BlurView>
    )
}

export default ImageScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        padding: wp(4),
        alignItems: "center"
    },
    image: {
        borderRadius: 12,
        borderWidth: 2,
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        borderColor: "rgba(255, 255, 255, 0.1)"
    },
    loading: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: "center",
        alignItems: "center"
    },
    button: {
        width: hp(6),
        height: hp(6),
        alignItems: "center",
        justifyContent: "center",
        borderRadius: hp(4),
        backgroundColor: "rgba(255, 255, 255, 0.2)"
    },
    toast: {
        padding: 15,        
        width: wp(94),    
        paddingHorizontal: 30,
        borderRadius: 4,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme.colors.black
    },
    toastText: {
        fontSize: hp(1.8),
        fontWeight: theme.fontWeights.medium,
        color: theme.colors.white
    }
})