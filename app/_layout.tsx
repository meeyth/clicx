import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from 'expo-status-bar';

import { store } from "@/services/store";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import { Provider } from "react-redux";


SplashScreen.preventAutoHideAsync();


export default function RootLayout() {

  const [fontsLoaded, error] = useFonts({
    "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
  })

  useEffect(() => {
    if (error) throw error;
    if (fontsLoaded) SplashScreen.hideAsync();

  }, [fontsLoaded, error])


  if (!fontsLoaded && !error) return null;

  return (
    <Provider store={store}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen
          name="blogs/[ownerId]"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="blog-details/[blogId]"
          options={{ headerShown: false }}
        />
      </Stack>
      <StatusBar hidden />
    </Provider>
  )
}
