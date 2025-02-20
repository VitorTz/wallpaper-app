import axios from 'axios';
import Constants from 'expo-constants';


const { PIXABAY_KEY } = Constants.expoConfig?.extra || {};
const PER_PAGE = 20
const PIXABAY_API_URL = `https://pixabay.com/api/?key=${PIXABAY_KEY}&per_page=${PER_PAGE}&editors_choise=true`;

var lastSearch = ""

const createUrl = (params) => { // {q, page, category, order}    
    if (!params) {
        return PIXABAY_API_URL
    }    
    const paramsKeys = Object.keys(params)
    let url = PIXABAY_API_URL
    paramsKeys.forEach(
        key => {
            const value = key == 'q' ? encodeURIComponent(params[key]) : params[key];
            if (value) {
                url += `&${key}=${value}`
            }
        }
    )
    console.log(url)
    return url

}


export const pixabayApiCall = async (params) => {
    try {   
        const searchUrl = createUrl(params)        
        const {data} = await axios.get(searchUrl)
        return {success: true, data}
    } catch {err} {
        console.log("error", err.message)
        return {success: false, msg: err.message}
    }
}