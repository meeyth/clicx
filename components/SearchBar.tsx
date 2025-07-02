import { icons } from "@/constants";
import { Image, TextInput, View } from "react-native";


interface Props {
    placeholder: string;
    value?: string;
    onChangeText?: (text: string) => void;
    onPress?: () => void;
}

const SearchBar = ({ placeholder, value, onChangeText, onPress }: Props) => {
    return (
        <View className="flex-row items-center bg-slate-100 rounded-full px-5 my-2 border border-solid w-[85%]" >
            <Image
                source={icons.search}
                className="w-5 h-5"
                resizeMode="contain"
                tintColor="#FFAA33"
            />
            <TextInput
                onPress={onPress}
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                className="flex-1 ml-2 text-black rounded-full font-pregular h-14"
                placeholderTextColor="#A8B5DB"
                cursorColor="#0F0F0f"
            />
        </View>
    );
};

export default SearchBar;