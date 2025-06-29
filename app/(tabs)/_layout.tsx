import { Redirect, Tabs } from 'expo-router';
import React from 'react';
import { Image, View } from 'react-native';
import { useSelector } from 'react-redux';

// Import Expo icons (feel free to change to FontAwesome5, MaterialIcons, etc.)
import { AntDesign, Feather, Ionicons } from '@expo/vector-icons';

function TabIcon({ focused, title }: { focused: boolean; title: string }) {
    const user = useSelector((state: any) => state.auth.user);

    const isProfileTab = title === 'Profile';
    const profileImage = user?.avatar;

    if (isProfileTab && profileImage) {
        return (
            <View className="mt-5">
                <Image
                    source={{ uri: profileImage }}
                    style={{
                        width: focused ? 28 : 24,
                        height: focused ? 28 : 24,
                        borderRadius: 50,
                        borderWidth: focused ? 2 : 0,
                        borderColor: focused ? '#ff9911' : 'transparent',
                    }}
                />
            </View>
        );
    }

    const color = focused ? '#000000' : '#0F0F0F';

    let iconSize = focused ? 26 : 22;
    let IconComponent: any = Feather;
    let iconName: string = '';

    switch (title) {
        case 'Home':
            IconComponent = AntDesign;
            iconName = 'home';
            break;
        case 'Search':
            IconComponent = Feather;
            iconName = 'search';
            break;
        case 'Create':
            IconComponent = Ionicons;
            iconName = 'add-circle-outline';
            iconSize += 2;
            break;
        case 'Liked':
            IconComponent = AntDesign;
            iconName = 'hearto';
            break;
        case 'Profile':
            IconComponent = Feather;
            iconName = 'user';
            break;
    }

    return (
        <View className=" h-full mt-7">
            <IconComponent name={iconName} size={iconSize} color={color} />
        </View>
    )
}

const HomeLayout = () => {
    const user = useSelector((state: any) => state.auth.user);

    if (!user) return <Redirect href="/(auth)" />;

    return (
        <Tabs
            screenOptions={{
                tabBarShowLabel: false,
                tabBarItemStyle: {
                    display: "flex",
                    justifyContent: 'center',
                    alignItems: 'center',
                },
                tabBarStyle: {
                    borderRadius: 50,
                    marginHorizontal: 20,
                    marginBottom: 36,
                    height: 62,
                    position: 'absolute',
                    overflow: 'hidden',
                    borderWidth: 1,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    headerShown: false,
                    title: 'Home',
                    tabBarIcon: ({ focused }) => <TabIcon focused={focused} title="Home" />,
                }}
            />
            <Tabs.Screen
                name="search"
                options={{
                    headerShown: false,
                    title: 'Search',
                    tabBarIcon: ({ focused }) => <TabIcon focused={focused} title="Search" />,
                }}
            />
            <Tabs.Screen
                name="create"
                options={{
                    headerShown: false,
                    title: 'Create',
                    tabBarIcon: ({ focused }) => <TabIcon focused={focused} title="Create" />,
                }}
            />
            <Tabs.Screen
                name="liked"
                options={{
                    headerShown: false,
                    title: 'Liked',
                    tabBarIcon: ({ focused }) => <TabIcon focused={focused} title="Liked" />,
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    headerShown: false,
                    title: 'Profile',
                    tabBarIcon: ({ focused }) => <TabIcon focused={focused} title="Profile" />,
                }}
            />
        </Tabs>
    );
};

export default HomeLayout;
