import { useRef } from "react";
import { Dimensions } from "react-native";
import { Platform } from "react-native";
import { theme } from "../constants/themes";
const {width: deviceWidth, height: deviceHeight} = Dimensions.get('window');


export const wp = percentage => {
    const width = deviceWidth;
    return (percentage * width) / 100;
}


export const hp = percentage => {
    const height = deviceHeight;
    return (percentage * height) / 100;
}


export const defaultHitSlop = {
    top: 10,
    left: 10,
    right: 10,
    bottom: 10
}


export const safeAreaContainer = {
    flex: 1,
    paddingHorizontal: wp(4),
    paddingVertical: hp(3),
    backgroundColor: theme.colors.white
}

export const getImageHeight = (height, width) => {
    let h = Platform.OS === "web" ? 200 : 0
    if (width > height) {
        h += 300
    } else if (width < height) {
        h += 450
    } else {
        h += 250
    }
    return h
}

export const IMAGE_FILTERS = {
    order: {
        type: "text",        
        name: "Order",
        filterList: ["popular", "latest"]
    },
    orientation: {
        type: "text",        
        name: "Orientation",
        filterList: ["horizontal", "vertical"]
    },
    colors: {
        type: "color",        
        name: "Colors",
        filterList: [
            {name: "red", "hex": "#EF4343"},
            {name: "yellow", "hex": "#FFDF8D"},
            {name: "orange", "hex": "#EF803B"},
            {name: "green", "hex": "#59CE47"},
            {name: "turquoise", "hex": "#58E3DA"},
            {name: "blue", "hex": "#3B93D7"},
            {name: "pink", "hex": "#E046BC"},
            {name: "gray", "hex": "#8E8E8E" },
            {name: "black", "hex": "#000000"},
            {name: "brown", "hex": "#6F3110"},
            {name: "white", "hex": "#FFFFFF"}
        ]
    }
}

export const sleep = (ms) => {return new Promise(resolve => setTimeout(resolve, ms))}

export const PER_PAGE_IMAGES = Platform.OS === "web" ? 40 : 20

export const GRID_COLUMNS = Dimensions.get('window').width >= 1024 ? 4 : Dimensions.get('window').width >= 768 ? 3 : 2

