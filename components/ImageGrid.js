import { StyleSheet, Text, View } from 'react-native'
import { MasonryFlashList } from '@shopify/flash-list'
import { GRID_COLUMNS } from '../helpers/common'
import ImageCard from './ImageCard'
import React from 'react'


const ImageGrid = ({images}) => {
  return (
    <View style={styles.container}>
      <MasonryFlashList        
        data={images}        
        numColumns={GRID_COLUMNS}        
        contentContainerStyle={styles.listContainerStyle}
        renderItem={({item, index}) => <ImageCard item={item} index={index}/>}        
        estimatedItemSize={200}
      />
    </View>
  )
}

export default ImageGrid

const styles = StyleSheet.create({
    container: {
        minHeight: 3,
        flex: 1        
    }
})