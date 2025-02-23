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
import { useRouter } from 'expo-router'



var current_params = {
    q: null,
    order: null,
    orientation: null,
    colors: null,
    page: 1,
    category: null
}


const HomeScreen = () => {
    
    const [selectedOrder, setOrder] = useState('')
    const [selectedOrientation, setOrientation] = useState('')
    const [selectedColor, setColor] = useState('')

    const [hasResults, setHasResults] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState(null)
    const [searchText, setSearchText] = useState('')
    const [images, setImages] = useState([])
    const searchRef = useRef(null)
    
    const router = useRouter()
    const scrollRef = useRef(null)

    const filterChoiceRef = useRef({order: null, orientation: null, colors: null})
    const filterModalRef = useRef(null)    

    const [filters, setFilters] = useState([])

    useEffect(() => {fetchImages()}, []);

    const handleChangeCategory = (category) => {        
        setSelectedCategory(category)
        current_params.category = category
        handleSearch(searchText)
    } 

    const handleFilterChange = () => {        
        let newFilters = []
        if (filterChoiceRef.current.order) {            
            newFilters.push({name: "order", value: filterChoiceRef.current.order})
        }
        if (filterChoiceRef.current.orientation) {
            newFilters.push({name: "orientation", value: filterChoiceRef.current.orientation})
        }
        if (filterChoiceRef.current.colors) {
            newFilters.push({name: "colors", value: filterChoiceRef.current.colors})
        }        
        setFilters([...newFilters])
        handleSearch(searchText)
    }

    const handleFilterUnselect = (name) => {
        switch (name) {
            case "order":
                setOrder(null)
                filterChoiceRef.current.order = null
                break
            case "orientation":
                setOrientation(null)
                filterChoiceRef.current.orientation = null
                break
            case "colors":
                setColor(null)
                filterChoiceRef.current.colors = null
                break
        }
        handleFilterChange()
    }

    const fetchImages = async (append=false) => { 
        console.log(current_params, append)              
        const {success, data} = await pixabayApiCall(current_params);        
        setHasResults(data?.total > 0)
        if (success && data.images) {
            current_params.page += 1
            append ? setImages([...images, ...data.images]) : setImages([...data.images])            
        }        
    }

    const handleSearch = async (searchTerm, append=false) => {
        setSearchText(searchTerm)
        
        current_params.q = searchTerm
        current_params.order = filterChoiceRef.current.order
        current_params.orientation = filterChoiceRef.current.orientation
        current_params.colors = filterChoiceRef.current.colors     
        current_params.page = 1

        if (searchTerm == "") {
            searchRef.current.clear()
            setImages([])
            await fetchImages(append)
            return
        }

        if (searchTerm.length > 2) {            
            setImages([])
            await fetchImages(append)
        }        
    }    
    
    let endReached = false

    const handleScroll = async (event) => {        
        const height = event.nativeEvent.contentSize.height
        const scrollViewHeight = event.nativeEvent.layoutMeasurement.height
        const scrollOffset = event.nativeEvent.contentOffset.y
        const bottomPosition = height - scrollViewHeight
        if (!endReached && scrollOffset + 4 >= bottomPosition) {
            endReached = true            
            await fetchImages(true)
            endReached = false
        }        
    }

    const handleScrollTop = () => {
        scrollRef.current.scrollToEnd({animated: true})
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
                    <Pressable hitSlop={defaultHitSlop} onPress={handleScrollTop}>
                        <Text style={styles.title}>Pixels</Text>
                    </Pressable>
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

                {/* Selected filters */}

                {
                    filters && 
                    <View style={{marginBottom: 10}}>
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                            {
                                filters.map(
                                    (item, index) => {
                                        return (
                                            <View key={item.name} style={styles.selectedFilterContainer} >
                                                <Text>{item.value}</Text>
                                                <Pressable hitSlop={defaultHitSlop} onPress={() => handleFilterUnselect(item.name)}>
                                                    <Ionicons name='close-circle-outline' size={22} style={styles.selectedFilterCloseButton} />
                                                </Pressable>
                                            </View>
                                        )
                                    }
                                )
                            }
                        </ScrollView>
                    </View>
                }

                {/* Images */}
                <ImageGrid images={images} onScroll={handleScroll} gridRef={scrollRef} router={router}/>
                {!hasResults && <Text style={styles.noResultsText} >No more results found</Text>}
                
                {/* Image filter */}
                <FilterComponent 
                    filterModalRef={filterModalRef} 
                    filterChoiceRef={filterChoiceRef} 
                    handleFilterChange={handleFilterChange}
                    selectedOrder={selectedOrder}
                    setOrder={setOrder}
                    selectedOrientation={selectedOrientation}
                    setOrientation={setOrientation}
                    selectedColor={selectedColor}
                    setColor={setColor}
                />

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
    },
    selectedFilterContainer: {
        borderRadius: 4,        
        padding: 4,
        marginRight: 4,
        paddingVertical: 8, 
        paddingHorizontal: 16,        
        alignItems: "center",
        flexDirection: "row",
        gap: 10,
        backgroundColor: theme.colors.grayBG
    },
    selectedFilterCloseButton: {
        marginTop: 2
    }
})