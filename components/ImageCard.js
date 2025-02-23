import { StyleSheet, View, Pressable, ActivityIndicator } from 'react-native'
import { getImageHeight, wp } from '../helpers/common'
import { Image } from 'expo-image'
import React, { useState } from 'react'
import { theme } from '../constants/themes'


const ImageCard = ({item, router}) => {

    const imageHeight = {          
        height: getImageHeight(item.dimensions.height, item.dimensions.width)        
    }
    
    const [loading, setLoading] = useState(false)

    return (
        <View style={styles.container} >
            <Pressable onPress={
                () => router.push(
                    {
                        pathname: 'home/image',
                        params: {
                            filename: item.filename,
                            uri: item.uri,
                            width: item.dimensions.width,
                            height: item.dimensions.height
                        }
                    }
                )
            }>
                <Image
                    style={imageHeight}
                    source={item.uri}
                    onLoadStart={() => setLoading(true)}
                    onLoadEnd={() => setLoading(false)}
                />
            </Pressable>
            {
                loading && 
                <View style={[imageHeight, {position: 'absolute', width: '100%', justifyContent: "center", alignContent: "center"}]} >
                    <ActivityIndicator size={32} color={theme.colors.black}></ActivityIndicator>
                </View>
            }
        </View>
    )
}

export default ImageCard

const styles = StyleSheet.create({
    container: {                
        margin: 4,
        borderRadius: 4,
        borderCurve: "continuous",
        overflow: "hidden"        
    }
})