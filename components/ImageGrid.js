import { FlatList, StyleSheet, Text, View } from 'react-native'
import { MasonryFlashList } from '@shopify/flash-list'
import { GRID_COLUMNS } from '../helpers/common'
import ImageCard from './ImageCard'
import React from 'react'


const ImageGrid = ({images, onScroll, gridRef}) => {
  return (    
    <View style={{flex: 1, minHeight: 3}} >
      <MasonryFlashList         
        data={images}              
        ref={gridRef}        
        numColumns={GRID_COLUMNS}                
        renderItem={
            ({item, index}) => {
              return (
                <ImageCard key={index} item={item}/>
              )
          }
        }
        estimatedItemSize={200}     
        onScroll={onScroll}   
        scrollEventThrottle={5}
      />
    </View>
  )
}

export default ImageGrid

const styles = StyleSheet.create({
    container: {
        flexWrap: "wrap",        
        flexDirection: "row",
        gap: 10,
        flex: 1        
    }
})