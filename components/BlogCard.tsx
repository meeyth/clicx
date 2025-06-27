import { Link } from 'expo-router';
import React from 'react';
import { ImageBackground, Text, View } from 'react-native';

import Feather from '@expo/vector-icons/Feather';

const BlogCard = ({ item }) => {
    console.log(item, "item");
    return (
        <Link href={`blog-details/${item?._id}`} className="mb-12 ">
            <View className="px-5 w-full " >
                <ImageBackground
                    source={{ uri: item?.image }}
                    className="h-52 w-full mb-2 "
                    imageClassName="rounded-2xl"
                >
                    <View className="h-7 w-fit absolute right-2 top-2 justify-center items-center rounded-3xl bg-[#FFFA] py-1 px-2">
                        <Link href={`/user-profile/${item?.owner?.username}`} >
                            <Text className="font-pmedium text-sm text-black">@{item?.owner?.username}</Text>
                        </Link>
                    </View>
                </ImageBackground>
                <View className="flex-row w-full justify-between">
                    <Text className="font-psemibold text-2xl" numberOfLines={1}>{item?.title}</Text>
                    <Feather name="arrow-up-right" size={24} color="black" />
                </View>
            </View>
        </Link>
    )
};

export default BlogCard