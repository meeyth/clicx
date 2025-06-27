import { images } from '@/constants'
import { useGetFollowingQuery } from '@/features/follow/followApi'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, Image, RefreshControl, Text, View } from 'react-native'
import { useSelector } from 'react-redux'
import FeedFollowing from './FeedFollowing'

const FeedHeader = () => {

    const userId = useSelector(state => state.auth.user._id);

    // console.log(userId, "userId");

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


    // console.log(followingList);

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

    return (
        <View className="h-72 w-[90%] mt-[10%] px-2 self-center">
            <Text className="font-pextrabold text-3xl">Clicx</Text>
            <Image source={images.path} className="h-2 w-20" style={{ resizeMode: 'contain' }} />
            <View className="bg-black-200 h-[0.1rem] w-full rounded-lg mt-2 opacity-35 mb-5" />
            <Text className="font-psemibold text-3xl mb-5">Friends</Text>
            <View className="flex-1 bg-background-100">
                {isLoading && !followingList ? (
                    <View className="flex-1 justify-center items-center">
                        <ActivityIndicator size="large" color="#000" />
                    </View>
                ) : (
                    <FlatList
                        horizontal
                        data={followingList.docs || []}
                        keyExtractor={(item) => item._id.toString()}
                        renderItem={FeedFollowing}
                        onEndReached={handleLoadMore}
                        onEndReachedThreshold={0.6}
                        showsHorizontalScrollIndicator={false}
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                                tintColor="#000"
                            />
                        }
                        ListEmptyComponent={
                            <Text className="text-center mt-10 font-plight">No Followings found.</Text>
                        }
                    />
                )}
            </View>
        </View>
    )
}

export default FeedHeader