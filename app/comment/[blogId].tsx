// /app/comments/[blogId].jsx

import CommentTile from '@/components/CommentTile';
import { icons, images } from '@/constants';
import { useAddCommentMutation, useGetBlogCommentsQuery, useUpdateCommentMutation } from '@/features/comment/commentApi';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
    ActivityIndicator, FlatList, Image, Keyboard, KeyboardAvoidingView,
    Platform, RefreshControl, Text, TextInput, TouchableOpacity, View
} from 'react-native';

const CommentScreen = () => {
    const { blogId } = useLocalSearchParams();
    const inputRef = useRef(null);
    const [page, setPage] = useState(1);
    const [refreshing, setRefreshing] = useState(false);
    const [comment, setComment] = useState('');
    const [commentIdToEdit, setCommentIdToEdit] = useState(null);

    const [addComment, { isLoading: isAdding }] = useAddCommentMutation();
    const { data: comments, isLoading, isFetching, refetch } = useGetBlogCommentsQuery({ blogId, page });

    const [updateComment] = useUpdateCommentMutation();

    const hasNextPage = comments?.hasNextPage;
    const nextPage = comments?.nextPage;

    const keyboardHandler = () => {
        Keyboard.dismiss();
        setComment("");
        setCommentIdToEdit(null);
    }



    const onRefresh = () => {
        setRefreshing(true);
        setPage(1);
    };

    useEffect(() => {
        if (refreshing && page === 1) {
            refetch();
            setRefreshing(false);
        }
    }, [refreshing, page]);

    const handleLoadMore = () => {
        if (hasNextPage && !isFetching && !refreshing) {
            setPage(nextPage);
        }
    };

    const handleCommentSubmit = async () => {
        try {
            if (commentIdToEdit) {
                console.log({ commentId: commentIdToEdit, newComment: comment, });
                updateComment({ commentId: commentIdToEdit, newComment: comment, });
                keyboardHandler()
                return;
            }

            await addComment({ blogId, content: comment }).unwrap();
            setComment('');
            setCommentIdToEdit(null);
        } catch (err) {
            console.error("Failed to submit comment", err);
        }
    };

    const renderHeader = () => (
        <View className="w-[90%] mt-[10%] px-2 self-center">
            <Text className="font-pextrabold text-3xl">Comments</Text>
            <Image source={images.path} className="h-2 w-20" style={{ resizeMode: 'contain' }} />
            <View className="bg-black-200 h-[0.1rem] w-full rounded-lg mt-2 opacity-35 mb-4" />
        </View>
    );

    const renderFooter = () => (
        <View style={{ marginVertical: 16, alignItems: 'center' }}>
            {isFetching ? <ActivityIndicator size="small" /> : <Text>No more comments</Text>}
        </View>
    );

    return (
        <View className="flex-1 bg-background-100">
            {isLoading && !comments ? (
                <View className="flex-1 justify-center items-center">
                    <ActivityIndicator size="large" color="#000" />
                </View>
            ) : (
                <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
                    <FlatList
                        data={comments?.docs || []}
                        keyExtractor={(item) => item._id.toString()}
                        renderItem={({ item }) => (
                            <CommentTile
                                item={item}
                                setComment={setComment}
                                setCommentIdToEdit={setCommentIdToEdit}
                                inputRef={inputRef}
                            />
                        )}
                        ListHeaderComponent={renderHeader}
                        ListFooterComponent={renderFooter}
                        onEndReached={handleLoadMore}
                        onEndReachedThreshold={0.6}
                        refreshControl={
                            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                        }

                        onScrollBeginDrag={keyboardHandler}
                    />

                    {/* Comment Input */}
                    <View className="flex-row items-center bg-slate-100 rounded-full px-5 mx-5 mt-2 border">
                        <Image source={icons.search} className="w-5 h-5" tintColor="#FFAA33" />
                        <TextInput
                            ref={inputRef}
                            className="ml-2 text-black rounded-full w-full font-pregular"
                            placeholder="Drop your thoughts"
                            value={comment}
                            onChangeText={setComment}
                        />
                    </View>
                    <TouchableOpacity
                        className="flex-row bg-black-200 h-10 rounded-2xl justify-center items-center mb-10 mt-2 mx-5"
                        onPress={handleCommentSubmit}
                        disabled={isAdding}
                    >
                        <Text className="text-2xl font-pbold text-white">
                            {commentIdToEdit ? 'Update' : 'Comment'}
                        </Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            )}
        </View>
    );
};

export default CommentScreen;
