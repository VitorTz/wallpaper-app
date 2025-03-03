import { View, Text, StyleSheet, Easing, Platform } from 'react-native'
import React, { useMemo, useState } from 'react';
import {
  BottomSheetModal,
  BottomSheetView,  
} from '@gorhom/bottom-sheet';
import { Pressable, ScrollView } from 'react-native-gesture-handler';
import { FadeIn, FadeInDown, FadeInLeft, FadeOutUp } from 'react-native-reanimated';
import Animated from 'react-native-reanimated';
import { hp, wp, IMAGE_FILTERS } from '../helpers/common';
import { theme } from '../constants/themes';
import CustomBackdrop from './CustomBackdrop';
import { Ionicons } from '@expo/vector-icons';
import RotatingElement from './RotatingButton';


const COLOR_CONTAINER_RADIUS = Platform.OS === "web" ? 64 : 40



const FilterModal = ({
  filterModalRef, 
  filterChoiceRef, 
  handleFilterChange,
  selectedOrder,
  setOrder,
  selectedOrientation,
  setOrientation,
  selectedColor,
  setColor
}) => {  

  const resetFilters = () => {
    setOrder('')
    setOrientation('')
    setColor('')
    filterChoiceRef.current.order = null
    filterChoiceRef.current.orientation = null
    filterChoiceRef.current.colors = null
    handleFilterChange()
  }

  const orderPress = (orderName) => {
    if (selectedOrder == orderName) {
      filterChoiceRef.current.order = null
      setOrder(null)
    } else {
      filterChoiceRef.current.order = orderName
      setOrder(orderName)      
    }
    handleFilterChange()
  }

  const orientationPress = (orientationName) => {
    if (selectedOrientation == orientationName) {
      filterChoiceRef.current.orientation = null  
      setOrientation(null)
    } else {
      filterChoiceRef.current.orientation = orientationName
      setOrientation(orientationName)
    }
    handleFilterChange()
  }

  const colorPress = (colorName) => {
    if (selectedColor == colorName) {
      filterChoiceRef.current.colors = null
      setColor(null)
    } else {
      filterChoiceRef.current.colors = colorName
      setColor(colorName)
    }
    handleFilterChange()
  }


  const OrderFilter = () => {    

    return (
      <View style={{width: '100%', alignItems: "flex-start"}} >
        <Text style={styles.headerText} >Order</Text>        
        <View style={styles.filterContainer} >
          {
            IMAGE_FILTERS.order.filterList.map(
              (order, index) => {
                return (
                  <Pressable
                    key={order} 
                    onPress={() => orderPress(order)}
                    style={[styles.textContainerBase, selectedOrder === order ? styles.textContainerActive : styles.textContainerInactive]} 
                  >
                    <Text 
                      style={[styles.text, selectedOrder === order ? styles.textActive : styles.textInactive]} 
                    >
                      {order}
                    </Text>
                  </Pressable>
                )
              }
            )
          }        
        </View>
      </View>
    )
  }

  const ColorFilter = () => {
    return (
      <View style={{width: '100%', alignItems: "flex-start"}} >
        <Text style={styles.headerText} >Colors</Text>
        <View style={styles.filterContainer}>
          {
            IMAGE_FILTERS.colors.filterList.map(
              (color, index) => {
                return (
                  <Pressable key={color.name} onPress={() => colorPress(color.name)}>
                    <View 
                      style={[selectedColor == color.name ? styles.colorActiveContainer : styles.colorContainer, {backgroundColor: color.hex}]}
                    />                    
                  </Pressable>
                )
              }
            )
          }
        </View>
      </View>
    )
  }

  const OrientationFilter = () => {      

    return (
      <View style={{width: '100%', alignItems: "flex-start"}} >
        <Text style={styles.headerText} >Orientation</Text>        
        <View style={styles.filterContainer} >
          {
            IMAGE_FILTERS.orientation.filterList.map(
              (orientation, index) => {
                return (
                  <Pressable
                    key={orientation} 
                    onPress={() => orientationPress(orientation)}
                    style={[styles.textContainerBase, selectedOrientation === orientation ? styles.textContainerActive : styles.textContainerInactive]} 
                  >
                    <Text 
                      style={[styles.text, selectedOrientation === orientation ? styles.textActive : styles.textInactive]} 
                    >
                      {orientation}
                    </Text>
                  </Pressable>
                )
              }
            )
          }        
        </View>
      </View>
    )
  }

  const snapPoints = useMemo(() => ['50%'], [])

  return ( 
    <BottomSheetModal    
        ref={filterModalRef}
        index={0}
        snapPoints={snapPoints}
        enableDynamicSizing={false}
        backdropComponent={CustomBackdrop}
    >
      <BottomSheetView style={{alignItems: "center", padding: 20}}>
        <ScrollView style={{width: '100%'}} >
          <Animated.View entering={FadeInDown.delay(200).duration(400)} style={styles.container}>
            <OrderFilter/>
            <OrientationFilter/>
            <ColorFilter/>
            <RotatingElement onPress={resetFilters} style={styles.resetButtonStyle}>
              <Ionicons name='refresh-circle-outline' size={42} />
            </RotatingElement>
          </Animated.View>
        </ScrollView>
      </BottomSheetView>
    </BottomSheetModal>
  )
}


export default FilterModal

const styles = StyleSheet.create({  
  container: {
    justifyContent: "center", 
    alignItems: "center",    
    gap: 15,
    paddingBottom: 32
  },  
  headerText: {
    alignSelf: "flex-start",
    fontWeight: theme.fontWeights.semiBold,
    fontSize: hp(3),
    color: theme.colors.text,
    marginBottom: 10
  },
  filterContainer: {    
    flexDirection: "row",
    alignContent: "flex-start",
    gap: 10,
    flexWrap: "wrap"
  },
  colorContainer: {
    width: COLOR_CONTAINER_RADIUS,
    height: COLOR_CONTAINER_RADIUS,
    borderRadius: COLOR_CONTAINER_RADIUS,
    borderWidth: 2,
    borderColor: "black"
  },
  colorActiveContainer: {
    width: COLOR_CONTAINER_RADIUS,
    height: COLOR_CONTAINER_RADIUS,
    borderWidth: 1,
    borderRadius: 2,
    borderCurve: "continuous",
    borderColor: "black"
  },
  textContainerBase: {
    paddingVertical: 8,  
    paddingHorizontal: 16, 
    borderRadius: 4, 
  },
  textContainerInactive: {    
    backgroundColor: theme.colors.grayBG
  },
  textContainerActive: {    
    backgroundColor: theme.colors.black
  },
  textBase: {
    fontSize: hp(1.8),
    fontWeight: theme.fontWeights.medium,
    userSelect: 'none'
  },
  textInactive: {
    color: theme.colors.black
  },  
  textActive: {
    color: theme.colors.white
  },
  resetButtonStyle: {
    position: 'absolute', 
    right: 10, 
    top: 0
  }
  
})