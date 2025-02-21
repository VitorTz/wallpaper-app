import { StyleSheet, Pressable } from 'react-native'
import { getImageHeight, wp } from '../helpers/common'
import { Image } from 'expo-image'
import React from 'react'


const ImageCard = ({item, index}) => {

    const imageHeight = {
        height: getImageHeight(item.height, item.width)
    }

    return (
    <Pressable style={styles.container} >
        <Image
        style={imageHeight}
        source={item.url}
        transition={100}
        />
    </Pressable>
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