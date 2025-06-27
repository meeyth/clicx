// app/screens/UserBlog.tsx
import BlogCard from '@/components/BlogCard';
import { images } from '@/constants';
import { useGetUserBlogsQuery } from '@/features/blog/blogApi';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    FlatList,
    Image,
    RefreshControl,
    Text,
    View,
} from 'react-native';

const UserBlog = () => {
    const { ownerId } = useLocalSearchParams();
    const [page, setPage] = useState(1);
    const [refreshing, setRefreshing] = useState(false);

    const {
        data: blogData,
        isLoading,
        isFetching,
        refetch,
    } = useGetUserBlogsQuery(
        { userId: ownerId, page, limit: 5 },
        {
            refetchOnMountOrArgChange: true,
        }
    );

    // console.log(blogData, "blogdata");
    const onRefresh = () => {
        setRefreshing(true);
        setPage(1); // resets to first page
    };

    useEffect(() => {
        if (refreshing && page === 1) {
            refetch();
            setRefreshing(false);
        }
    }, [refreshing, page, refetch]);

    const handleLoadMore = () => {
        if (!isFetching && blogData?.hasNextPage && !refreshing) {
            setPage(blogData.nextPage); // comes from API response
        }
    };

    const renderHeader = () => (
        <View className="h-20 w-[90%] mt-[10%] px-2 self-center">
            <Text className="font-pextrabold text-3xl">Your Clicx</Text>
            <Image
                source={images.path}
                className="h-2 w-20"
                style={{ resizeMode: 'contain' }}
            />
            <View className="bg-black-200 h-[0.1rem] w-full rounded-lg mt-2 opacity-35  mb-20" />
        </View>
    );

    const renderFooter = () => (
        <View style={{ marginVertical: 16, alignItems: 'center' }}>
            {isFetching && !refreshing ? (
                <ActivityIndicator size="small" color="#007AFF" />
            ) : blogData?.hasNextPage ? (
                <Text style={{ color: '#888' }}>Scroll to load more</Text>
            ) : (
                <Text style={{ color: '#888' }}>No more clicx</Text>
            )}
        </View>
    );


    return (
        <View className="flex-1 bg-slate-100">
            {isLoading && !blogData ? (
                <View className="flex-1 justify-center items-center">
                    <ActivityIndicator size="large" color="#007AFF" />
                </View>
            ) : (
                <FlatList
                    data={blogData?.docs || []}
                    contentContainerClassName="w-[95%] self-center"
                    keyExtractor={(item) => item._id.toString()}
                    renderItem={BlogCard}
                    onEndReached={handleLoadMore}
                    onEndReachedThreshold={0.6}
                    ListEmptyComponent={
                        <Text style={{ textAlign: 'center', marginTop: 50 }}>
                            No clicx found.
                        </Text>
                    }
                    ListHeaderComponent={renderHeader}
                    ListFooterComponent={renderFooter}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                            tintColor="#007AFF"
                        />
                    }
                />
            )}
        </View>
    );
};

export default UserBlog;
