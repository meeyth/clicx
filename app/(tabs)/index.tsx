// app/(tabs)/feed.tsx
import BlogCard from '@/components/BlogCard';
import { images } from '@/constants';
import { useGetFeedQuery } from '@/features/feed/feedApi';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    FlatList,
    Image,
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
                <ActivityIndicator size="small" color="#007AFF" />
            ) : hasNextPage ? (
                <Text style={{ color: '#888' }} className="font-plight">Scroll to load more</Text>
            ) : (
                <Text style={{ color: '#888' }} className="font-plight">No more Clicx</Text>
            )}
        </View>
    );

    const renderHeader = () => (
        <View className="h-20 w-[90%] mt-[10%] px-2 self-center">
            <Text className="font-pextrabold text-3xl">Clicx</Text>
            <Image source={images.path} className="h-2 w-20" style={{ resizeMode: 'contain' }} />
            <View className="bg-black-200 h-[0.1rem] w-full rounded-lg mt-2 opacity-35 mb-20" />
        </View>
    );

    return (
        <View className="flex-1 bg-background-100">
            {isLoading && !feedData ? (
                <View className="flex-1 justify-center items-center">
                    <ActivityIndicator size="large" color="#007AFF" />
                </View>
            ) : (
                <FlatList
                    data={feedData?.docs || []}
                    keyExtractor={(item) => item._id.toString()}
                    renderItem={BlogCard}
                    contentContainerClassName="w-[95%] self-center"
                    ListHeaderComponent={renderHeader}
                    ListFooterComponent={renderFooter}
                    onEndReached={handleLoadMore}
                    onEndReachedThreshold={0.6}
                    ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 50 }} className="font-plight">No Clicx found.</Text>}
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
