import { View, Text, StyleSheet, Easing, Platform } from 'react-native'
import React, { useMemo, useState } from 'react';
import {
  BottomSheetModal,
  BottomSheetView,  
} from '@gorhom/bottom-sheet';
import { Pressable, ScrollView } from 'react-native-gesture-handler';
import { FadeIn, FadeInLeft } from 'react-native-reanimated';
import Animated from 'react-native-reanimated';
import { hp, wp, imageFilters } from '../helpers/common';
import { theme } from '../constants/themes';
import CustomBackdrop from './CustomBackdrop';


const COLOR_CONTAINER_RADIUS = Platform.OS === "web" ? 64 : 40


const FilterModal = ({filterModalRef, filterChoiceRef}) => {

  let filterState = {}
  imageFilters.forEach(element => {
      const [index, setIndex] = useState(null)  
      filterState[element.key] = {
        selectedIndex: index,
        setSelectedIndex: setIndex
      }
  });
  
  const snapPoints = useMemo(() => ['50%'], [])


  const TextFilter = ({textItem}) => {
    <View>
      <Text>{textItem.name}</Text>
    </View>
  }

  const ColorFilter = ({colorItem}) => {
    <View>
      <Text>{colorItem.name}</Text>
    </View>
  }
  

  const FilterComponent = ({item}) => {

    const renderFilterComponent = () => {
      switch (item.type) {
        case "text":
          return (
            <TextFilter textItem={item} ></TextFilter>
          )
        case "color":
          return (
            <ColorFilter colorItem={item} ></ColorFilter>
        )
      }
    }

    return (
      <View key={item.key} style={{alignSelf: "flex-start"}} >        
          <Text style={styles.headerText}>{item.name}</Text>
          {renderFilterComponent()}
      </View>
    )

  }

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
          <Animated.View 
            entering={FadeInLeft.delay(50).duration(400)} 
            style={styles.container}>
            {
                imageFilters.map(
                  (item) => {<FilterComponent key={item.key} item={item}/>})
            }
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
  contentContainer: {    
    alignItems: 'center',    
    padding: 20
  },  
  headerText: {
    alignSelf: "flex-start",
    fontWeight: theme.fontWeights.semiBold,
    fontSize: hp(3.4),
    color: theme.colors.text,
    marginBottom: 10
  },
  filterContainer: {    
    flexDirection: "row",
    alignContent: "flex-start",
    gap: 10,
    flexWrap: "wrap"
  },
  textFilterContainer: {
    borderRadius: 4,        
    padding: 4,
    marginRight: 4,
    paddingVertical: 8, 
    backgroundColor: theme.colors.grayBG,
    paddingHorizontal: 16
  },
  text: {
    fontSize: hp(1.8),
    fontWeight: theme.fontWeights.medium,
    userSelect: 'none'
  },
  colorContainer: {
    width: COLOR_CONTAINER_RADIUS,
    height: COLOR_CONTAINER_RADIUS,
    borderRadius: COLOR_CONTAINER_RADIUS
  },
  colorContainerSelected: {
    
  }
  
})