// app/(tabs)/feed.tsx or wherever your feed screen is
// import BlogCard from '@/components/BlogCard';
import BlogCard from '@/components/BlogCard';
import { images } from '@/constants';
import { useGetFeedQuery } from '@/features/feed/feedApi';
import { resetFeedDetails, updateCurrentPageToNextPage } from '@/features/feed/feedSlice';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, RefreshControl, Text, View } from 'react-native';

import { useDispatch, useSelector } from 'react-redux';


const FeedScreen = () => {
    const dispatch = useDispatch();
    const [refreshing, setRefreshing] = useState(false);


    // Get current page number from Redux metadata
    const {
        page,
        hasNextPage,
        nextPage
    } = useSelector((state) => state.feed.feedDetails);

    // console.log(page, "ppage");

    // Fetch feed using RTK Query (based on current page)
    const {
        data: feedData,
        isLoading,
        isFetching,
        isError,
        refetch
    } = useGetFeedQuery({ page, limit: 5 });

    // console.log(feedData);

    const renderFooter = () => {
        return (
            <View style={{ marginVertical: 16, alignItems: "center" }}>
                {isFetching && !refreshing ? (
                    <ActivityIndicator size="small" color="#007AFF" />
                ) : hasNextPage ? (
                    <Text style={{ color: "#888" }}>Scroll to load more</Text>
                ) : (
                    <Text style={{ color: "#888" }}>No more blogs</Text>
                )}
            </View>
        );
    };
    const renderHeader = () => {
        return (
            <View className="h-20 w-[90%] mt-[10%] px-2 self-center">
                <Text className="font-pextrabold text-3xl" > Clicx</Text>
                <Image source={images.path} className="h-2 w-20" style={{ resizeMode: "contain" }} />
                <View className="bg-black-200 h-[0.1rem] w-full rounded-lg mt-2 opacity-35  mb-20" />
            </View>
        );
    };

    // Pull-to-refresh handler
    const onRefresh = () => {
        setRefreshing(true);
        dispatch(resetFeedDetails()); // page will be set to 1
    };

    useEffect(() => {
        if (refreshing && page === 1) {
            refetch(); // NOW it's called with page = 1
            setRefreshing(false);
        }
    }, [refreshing, page, refetch]);

    // Handle infinite scroll pagination
    const handleLoadMore = () => {
        if (hasNextPage) {
            dispatch(updateCurrentPageToNextPage({ page: nextPage }));
        }
    };




    return (
        <View className="flex-1 bg-background-100">
            {isLoading && !feedData ? (
                <View className="flex-1 justify-center items-center">
                    <ActivityIndicator size="large" color="#007AFF" />
                </View>
            ) : (
                <FlatList
                    contentContainerClassName="w-[95%] self-center"
                    data={feedData.docs || []}
                    keyExtractor={(item) => item._id.toString()}
                    renderItem={BlogCard}
                    onEndReached={handleLoadMore}
                    onEndReachedThreshold={0.6}
                    ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 50 }}>No blogs found.</Text>}
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

export default FeedScreen;


