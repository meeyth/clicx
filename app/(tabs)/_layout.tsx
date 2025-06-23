// app/(tabs)/_layout.tsx

import icons from '@/constants/icons';
import { Redirect, Tabs } from 'expo-router';
import React from 'react';
import { Image, View } from 'react-native';
import { useSelector } from 'react-redux';

function TabIcon({ focused, icon, title }: any) {
    const user = useSelector((state: any) => state.auth.user);

    const isProfileTab = title === 'Profile';
    const profileImage = user?.avatar;

    if (isProfileTab && profileImage) {
        return (
            <View className="mt-4">
                <Image
                    source={{ uri: profileImage }}
                    style={{
                        width: focused ? 28 : 24,
                        height: focused ? 28 : 24,
                        borderRadius: 50,
                        borderWidth: focused ? 2 : 0,
                        borderColor: focused ? "#ff9911" : "transparent",
                    }}
                    className={focused ? "size-7" : "size-6"}
                />
            </View>
        );
    }

    return (
        <View
            className={`mt-4 justify-center items-center min-w-full min-h-16   ${focused ? "rounded-full overflow-hidden" : ""
                }`}
        >
            <Image
                source={icon}
                tintColor={focused ? "#000000" : "#0F0F0F"}
                className={focused ? "size-7" : "size-6"}
            />
        </View>
    );
}

const HomeLayout = () => {
    const user = useSelector((state: any) => state.auth.user);

    if (!user) return <Redirect href="/(auth)" />;

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
                    borderRadius: 50,
                    marginHorizontal: 10,
                    marginBottom: 36,
                    height: 52,
                    position: "absolute",
                    overflow: "hidden",
                    borderWidth: 1,
                    justifyContent: "center",
                    alignItems: "center",
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    headerShown: false,
                    title: "Home",
                    tabBarIcon: ({ focused }) => (
                        <TabIcon focused={focused} icon={icons.home} title="Home" />
                    ),
                }}
            />
            <Tabs.Screen
                name="search"
                options={{
                    headerShown: false,
                    title: "Search",
                    tabBarIcon: ({ focused }) => (
                        <TabIcon focused={focused} icon={icons.search} title="Search" />
                    ),
                }}
            />
            <Tabs.Screen
                name="create"
                options={{
                    headerShown: false,
                    title: "Create",
                    tabBarIcon: ({ focused }) => (
                        <TabIcon focused={focused} icon={icons.plus} title="Create" />
                    ),
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    headerShown: false,
                    title: "Profile",
                    tabBarIcon: ({ focused }) => (
                        <TabIcon focused={focused} icon={icons.profile} title="Profile" />
                    ),
                }}
            />
        </Tabs>
    );
};

export default HomeLayout;
