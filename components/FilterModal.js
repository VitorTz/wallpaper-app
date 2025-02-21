import { View, Text, StyleSheet } from 'react-native'
import React, { useCallback, useMemo, useRef } from 'react';
import {
  BottomSheetModal,
  BottomSheetView,  
} from '@gorhom/bottom-sheet';
import { wp } from '../helpers/common';


const FilterModal = ({filterModalRef}) => {
  
  const snapPoints = useMemo(() => ['75%'], [])

  return (
    <BottomSheetModal       
        style={{marginHorizontal: wp(4)}}
        ref={filterModalRef}
        index={0}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
      >
        <BottomSheetView style={styles.contentContainer}>
          <Text>Awesome 🎉</Text>
        </BottomSheetView>
    </BottomSheetModal>
  )
}

export default FilterModal

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',    
    padding: 20
  },
})