import { StyleSheet, Text, View } from 'react-native'
import { Stack } from 'expo-router'
import React from 'react'

const Layout = () => {
  return (
    <Stack>
        <Stack.Screen name='index' options={{headerShown: false}} ></Stack.Screen>
        <Stack.Screen name='home/index' options={{headerShown: false}} ></Stack.Screen>
    </Stack>
  )
}

export default Layout

const styles = StyleSheet.create({})