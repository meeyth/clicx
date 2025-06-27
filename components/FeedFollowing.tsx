import { Link } from 'expo-router';
import { Image, Text, View } from 'react-native';

const FeedFollowing = ({ item }) => {
    // console.log(item, "AccountListItem");
    return (
        <Link href={`/user-profile/${item?.user?.username}`} className="mb-5 mr-5 rounded-lg">
            <View className="rounded-lg  justify-start items-center " >
                <Image
                    source={{ uri: item?.user?.avatar }}
                    className="h-28 w-20 rounded-lg border border-solid border-amber-400"
                    resizeMode="cover"
                />
                <View className="justify-evenly items-start">
                    <Text className="font-pmedium text-sm text-slate-500">@{item?.user?.username}</Text>
                </View>
            </View>
        </Link>

    )
}

export default FeedFollowing