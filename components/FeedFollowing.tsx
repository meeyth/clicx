import { Link } from 'expo-router';
import { Image, Text, View } from 'react-native';

const FeedFollowing = ({ item }) => {


    return (
        <Link href={`/user-profile/${item?.user?.username}`} className="mb-5 mr-5" >
            <View className="justify-start items-center" >
                <Image
                    source={{ uri: item?.user?.avatar }}
                    className="h-28 w-20 rounded-full border border-solid border-amber-400"
                    resizeMode="cover"
                />
                <View className="justify-evenly items-start">
                    <Text className="font-pmedium text-sm text-slate-900">@{item?.user?.username}</Text>
                </View>
            </View>
        </Link>

    )
}

export default FeedFollowing