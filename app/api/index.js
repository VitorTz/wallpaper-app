import Constants from 'expo-constants';
import axios from 'axios';
import { PER_PAGE_IMAGES } from '../../helpers/common';


const { PIXABAY_KEY } = Constants.expoConfig?.extra || {}
const PIXABAY_API_URL = `https://pixabay.com/api/?key=${PIXABAY_KEY}&per_page=${PER_PAGE_IMAGES}&editors_choise=true`


const createUrl = (params) => { // {q, page, category, order}
    if (!params) { return PIXABAY_API_URL }
    let url = PIXABAY_API_URL    
    Object.keys(params).forEach(
        key => {
            const value = key == 'q' ? encodeURIComponent(params[key]) : params[key];
            if (value) {
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
            url: item.webformatURL,
            width: item.imageWidth,
            height: item.imageHeight
        }));
        return {            
            success: true,
            data: {
                images: images,
                total: response.data.hits.length
            }
        }
    } catch {err} {
        console.log(err.message)
        return {success: false, msg: err.message}
    }
}