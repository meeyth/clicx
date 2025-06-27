import { useGetSpecificBlogQuery } from '@/features/blog/blogApi';
import { Link, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Image,
    SafeAreaView,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import { useToggleBlogLikeMutation } from '@/features/like/likeApi';
import AntDesign from '@expo/vector-icons/AntDesign';

const BlogDetails = () => {
    const { blogId } = useLocalSearchParams();

    const { data, isLoading, isError, isFetching } = useGetSpecificBlogQuery({ blogId }, { refetchOnMountOrArgChange: true });

    const [toggleLike,] = useToggleBlogLikeMutation();

    const [likeState, setLikeState] = useState(false);

    useEffect(() => {
        setLikeState(data?.isLiked);
        // console.log("useEffect: ", data);
    }, [data?.isLiked]);

    const handleLikePress = async () => {
        try {
            setLikeState(state => !state)
            await toggleLike({ blogId }).unwrap();
            // Optionally update UI state
        } catch (err) {
            console.error("Failed to toggle like", err);
        }
    };

    // console.log(data);

    if (isLoading || isFetching) {
        return (
            <View className="flex-1 justify-center items-center bg-white">
                <ActivityIndicator size="large" color="#000" />
            </View>
        );
    }

    if (isError || !data) {
        return (
            <View className="flex-1 justify-center items-center bg-white">
                <Text className="text-red-500">Failed to load blog.</Text>
            </View>
        );
    }

    return (
        <SafeAreaView className="flex-1 bg-gray-100">
            <ScrollView className="">
                {/* Blog Image */}
                <Image
                    source={{ uri: data.blog.image }}
                    className="w-full h-96 rounded-xl mb-4"
                    resizeMode="cover"
                />
                <View className="flex-row justify-between px-6 mb-2">
                    <Text className="text-2xl font-psemibold text-black mb-2 w-[80%]">{data.blog.title}</Text>
                    <TouchableOpacity className="h-10 w-10 bg-white justify-center items-center rounded-full shadow-lg" onPress={handleLikePress}>
                        <AntDesign name={!likeState ? "hearto" : "heart"} size={24} color="#FF7799" />
                    </TouchableOpacity>
                    {/* Blog Title */}
                </View>

                {/* Author & Meta Info */}
                <View className=" px-6">

                    <View className="flex-row justify-between items-center border-t border-b border-gray-300 py-2 mb-4">
                        <Link href={`/user-profile/${data.blog.owner.username}`}>
                            <View>
                                <Text className="text-xs text-gray-500 font-plight">Author:</Text>
                                <Text className="text-sm font-pmedium text-black">{data.blog.owner.fullname}</Text>
                            </View>
                        </Link>
                        <View>
                            <Text className="text-xs text-gray-500 font-plight">Read Time:</Text>
                            <Text className="text-sm font-pmedium text-black">{data.blog.readTime} min</Text>
                        </View>
                        <View>
                            <Text className="text-xs text-gray-500 font-plight">Reads:</Text>
                            <Text className="text-sm font-pmedium text-black">{data.blog.totalReads}</Text>
                        </View>
                    </View>

                    {/* Blog Content */}
                    <Text className="text-base text-gray-800 leading-6 font-pregular">{data.blog.content}</Text>

                    {/* Footer stats */}
                    <View className="flex-row justify-between mt-6 border-t border-gray-300 pt-3 mb-5">
                        <Text className="text-sm text-gray-500 font-plight">
                            Likes: {data.blog.likeCount}
                        </Text>
                        <Link href={`/comment/${data.blog._id}`}>
                            <Text className="text-sm text-gray-500 font-plight">Comments: {data.blog.commentCount}</Text>
                        </Link>
                        <Text className="text-sm text-gray-500 font-plight">
                            {new Date(data.blog.createdAt).toDateString()}
                        </Text>
                    </View>

                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default BlogDetails;
