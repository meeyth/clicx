import { useRouter } from 'expo-router';
import React from 'react';
import { Image, ImageBackground, Text, TouchableOpacity, View } from 'react-native';

const UserCard = ({ item }) => {
    const router = useRouter();
    // console.log(item);
    return (
        <View className="px-5 w-full h-72 mb-14" >
            <ImageBackground
                source={{ uri: item.coverImage || "https://res.cloudinary.com/dyrd8bmxo/image/upload/v1751458968/logo2_actlgk.png" }}
                className="h-44 w-full mb-20 "
                imageClassName="rounded-2xl"
            >
                <Image
                    source={{ uri: item.avatar }}
                    className="h-28 w-28 rounded-full absolute -bottom-[30%] left-7 border-2 border-solid border-white "
                />

                <View className="absolute -bottom-[40%] right-2">
                    <Text className="font-pmedium text-xl " numberOfLines={1}>{item.fullname}</Text>
                    <Text className="font-pregular text-lg w-[80%] " numberOfLines={1}>@{item.username}</Text>
                </View>
            </ImageBackground>


            <View className="flex-row w-full justify-between px-1">

                <TouchableOpacity className="flex-row w-full bg-white h-10 rounded-lg justify-around items-center border border-solid" onPress={() => { router.navigate(`/user-profile/${item.username}`) }}>
                    <Text className="text-2xl font-pbold text-black-200">Profile</Text>
                </TouchableOpacity>
                {/* <TouchableOpacity className="flex-row w-[47%] bg-black-200 h-10 rounded-lg justify-around items-center" onPress={() => { }}>
                    <Text className="text-2xl font-pbold text-white">Follow</Text>
                </TouchableOpacity> */}
            </View>
        </View>
    )
}

export default UserCard