// import BlogCard from '@/components/BlogCard';
import BlogCard from '@/components/BlogCard';
import { images } from '@/constants';
import { useGetUserBlogsQuery } from '@/features/blog/blogApi';
import { resetBlogDetails, updateCurrentPageToNextPage } from '@/features/blog/blogSlice';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, RefreshControl, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';


const UserBlog = () => {

    const { ownerId } = useLocalSearchParams();

    const dispatch = useDispatch();
    const [refreshing, setRefreshing] = useState(false);


    // Get current page number from Redux metadata
    const {
        page,
        hasNextPage,
        nextPage
    } = useSelector((state) => state.blog.blogDetails);


    // console.log(page, "ppage");

    // Fetch feed using RTK Query (based on current page)
    const {
        data: blogData,
        isLoading,
        isFetching,
        isError,
        refetch
    } = useGetUserBlogsQuery({ userId: ownerId, page, limit: 5 },
        {
            refetchOnMountOrArgChange: true,
            refetchOnFocus: true,
            refetchOnReconnect: true,

        }
    );

    const renderFooter = () => {
        return (
            <View style={{ marginVertical: 16, alignItems: "center" }}>
                {isFetching && !refreshing ? (
                    <ActivityIndicator size="small" color="#007AFF" />
                ) : hasNextPage ? (
                    <Text style={{ color: "#888" }}>Scroll to load more</Text>
                ) : (
                    <Text style={{ color: "#888" }}>No more clicx</Text>
                )}
            </View>
        );
    };


    const renderHeader = () => {
        return (
            <View className="h-20 w-[90%] mt-[10%] px-2 self-center">
                <Text className="font-pextrabold text-3xl" > Your Clicx</Text>
                <Image source={images.path} className="h-2 w-20" style={{ resizeMode: "contain" }} />
                <View className="bg-black-200 h-[0.1rem] w-full rounded-lg mt-2 opacity-35  mb-20" />
            </View>
        );
    };

    console.log(blogData);

    // Pull-to-refresh handler
    const onRefresh = () => {
        setRefreshing(true);
        dispatch(resetBlogDetails()); // page will be set to 1
    };


    useEffect(() => {
        if (refreshing && page === 1) {
            refetch(); // NOW it's called with page = 1
            setRefreshing(false);
        }
    }, [refreshing, page, refetch]);

    // Handle infinite scroll pagination
    const handleLoadMore = () => {
        if (!isFetching && hasNextPage && !refreshing) {
            dispatch(updateCurrentPageToNextPage({ page: nextPage }));
        }
    };

    console.log(ownerId);

    return (
        <View className="flex-1 bg-slate-100">
            {isLoading && !blogData ? (
                <View className="flex-1 justify-center items-center">
                    <ActivityIndicator size="large" color="#007AFF" />
                </View>
            ) : (
                <FlatList
                    data={blogData.docs || []}
                    contentContainerClassName="w-[95%] self-center"
                    keyExtractor={(item) => item._id.toString()}
                    renderItem={BlogCard}
                    onEndReached={handleLoadMore}
                    onEndReachedThreshold={0.6}
                    ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 50 }}>No clicx found.</Text>}
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
    )
}

export default UserBlog