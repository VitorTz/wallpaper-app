import { Dimensions } from "react-native";

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