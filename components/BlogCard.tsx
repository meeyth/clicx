import { Link } from 'expo-router';
import React from 'react';
import { Image, Text, View } from 'react-native';

const BlogCard = ({ item }) => {
    // console.log(item.image);
    return (
        <Link href={`blog-details/${item?._id}`} className="mb-12">
            <View className="px-5 w-full " >
                <Image
                    source={{ uri: item?.image }}
                    className="h-52 w-full rounded-lg mb-2"
                />
                <View className="flex-row w-full justify-start items-stretch">
                    <Text className="font-pmedium text-2xl">{item?.title}</Text>

                </View>
            </View>
        </Link>
    )
};

export default BlogCard