import SearchBar from '@/components/SearchBar';
import { Link } from 'expo-router';
import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

const search = () => {

    const [username, setUsername] = useState("");


    // console.log(username);

    return (
        <View className="flex-1 mt-5 px-10 items-center ">
            <SearchBar
                placeholder="Search for a clicx"
                value={username}
                onChangeText={(text: string) => setUsername(text)}
            />

            <Link asChild href={`/user-profile/${username}`}>
                <TouchableOpacity className="flex-row w-full bg-black-200 h-10 rounded-lg justify-around items-center" >
                    <Text className="text-2xl font-pbold text-white">Search</Text>
                </TouchableOpacity>
            </Link>
        </View>
    )
}

export default search