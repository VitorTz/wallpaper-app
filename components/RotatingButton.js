import React, { useRef, useState } from "react";
import { View, Animated, StyleSheet, TouchableOpacity, Text, Pressable } from "react-native";

const RotatingElement = ({onPress, children, style}) => {
  const rotateAnim = useRef(new Animated.Value(0)).current;    

  const [isRotating, setIsRotating] = useState(false);

  
  const startRotation = () => {
    if (isRotating) return;
    onPress()
    setIsRotating(true);

    Animated.timing(rotateAnim, {
      toValue: 1,
      duration: 1000, // 1 segundo para girar
      useNativeDriver: true,
    }).start(() => {                
        rotateAnim.setValue(0);
        setIsRotating(false);
    });
  };

  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <Pressable style={style} onPress={startRotation}>
      <Animated.View style={{ transform: [{ rotate: rotateInterpolate }] }}>
        {children}
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({  
  box: {
    width: 100,
    height: 100,
    backgroundColor: "blue",
    marginBottom: 20,
  },
  button: {
    padding: 10,
    backgroundColor: "black",
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default RotatingElement;