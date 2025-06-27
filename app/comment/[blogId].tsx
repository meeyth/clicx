
import CommentTile from '@/components/CommentTile';
import { icons, images } from '@/constants';
import { useAddCommentMutation, useGetBlogCommentsQuery } from '@/features/comment/commentApi';


import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, KeyboardAvoidingView, Platform, RefreshControl, Text, TextInput, TouchableOpacity, View } from 'react-native';




const FollowList = () => {
    const { blogId } = useLocalSearchParams();



    const [page, setPage] = useState(1);
    const [refreshing, setRefreshing] = useState(false);
    const [comment, setComment] = useState("");


    const [addComment, { isLoading: isCommentLoading }] = useAddCommentMutation();

    const handleAddComment = async () => {
        try {
            await addComment({ blogId, content: comment }).unwrap();
            setComment("");
            // You can optionally clear input or show toast here
        } catch (err) {
            console.error('Failed to comment:', err);
        }
    };


    // console.log(userId, "FollowList");

    const {
        data: comments,
        isLoading,
        isFetching,
        isError,
        refetch } = useGetBlogCommentsQuery({ blogId, page });


    const hasNextPage = comments?.hasNextPage;
    const nextPage = comments?.nextPage;

    const onRefresh = () => {
        setRefreshing(true);
        setPage(1);
    };

    useEffect(() => {
        if (refreshing && page === 1) {
            refetch();
            setRefreshing(false);
        }
    }, [refreshing, page, refetch]);

    const handleLoadMore = () => {
        if (hasNextPage && !isFetching && !refreshing) {
            setPage(nextPage);
        }
    };



    const renderHeader = () => {
        return (
            <View className="w-[90%] mt-[10%] px-2 self-center">
                <Text className="font-pextrabold text-3xl" > Comments</Text>
                <Image source={images.path} className="h-2 w-20" style={{ resizeMode: "contain" }} />
                <View className="bg-black-200 h-[0.1rem] w-full rounded-lg mt-2 opacity-35 mb-4" />


            </View>
        );
    };



    const renderFooter = () => (
        <View style={{ marginVertical: 16, alignItems: 'center' }}>
            {isFetching && !refreshing ? (
                <ActivityIndicator size="small" color="#000" />
            ) : hasNextPage ? (
                <Text style={{ color: '#888' }} className="font-plight">Scroll to load more</Text>
            ) : (
                <Text style={{ color: '#888' }} className="font-plight">No more Comments</Text>

            )}
        </View>
    );

    // console.log(comments?.docs, "data in ui");


    return (
        <View className="flex-1 bg-background-100">
            {isLoading && !comments ? (
                <View className="flex-1 justify-center items-center">
                    <ActivityIndicator size="large" color="#000" />
                </View>
            ) : (
                <KeyboardAvoidingView className="border border-solid" behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
                    <FlatList
                        contentContainerClassName="w-[95%] self-center"
                        data={comments.docs || []}
                        keyExtractor={(item) => item._id.toString()}
                        renderItem={({ item }) => <CommentTile item={item} />}
                        onEndReachedThreshold={0.6}
                        ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 50 }} className="font-plight">No comments found.</Text>}
                        ListHeaderComponent={renderHeader}
                        ListFooterComponent={renderFooter}
                        onEndReached={handleLoadMore}
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                                tintColor="#000"
                            />
                        }
                        keyboardShouldPersistTaps='always'
                    />

                    <View className="flex-row items-center bg-slate-100 rounded-full px-5 border border-solid mx-5" >
                        <Image
                            source={icons.search}
                            className="w-5 h-5"
                            resizeMode="contain"
                            tintColor="#FFAA33"
                        />
                        <TextInput
                            placeholder="Drop your thoughts"
                            value={comment}
                            onChangeText={setComment}
                            className="ml-2 text-black rounded-full w-full font-pregular"
                            placeholderTextColor="#A8B5DB"

                        />
                    </View>
                    <TouchableOpacity className="flex-row bg-black-200 h-10 rounded-2xl justify-around items-center mb-10 mt-2 mx-5" onPress={handleAddComment}>
                        <Text className="text-2xl font-pbold text-white">Comment</Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            )}
        </View>
    )

}



export default FollowList