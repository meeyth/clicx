import AccountListItem from '@/components/AccountListItem';
import { images } from '@/constants';
import { useGetFollowingQuery } from '@/features/follow/followApi';

import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, RefreshControl, Text, View } from 'react-native';

const FollowList = () => {
    const { userId } = useLocalSearchParams();

    const [page, setPage] = useState(1);
    const [refreshing, setRefreshing] = useState(false);

    // console.log(userId, "FollowList");

    const { data: followingList,
        isLoading,
        isFetching,
        isError,
        refetch } = useGetFollowingQuery({ userId, page }, { refetchOnMountOrArgChange: true });


    const hasNextPage = followingList?.hasNextPage;
    const nextPage = followingList?.nextPage;

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
            console.log("Called handleLoadMore", hasNextPage && !isFetching && !refreshing);
            setPage(nextPage);
        }
    };


    const renderHeader = () => {
        return (
            <View className="h-20 w-[90%] mt-[10%] px-2 self-center">
                <Text className="font-pextrabold text-3xl" > Following</Text>
                <Image source={images.path} className="h-2 w-20" style={{ resizeMode: "contain" }} />
                <View className="bg-black-200 h-[0.1rem] w-full rounded-lg mt-2 opacity-35  mb-20" />
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
                <Text style={{ color: '#888' }} className="font-plight">No more Followings</Text>
            )}
        </View>
    );


    console.log(followingList);


    console.log(userId);
    return (
        <View className="flex-1 bg-background-100">
            {isLoading && !followingList ? (
                <View className="flex-1 justify-center items-center">
                    <ActivityIndicator size="large" color="#000" />
                </View>
            ) : (
                <FlatList
                    contentContainerClassName="w-[95%] self-center"
                    data={followingList.docs || []}
                    keyExtractor={(item) => item._id.toString()}
                    renderItem={AccountListItem}
                    // onEndReached={handleLoadMore}
                    onEndReachedThreshold={0.6}
                    ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 50 }} className="font-plight">No Clicx found.</Text>}
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
                />
            )}
        </View>
    )
}

export default FollowList