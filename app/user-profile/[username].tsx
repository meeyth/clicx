import { useToggleFollowMutation } from '@/features/follow/followApi';
import { useGetUserQuery } from '@/features/user/userApi';
import { Link, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, Text, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';


const UserProfile = () => {
    const { username } = useLocalSearchParams();
    const user = useSelector((state) => {
        return state.auth.user
    })

    const { data, isLoading, isFetching, isError } = useGetUserQuery({ username }, { refetchOnMountOrArgChange: true });

    const [toggleFollow,] = useToggleFollowMutation();

    const [followState, setFollowState] = useState(false);

    useEffect(() => {
        setFollowState(data?.isFollowing);
        console.log("useEffect: ", data);
    }, [data?.isFollowing]);

    // console.log(data?.isFollowing, "data in ui");

    const handleToggleFollow = async () => {
        try {
            // console.log("handleToggleFollow ");
            setFollowState(state => !state);
            await toggleFollow({ userId: data?.profile?._id }).unwrap();
            // console.log(result);
        } catch (error) {

            console.log(error);

        }
    }
    if (isLoading || isFetching) {
        return (
            <View className="flex-1 justify-center items-center bg-white">
                <ActivityIndicator size="large" color="#000" />
            </View>
        );
    }

    if (isError || !data) {
        return (
            <View className="flex-1 justify-center items-center bg-white">
                <Text className="text-red-500">Failed to load blog.</Text>
            </View>
        );
    }
    return (

        <View className="bg-background-100 flex-1">
            <Image src={data?.profile?.coverImage} className="h-64 w-full" resizeMode='cover' />
            <Image src={data?.profile?.avatar} className="h-32 w-32 rounded-full border-2 border-solid border-amber-400 absolute top-48 left-[5%] " />
            <View className="top-16 mx-[5%] px-2 w-[90%] ">
                <Text className="font-pbold text-3xl">{data?.profile?.fullname} </Text>
                <Text className="font-pmedium text-gray-600">@{data?.profile?.username} </Text>

                <Text className="font-pregular text-black">{data?.profile?.about} </Text>

                <View className="bg-black-200 h-[0.1rem] w-full rounded-lg mt-5 opacity-35" />

                <View className="flex-row justify-start items-start  mt-5 w-full">

                    <Link className="flex justify-start items-start w-[33%] " asChild href={`blogs/${data?.profile?._id}`}>
                        <TouchableOpacity className="flex justify-start items-start w-[33%]" >
                            <Text className="font-pmedium text-black">{data?.profile?.totalBlogs} </Text>
                            <Text className="font-pregular text-black">Clicx </Text>
                        </TouchableOpacity>
                    </Link>

                    <Link className="flex justify-start items-start w-[33%] " asChild href={`follower-list/${data?.profile?._id}`}>
                        <TouchableOpacity className="flex justify-start items-start w-[33%]" >
                            <Text className="font-pmedium text-black">{data?.profile?.totalFollowers} </Text>
                            <Text className="font-pregular text-black">Followers </Text>
                        </TouchableOpacity>
                    </Link>
                    <Link className="flex justify-start items-start w-[33%] " asChild href={`/following-list/${data?.profile?._id}`}>
                        <TouchableOpacity className="flex justify-start items-start w-[33%]" >
                            <Text className="font-pmedium text-black">{data?.profile?.totalFollowings} </Text>
                            <Text className="font-pregular text-black">Followings </Text>
                        </TouchableOpacity>
                    </Link>

                </View>
                <View className="bg-black-200 h-[0.1rem] w-full rounded-lg mt-5 opacity-35  mb-20" />
                {(user?._id === data?.profile?._id) ?
                    "" :
                    followState ?

                        <TouchableOpacity className="flex-row w-full bg-slate-200 h-10 rounded-lg justify-around items-center" onPress={handleToggleFollow} >
                            <Text className="text-2xl font-pbold text-black-200">Unfollow</Text>
                        </TouchableOpacity> :

                        <TouchableOpacity className="flex-row w-full bg-black-200 h-10 rounded-lg justify-around items-center" onPress={handleToggleFollow} >
                            <Text className="text-2xl font-pbold text-white">Follow</Text>
                        </TouchableOpacity>

                }
            </View>

        </View>
    )
}

export default UserProfile