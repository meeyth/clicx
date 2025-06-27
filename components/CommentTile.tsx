import Feather from '@expo/vector-icons/Feather';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Link } from 'expo-router';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';


const CommentTile = ({ item }) => {

    const userId = useSelector(state => state.auth.user._id);

    // console.log(userId);

    return (
        <Link href={`/user-profile/${item?.owner?.username}`} className="mb-5 mx-5 ">
            <View className="px-5 py-2 w-full rounded-lg flex-row justify-start items-center bg-slate-100 h-auto" >
                <Image
                    source={{ uri: item?.owner?.avatar }}
                    className="h-12 w-12 rounded-full mr-5"
                />
                <View className="justify-evenly items-start w-[60%]">
                    <Text className="font-pmedium text-xs" >{item?.owner?.username}</Text>
                    <Text className="font-pmedium text-sm text-slate-500">{item?.content}</Text>
                </View>

                <View className="flex-row w-[20%] justify-between items-center ">
                    <TouchableOpacity>
                        <Feather name="edit" size={20} color="gray" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <MaterialIcons name="delete-outline" size={24} color="red" />
                    </TouchableOpacity>
                </View>

            </View>
        </Link>
    )
}

export default CommentTile