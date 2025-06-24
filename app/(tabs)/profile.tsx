import { useLogoutMutation } from '@/features/auth/authApi'
import { Link } from 'expo-router'
import { navigate } from 'expo-router/build/global-state/routing'
import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { useSelector } from 'react-redux'



const index = () => {
    const user = useSelector((state) => {
        return state.auth.user
    })


    const [logout, { isLoading }] = useLogoutMutation();



    const handleLogout = async () => {
        try {
            await logout().unwrap();  // Call the logout mutation
            navigate('/(auth)');  // Redirect to login page after logout
        } catch (err) {
            console.error('Failed to log out:', err);
        }
    };


    return (

        <View className="bg-background-100 flex-1">
            <Image src={user?.coverImage} className="h-64 w-full" resizeMode='cover' />
            <Image src={user?.avatar} className="h-32 w-32 rounded-full border-2 border-solid border-amber-400 absolute top-48 left-[5%] " />
            <View className="top-16 mx-[5%] px-2 w-[90%] ">
                <Text className="font-pbold text-3xl">{user?.fullname} </Text>
                <Text className="font-pmedium text-gray-600">@{user?.username} </Text>

                <Text className="font-pregular text-black">{user?.about} </Text>

                <View className="bg-black-200 h-[0.1rem] w-full rounded-lg mt-5 opacity-35" />

                <View className="flex-row justify-start items-start  mt-5 w-full">

                    <Link className="flex justify-start items-start w-[33%] " asChild href={`blogs/${user?._id}`}>
                        <TouchableOpacity className="flex justify-start items-start w-[33%]" >
                            <Text className="font-pmedium text-black">{user?.totalBlogs} </Text>
                            <Text className="font-pregular text-black">Clicx </Text>
                        </TouchableOpacity>
                    </Link>

                    <Link className="flex justify-start items-start w-[33%] " asChild href={`blogs/${user?._id}`}>
                        <TouchableOpacity className="flex justify-start items-start w-[33%]" >
                            <Text className="font-pmedium text-black">{user?.totalFollowers} </Text>
                            <Text className="font-pregular text-black">Followers </Text>
                        </TouchableOpacity>
                    </Link>
                    <Link className="flex justify-start items-start w-[33%] " asChild href={`/follow-list/${user?._id}`}>
                        <TouchableOpacity className="flex justify-start items-start w-[33%]" >
                            <Text className="font-pmedium text-black">{user?.totalFollowings} </Text>
                            <Text className="font-pregular text-black">Followings </Text>
                        </TouchableOpacity>
                    </Link>

                </View>
                <View className="bg-black-200 h-[0.1rem] w-full rounded-lg mt-5 opacity-35  mb-20" />


                {/* <TouchableOpacity className="w-full bg-red-300 h-10 rounded-lg justify-center items-center mb-5">
                    <Text className="text-2xl font-pbold  ">You Liked</Text>
                </TouchableOpacity> */}

                <TouchableOpacity className="flex-row w-full bg-black-200 h-10 rounded-lg justify-around items-center" onPress={handleLogout}>
                    <Text className="text-2xl font-pbold text-white">Logout</Text>
                </TouchableOpacity>
            </View>

        </View>

    )
}

export default index