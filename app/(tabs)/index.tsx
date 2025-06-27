// app/(tabs)/feed.tsx
import BlogCard from '@/components/BlogCard';
import FeedHeader from '@/components/FeedHeader';
import { useGetFeedQuery } from '@/features/feed/feedApi';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    FlatList,
    RefreshControl,
    Text,
    View
} from 'react-native';

const FeedScreen = () => {
    const [page, setPage] = useState(1);
    const [refreshing, setRefreshing] = useState(false);

    const {
        data: feedData,
        isLoading,
        isFetching,
        isError,
        refetch
    } = useGetFeedQuery({ page, limit: 5 });

    const hasNextPage = feedData?.hasNextPage;
    const nextPage = feedData?.nextPage;

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

    const renderFooter = () => (
        <View style={{ marginVertical: 16, alignItems: 'center' }}>
            {isFetching && !refreshing ? (
                <ActivityIndicator size="small" color="#000" />
            ) : hasNextPage ? (
                <Text style={{ color: '#888' }} className="font-plight">Scroll to load more</Text>
            ) : (
                <Text style={{ color: '#888' }} className="font-plight">No more Clicx</Text>
            )}
        </View>
    );


    return (
        <View className="flex-1 bg-background-100">
            {isLoading && !feedData ? (
                <View className="flex-1 justify-center items-center">
                    <ActivityIndicator size="large" color="#000" />
                </View>
            ) : (
                <FlatList
                    data={feedData?.docs || []}
                    keyExtractor={(item) => item._id.toString()}
                    renderItem={BlogCard}
                    contentContainerClassName="w-[95%] self-center"
                    ListHeaderComponent={FeedHeader}
                    ListFooterComponent={renderFooter}
                    onEndReached={handleLoadMore}
                    onEndReachedThreshold={0.6}
                    ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 50 }} className="font-plight">No Clicx found.</Text>}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                            tintColor="#000"
                        />
                    }
                />
            )}
        </View>
    );
};

export default FeedScreen;
