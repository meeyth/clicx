import { Link } from "expo-router";
import { Text, View } from "react-native";
import "./globals.css";

export default function Index() {
  return (
    <View className="flex-1 justify-center items-center ">
      <Text className="text-purple-600 text-3xl font-pbold">Clicx.</Text>
      <Link href="/(auth)">Login</Link>
      <Link href="/(auth)/signup">Signup</Link>
    </View>
  );
}
