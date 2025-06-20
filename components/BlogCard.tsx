import React from 'react';
import { Image, Text, View } from 'react-native';

const BlogCard = ({ item }) => {
    // console.log(item.image);
    return (
        <View className="px-5 w-full mb-5" >
            <Image
                source={{ uri: item?.image }}
                className="h-52 w-full rounded-lg mb-2"
            />
            <View className="flex-row w-full justify-start items-stretch">
                <Text className="font-pmedium text-2xl">{item?.title}</Text>

            </View>
        </View>
    )
};

export default BlogCard