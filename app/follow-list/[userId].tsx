import AccountListItem from '@/components/AccountListItem';
import { images } from '@/constants';
import { useGetFollowingQuery } from '@/features/follow/followApi';

import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { ActivityIndicator, FlatList, Image, Text, View } from 'react-native';

const FollowList = () => {
    const { userId } = useLocalSearchParams();

    console.log(userId, "FollowList");

    const { data: followingList, isLoading } = useGetFollowingQuery({ userId }, { refetchOnMountOrArgChange: true });


    const renderHeader = () => {
        return (
            <View className="h-20 w-[90%] mt-[10%] px-2 self-center">
                <Text className="font-pextrabold text-3xl" > Following</Text>
                <Image source={images.path} className="h-2 w-20" style={{ resizeMode: "contain" }} />
                <View className="bg-black-200 h-[0.1rem] w-full rounded-lg mt-2 opacity-35  mb-20" />
            </View>
        );
    };
    console.log(followingList?.docs);


    console.log(userId);
    return (
        <View className="flex-1 bg-background-100">
            {isLoading && !followingList ? (
                <View className="flex-1 justify-center items-center">
                    <ActivityIndicator size="large" color="#007AFF" />
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
                // ListFooterComponent={renderFooter}
                // refreshControl={
                //     <RefreshControl
                //         refreshing={refreshing}
                //         onRefresh={onRefresh}
                //         tintColor="#007AFF"
                //     />
                // }
                />
            )}
        </View>
    )
}

export default FollowList