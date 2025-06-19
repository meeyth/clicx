import icons from '@/constants/icons';
import { Redirect, Tabs } from 'expo-router';
import React from 'react';
import { Image, View } from 'react-native';
import { useSelector } from 'react-redux';


function TabIcon({ focused, icon, title }: any) {
    if (focused) {
        return (
            <View
                className="flex flex-row w-full flex-1 min-w-[100px] min-h-16 mt-4 justify-center items-center rounded-full overflow-hidden"
            >
                <Image source={icon} tintColor="#222222" className="size-7" />

            </View>
        );
    }

    return (
        <View className="size-full justify-center items-center mt-4 rounded-full">
            <Image source={icon} tintColor="#666666" className="size-6" />
        </View>
    );
}


const HomeLayout = () => {
    const user = useSelector((state) => {
        return state.auth.user
    })

    if (!user) return <Redirect href="/(auth)" />

    return (
        <Tabs
            screenOptions={{
                tabBarShowLabel: false,
                tabBarItemStyle: {
                    width: "100%",
                    height: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                },
                tabBarStyle: {
                    // backgroundColor: "#0F0D23",
                    borderRadius: 50,
                    marginHorizontal: 10,
                    marginBottom: 36,
                    height: 52,
                    // width: "90%",
                    position: "absolute",
                    overflow: "hidden",
                    borderWidth: 1,
                    // borderColor: "#0F0D23",
                    justifyContent: "center",
                    alignItems: "center"
                },
            }}
        >
            <Tabs.Screen
                name='profile'
                options={{
                    headerShown: false,
                    title: "Profile",
                    tabBarIcon: ({ focused }) => (
                        <TabIcon
                            focused={focused}
                            icon={icons.profile}
                            title="Profile"
                        />
                    )

                }}
            />
            <Tabs.Screen
                name='index'
                options={{
                    headerShown: false,
                    title: "Home",
                    tabBarIcon: ({ focused }) => (
                        <TabIcon
                            focused={focused}
                            icon={icons.home}
                            title="Home"
                        />
                    )
                }}
            />
            <Tabs.Screen
                name='create'
                options={{
                    headerShown: false,
                    title: "Create",
                    tabBarIcon: ({ focused }) => (
                        <TabIcon
                            focused={focused}
                            icon={icons.plus}
                            title="Create"
                        />
                    )

                }}
            />

        </Tabs>
    )
}

export default HomeLayout