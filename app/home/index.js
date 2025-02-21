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


var page = 1


const HomeScreen = () => {
    
    const [hasResults, setHasResults] = useState(true);
    const selectedCategoriesSet = useRef(new Set())
    const searchRef = useRef(null)    
    const [text, setText] = useState('')
    const [images, setImages] = useState([])    

    const filterChoiseRef = useRef(
        {
            "order": null,
            "orientation": null,
            "color": null
        }
    )
    
    const filterModalRef = useRef(null)
    
    let lastParams = {}

    useEffect(() => {fetchImages()}, []);

    const handleChangeCategory = (category) => {
        if (selectedCategoriesSet.current.has(category)) {
            selectedCategoriesSet.current.delete(category)
        } else {
            selectedCategoriesSet.current.add(category)
        }        
        handleSearch(text)
    }

    const fetchImages = async (params={page: 1}, append=false) => {        
        const {success, data} = await pixabayApiCall(params);        
        setHasResults(data?.total > 0)
        if (success && data.images) {
            lastParams = params
            if (append) {
                setImages([...images, ...data.images])
            } else {
                setImages([...data.images])
            }
        }        
    }
    
    const handleSearch = async (searchTerm) => {            
        setText(searchTerm)

        let selectedCategory = null
        if (selectedCategoriesSet.current.size > 0) {
            selectedCategory = selectedCategoriesSet.current.values().next().value
        }
        
        if (searchTerm == "") {
            page = 1
            searchRef.current.clear()
            setImages([])
            await fetchImages({page: 1, category: selectedCategory})            
            return
        }

        if (searchTerm.length > 2) {
            page = 1
            setImages([])
            await fetchImages({page: page, q: searchTerm, category: selectedCategory})            
        }        
    }    

    const debounceSearch = useCallback(
        debounce(handleSearch, 400),
        []
    )


    const handleMenuButtonPress = () => {
        filterModalRef.current?.present()        
    }    

    return (
         <SafeAreaView style={styles.container}>
            <View style={{flex: 1}}>
                <StatusBar translucent={true} ></StatusBar>
                <View style={styles.header}>
                    <Text style={styles.title}>Pixels</Text>
                    <MenuButton onPress={handleMenuButtonPress} ></MenuButton>
                </View>

                
                <View style={{width: '100%', marginBottom: 10}} >
                    <TextInput
                        placeholder='search'
                        ref={searchRef}
                        onChangeText={debounceSearch}
                        style={styles.textInput}                        
                    />                                        
                    <View style={styles.closeButton}>
                        {
                            text && 
                            <Pressable hitSlop={defaultHitSlop} onPress={() => handleSearch('')}>
                                <Ionicons size={24} name="close-circle-outline"></Ionicons>
                            </Pressable>
                        }
                    </View>                              
                </View>
                                
                <CategoryList 
                    categories={AppConstants.categorites} 
                    handleChangeCategory={handleChangeCategory}
                />
                                
                <ScrollView contentContainerStyle={{gap: 15}}>
                    <View>
                        {
                            hasResults ? 
                                <ImageGrid images={images}></ImageGrid>
                                :
                                <Text style={styles.noResultsText} >No results found</Text>
                        }
                    </View>
                
                </ScrollView>
                <FilterComponent filterModalRef={filterModalRef} filterChoiceRef={filterChoiseRef} ></FilterComponent>

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