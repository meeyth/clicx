// app/(tabs)/feed.tsx or wherever your feed screen is
// import BlogCard from '@/components/BlogCard';
import BlogCard from '@/components/BlogCard';
import { useGetFeedQuery } from '@/features/feed/feedApi';
import { resetFeedDetails, updateCurrentPageToNextPage } from '@/features/feed/feedSlice';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, View } from 'react-native';

import { useDispatch, useSelector } from 'react-redux';

// const BlogCard = ({ item }) => {
//     // console.log(item.image);
//     return (
//         <View style={{ padding: 16, borderBottomWidth: 1 }}>
//             <Text style={{ fontSize: 16 }}>{item?.title}</Text>
//             <Image source={{ uri: item?.image }} className="h-52 w-full" />
//             <Text style={{ color: '#888' }}>{item?.content}</Text>
//             <Text style={{ color: '#888' }}>{item?.owner?.username}</Text>
//         </View>
//     )
// };

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
        <View className="flex-1 bg-gray-100">
            {isLoading && !feedData ? (
                <View className="flex-1 justify-center items-center">
                    <ActivityIndicator size="large" color="#007AFF" />
                </View>
            ) : (
                <FlatList
                    data={feedData.docs || []}
                    keyExtractor={(item) => item._id.toString()}
                    renderItem={BlogCard}
                    onEndReached={handleLoadMore}
                    onEndReachedThreshold={0.3}
                    ListEmptyComponent={BlogCard}
                    refreshControl={
                        <RefreshControl
                            refreshing={isFetching}
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


