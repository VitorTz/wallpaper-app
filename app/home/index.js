import { ActivityIndicator, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { wp, hp, defaultHitSlop } from '../../helpers/common'
import { ScrollView } from 'react-native'
import { AppConstants } from '../../constants/AppConstants'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import CategoryList from '../../components/CategoryList'
import { theme } from '../../constants/themes'
import { pixabayApiCall } from '../api'
import MenuButton from '../../components/MenuButton'
import ImageGrid from '../../components/ImageGrid'
import { Ionicons } from '@expo/vector-icons'
import { debounce } from 'lodash'
import FilterComponent from '../../components/FilterModal'
import { StatusBar } from 'expo-status-bar'



var current_params = {
    q: null,
    order: null,
    orientation: null,
    color: null,
    page: 1,
    category: null
}


const HomeScreen = () => {
    
    const [hasResults, setHasResults] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState(null)
    const [searchText, setSearchText] = useState('')
    const [images, setImages] = useState([])
    const searchRef = useRef(null)    

    const filterChoiceRef = useRef({order: null, orientation: null, color: null})
    const filterModalRef = useRef(null)    

    useEffect(() => {fetchImages()}, []);

    const handleChangeCategory = (category) => {        
        setSelectedCategory(category)
        current_params.category = category
        handleSearch(searchText)
    } 

    const handleFilterChange = () => {
        handleSearch(searchText)
    }

    const fetchImages = async (append=false) => {                
        const {success, data} = await pixabayApiCall(current_params);        
        setHasResults(data?.total > 0)
        if (success && data.images) {
            current_params.page += 1
            append ? setImages([...images, ...data.images]) : setImages([...data.images])            
        }        
    }

    const handleSearch = async (searchTerm) => {
        setSearchText(searchTerm)
        
        current_params.q = searchTerm
        current_params.order = filterChoiceRef.current.order
        current_params.orientation = filterChoiceRef.current.orientation
        current_params.color = filterChoiceRef.current.color        
        current_params.page = 1

        if (searchTerm == "") {
            searchRef.current.clear()
            setImages([])
            await fetchImages()
            return
        }

        if (searchTerm.length > 2) {            
            setImages([])
            await fetchImages()
        }        
    }    

    const debounceSearch = useCallback(
        debounce(handleSearch, 400),
        []
    )

    return (
         <SafeAreaView style={styles.container}>
            <View style={{flex: 1}}>

                <StatusBar translucent={true} ></StatusBar>
                <View style={styles.header}>
                    <Text style={styles.title}>Pixels</Text>
                    <MenuButton onPress={() => filterModalRef.current?.present()} ></MenuButton>
                </View>

                {/* Searh Bar */}
                <View style={{width: '100%', marginBottom: 10}} >
                    <TextInput
                        placeholder='search'
                        ref={searchRef}
                        onChangeText={debounceSearch}
                        style={styles.textInput}                        
                    />
                    <View style={styles.closeButton}>
                        {
                            searchText && 
                            <Pressable hitSlop={defaultHitSlop} onPress={() => handleSearch('')}>
                                <Ionicons size={24} name="close-circle-outline"></Ionicons>
                            </Pressable>
                        }
                    </View>                              
                </View>

                {/* Image category */}
                <CategoryList selectedCategory={selectedCategory} handleChangeCategory={handleChangeCategory}/>

                {/* Images */}
                <ScrollView contentContainerStyle={{gap: 15}}>
                    <View>
                        {
                            hasResults ? <ImageGrid images={images}/> :
                            <Text style={styles.noResultsText} >No results found</Text>
                        }
                    </View>                
                </ScrollView>
                
                {/* Image filter */}
                <FilterComponent filterModalRef={filterModalRef} filterChoiceRef={filterChoiceRef} handleFilterChange={handleFilterChange}/>

            </View>
        </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: wp(4),
        paddingVertical: hp(3),
        backgroundColor: theme.colors.white
    },
    title: {
        fontWeight: theme.fontWeights.semiBold,
        fontSize: hp(4)
    },
    header: {
        width: '100%', 
        flexDirection: "row", 
        alignItems: "center", 
        justifyContent: "space-between", 
        marginBottom: 16
    },
    textInput: {
        paddingLeft: 10,
        paddingRight: 40,
        paddingVertical: 10,
        borderWidth: 2,
        borderColor: theme.colors.black,
        borderRadius: 4
    },
    closeButton: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        marginRight: 10,        
        justifyContent: "center",
        alignItems: "flex-end"
    },
    noResultsText: {
        color: theme.colors.black,
        fontWeight: "bold",        
        alignSelf: "center"
    }
})