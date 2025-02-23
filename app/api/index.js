import Constants from 'expo-constants';
import axios from 'axios';
import { PER_PAGE_IMAGES } from '../../helpers/common';


const { PIXABAY_KEY } = Constants.expoConfig?.extra || {}
const PIXABAY_API_URL = `https://pixabay.com/api/?key=${PIXABAY_KEY}&per_page=${PER_PAGE_IMAGES}&editors_choise=true`


const createUrl = (params) => {
    let url = PIXABAY_API_URL
    Object.keys(params).forEach(
        key => {
            let value = params[key]
            if (value) {
                if (typeof value === "string") {
                    value = value.trimStart().trimEnd()                    
                }
                value = key == 'q' ? encodeURIComponent(params[key]) : params[key]
                url += `&${key}=${value}`
            }
        }
    )
    return url
}


export const pixabayApiCall = async (params) => {
    try {   
        const searchUrl = createUrl(params)        
        const response = await axios.get(searchUrl)
        const images = response.data.hits.map(item => ({
            uri: item.webformatURL,
            filename: item.previewURL,
            dimensions: {
                width: item.imageWidth,
                height: item.imageHeight
            }            
        }));
        return {            
            success: true,
            data: {
                images: images,
                total: response.data.hits.length
            }
        }
    } catch (err) {        
        return {success: false, msg: err.message}
    }
}