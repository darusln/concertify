import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useFonts } from "expo-font";
import { useEffect } from "react";
import { Stack, SplashScreen } from 'expo-router'
import "../global.css";

SplashScreen.preventAutoHideAsync();

const styles = StyleSheet.create({
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

const commonHeaderOptions = {
  headerShown: true,
  headerTransparent: true,
  headerTitleAlign: 'center',
  headerTitleStyle: styles.headerTitle,
  headerTintColor: '#FFFFFF', // Arrow color
};

const RootLayout = () => {
  const [fontsLoaded, error] = useFonts({
    "Montserrat-Italic-VariableFont": require("../assets/fonts/Montserrat-Italic-VariableFont_wght.ttf"),
    "Montserrat-VariableFont": require("../assets/fonts/Montserrat-VariableFont_wght.ttf")
  })

  useEffect(() => {
    if (error) throw error;

    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  if (!fontsLoaded) {
    return null;
  }

  if (!fontsLoaded && !error) {
    return null;
  }

  return (
    <Stack>
      <Stack.Screen 
        name="index" 
        options={{headerShown: false}} />
      <Stack.Screen 
        name="(tabs)" 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="profile" 
        options={commonHeaderOptions}
      />
      <Stack.Screen 
       name="concert" 
       options={commonHeaderOptions}
      />
      <Stack.Screen 
       name="login" 
       options={commonHeaderOptions}
      />
    </Stack>
  )
}

export default RootLayout
