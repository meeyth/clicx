
import { useAuthInit } from "@/hooks/useAuthInit";
import "./globals.css";

import { Redirect } from 'expo-router';
import { ActivityIndicator, View } from "react-native";
import { useSelector } from 'react-redux';


export default function Index() {
  const { loading } = useAuthInit();
  const user = useSelector((state) => state.auth.user);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return user ? <Redirect href="(tabs)" /> : <Redirect href="(auth)" />;
}
