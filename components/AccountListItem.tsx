import { Image, Text, View } from 'react-native';

const AccountListItem = ({ item }) => {
    // console.log(item, "AccountListItem");
    return (
        <View className="mx-5 px-5 h-16 w-[90%] rounded-lg mb-5 flex-row justify-start items-center bg-slate-100" >
            <Image
                source={{ uri: item?.following?.avatar }}
                className="h-10 w-10 rounded-full mb-2 mr-10"
            />
            <View className="flex-row justify-start">
                <Text className="font-pmedium text-2xl">{item?.following?.username}</Text>
            </View>
        </View>
    )
}

export default AccountListItem