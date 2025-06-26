import { Link } from 'expo-router';
import React from 'react';
import { Image, Text, View } from 'react-native';

const blogCommentTile = ({ item }) => {

    // console.log(item);

    return (
        <Link href={`/user-profile/${item?.owner?.username}`} className="mb-5 mx-5">
            <View className="px-5 h-16 w-full rounded-lg flex-row justify-start items-center bg-slate-100" >
                <Image
                    source={{ uri: item?.owner?.avatar }}
                    className="h-12 w-12 rounded-full mr-10"
                />
                <View className="justify-evenly items-start">
                    <Text className="font-pmedium text-xs" >{item?.owner?.username}</Text>
                    <Text className="font-pmedium text-sm text-slate-500">{item?.content}</Text>
                </View>
            </View>
        </Link>

    )
}

export default blogCommentTile