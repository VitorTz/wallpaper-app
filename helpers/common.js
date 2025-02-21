import { useRef } from "react";
import { Dimensions } from "react-native";
import { Platform } from "react-native";

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

export const getImageHeight = (height, width) => {
    if (width > height) {
        return 250
    } else if (width < height) {
        return 300
    }
    return 200
}

export const imageFilters = [
    {
        type: "text",
        key: "order",
        name: "Order",
        filterList: ["popular", "latest"]
    },
    {
        type: "text",
        key: "orientation",
        name: "Orientation",
        filterList: ["horizontal", "vertical"]
    },
    {
        type: "color",
        key: "colors",
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
]


export const PER_PAGE_IMAGES = Platform.OS === "web" ? 40 : 20

export const GRID_COLUMNS = Dimensions.get('window').width >= 1024 ? 4 : Dimensions.get('window').width >= 768 ? 3 : 2

