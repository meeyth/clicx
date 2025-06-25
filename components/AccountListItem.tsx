import { Link } from 'expo-router';
import { Image, Text, View } from 'react-native';

const AccountListItem = ({ item }) => {
    // console.log(item, "AccountListItem");
    return (
        <Link href={`/user-profile/${item?.user?.username}`} className="mb-5 mx-5">
            <View className="px-5 h-16 w-full rounded-lg flex-row justify-start items-center bg-slate-100" >
                <Image
                    source={{ uri: item?.user?.avatar }}
                    className="h-12 w-12 rounded-full mr-10"
                />
                <View className="justify-evenly items-start">
                    <Text className="font-pmedium text-lg" >{item?.user?.fullname}</Text>
                    <Text className="font-pmedium text-sm text-slate-500">@{item?.user?.username}</Text>
                </View>
            </View>
        </Link>

    )
}

export default AccountListItem