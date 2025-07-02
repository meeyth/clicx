import SearchBar from '@/components/SearchBar';
import UserCard from '@/components/UserCard';
import { images } from '@/constants';
import { useGetUsersSortedByBlogsQuery } from '@/features/user/userApi';
import { Feather } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    FlatList,
    Image,
    Keyboard,
    RefreshControl,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

const SearchScreen = () => {
    const [username, setUsername] = useState("");
    const [page, setPage] = useState(1);
    const [refreshing, setRefreshing] = useState(false);

    const {
        data: userData,
        isLoading,
        isFetching,
        isError,
        refetch
    } = useGetUsersSortedByBlogsQuery({ page, limit: 10 });

    // console.log(userData);

    const hasNextPage = userData?.hasNextPage;
    const nextPage = userData?.nextPage;

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

    const keyboardHandler = () => {
        Keyboard.dismiss();
        setUsername("");
    }

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
            {/* Search Header stays persistent */}
            <View className="h-50 w-[90%] mt-[10%] px-2 self-center boeder border-solid">
                <Text className="font-pextrabold text-3xl">Search</Text>
                <Image source={images.path} className="h-2 w-20" style={{ resizeMode: 'contain' }} />
                <View className="bg-black-200 h-[0.1rem] w-full rounded-lg mt-2 opacity-35 mb-12" />

                <View className="flex-1 items-center mb-10 flex-row justify-between h-20">
                    <SearchBar
                        placeholder="Search for a clicx"
                        value={username}
                        onChangeText={(text: string) => setUsername(text)}
                    />

                    <Link asChild href={`/user-profile/${username}`}>
                        <TouchableOpacity className="flex-row w-12 bg-black-200 h-12 rounded-2xl justify-around items-center" >
                            <Feather name="search" color="#fff" size={24} />
                        </TouchableOpacity>
                    </Link>
                </View>

            </View>

            {isLoading && !userData ? (
                <View className="flex-1 justify-center items-center">
                    <ActivityIndicator size="large" color="#000" />
                </View>
            ) : (
                <FlatList
                    data={userData?.docs || []}
                    keyExtractor={(item) => item._id.toString()}
                    renderItem={({ item }) => <UserCard item={item} />}
                    contentContainerClassName="w-[95%] self-center mt-3"
                    ListHeaderComponent={<Text className="font-pextrabold text-3xl mb-3 px-5 ">You might also know</Text>}
                    ListFooterComponent={renderFooter}
                    onEndReached={handleLoadMore}
                    onEndReachedThreshold={0.6}
                    ListEmptyComponent={
                        <Text style={{ textAlign: 'center', marginTop: 50 }} className="font-plight">
                            No Clicx found.
                        </Text>
                    }
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                            tintColor="#000"
                        />
                    }
                    onScrollBeginDrag={keyboardHandler}
                />
            )}
        </View>

    );
};

export default SearchScreen;
