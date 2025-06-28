import { Link } from 'expo-router';
import React from 'react';
import { Alert, ImageBackground, Text, TouchableOpacity, View } from 'react-native';

import { useDeleteBlogMutation } from '@/features/blog/blogApi';
import Feather from '@expo/vector-icons/Feather';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useSelector } from 'react-redux';

const BlogCard = ({ item }) => {
    // console.log(item, "item");

    const userId = useSelector(state => state.auth.user._id);

    // console.log(userId);

    const [deleteBlog, { isLoading }] = useDeleteBlogMutation();

    const handleDelete = async () => {
        try {
            Alert.alert("Confirm", "Are you sure you want to delete this blog?", [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Delete",
                    onPress: async () => {
                        await deleteBlog({ blogId: item?._id }).unwrap();
                        // Optional: navigate or refetch data
                    }
                }
            ]);
        } catch (err) {
            console.error("Failed to delete blog:", err);
        }
    };

    return (
        <Link href={`blog-details/${item?._id}`} className="mb-12 ">
            <View className="px-5 w-full " >
                <ImageBackground
                    source={{ uri: item?.image }}
                    className="h-52 w-full mb-2 "
                    imageClassName="rounded-2xl"
                >
                    {item?.owner?.username &&
                        <View className="h-7 w-fit absolute right-2 top-2 justify-center items-center rounded-3xl bg-[#FFFA] py-1 px-2">
                            <Link href={`/user-profile/${item?.owner?.username}`} >
                                <Text className="font-pmedium text-sm text-black">@{item?.owner?.username}</Text>
                            </Link>
                        </View>}
                    {(item?.owner === userId) &&
                        <View className="h-fit w-20 absolute right-2 top-2 justify-around items-center rounded-xl bg-[#FFFA] py-1 px-2 flex-row">
                            <TouchableOpacity>
                                <Feather name="edit" size={20} color="gray" />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handleDelete}>
                                <MaterialIcons name="delete-outline" size={24} color="red" />
                            </TouchableOpacity>
                        </View>}
                </ImageBackground>
                <View className="flex-row w-full justify-between px-1">
                    <Text className="font-pmedium text-2xl w-[80%]" numberOfLines={2}>{item?.title}</Text>
                    <Feather name="arrow-up-right" size={24} color="black" />
                </View>
            </View>
        </Link>
    )
};

export default BlogCard