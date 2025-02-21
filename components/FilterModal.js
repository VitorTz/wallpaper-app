import { View, Text, StyleSheet, Easing } from 'react-native'
import React, { useMemo } from 'react';
import {
  BottomSheetModal,
  BottomSheetView,  
} from '@gorhom/bottom-sheet';
import { BlurView } from 'expo-blur';
import { ScrollView } from 'react-native-gesture-handler';
import { Extrapolation, FadeIn, FadeInLeft, FadeInUp, interpolate, useAnimatedStyle } from 'react-native-reanimated';
import Animated from 'react-native-reanimated';


const FilterModal = ({filterModalRef}) => {
  
  const snapPoints = useMemo(() => ['50%'], [])

  return (
    <BottomSheetModal    
        ref={filterModalRef}
        index={0}
        snapPoints={snapPoints}
        enableDynamicSizing={false}
        backdropComponent={CustomBackdrop}        
      >
        <BottomSheetView style={styles.contentContainer}>
          <ScrollView style={{width: '100%'}} >
            <Animated.View entering={FadeInLeft.delay(50).duration(400)} style={styles.container}>
              <Text>Awesome 🎉</Text>
            </Animated.View>
          </ScrollView>
        </BottomSheetView>
    </BottomSheetModal>
  )
}

const CustomBackdrop = ({animatedIndex, style}) => {

  const backdropStyle = [
    StyleSheet.absoluteFill,
    style,
    styles.overlay,
    
  ]

  return (
    <Animated.View entering={FadeIn.delay(100).duration(400)} style={backdropStyle}>
      <BlurView style={StyleSheet.absoluteFill} tint='dark' intensity={25} >

      </BlurView>
    </Animated.View>
  )
}

export default FilterModal

const styles = StyleSheet.create({  
  container: {
    justifyContent: "center", 
    alignItems: "center"
  },
  contentContainer: {    
    alignItems: 'center',    
    padding: 20
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)"
  }
})