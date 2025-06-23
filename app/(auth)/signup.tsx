// app/(auth)/Register.tsx
import { useRegisterMutation } from '@/features/auth/authApi';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    Image,
    SafeAreaView,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

const Register = () => {
    const [fullname, setFullname] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [avatar, setAvatar] = useState(null);
    const [coverImage, setCoverImage] = useState(null);

    const [registerUser, { isLoading, isError, error }] = useRegisterMutation();

    const pickImage = async (setImage) => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ["images"],
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0]);
        }
    };

    const handleRegister = async () => {
        if (!avatar) {
            alert('Avatar is required');
            return;
        }

        const formData = new FormData();
        formData.append('fullname', fullname);
        formData.append('username', username);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('avatar', {
            uri: avatar.uri,
            type: 'image/jpeg',
            name: 'avatar.jpg',
        });

        if (coverImage) {
            formData.append('coverImage', {
                uri: coverImage.uri,
                type: 'image/jpeg',
                name: 'cover.jpg',
            });
        }

        try {
            await registerUser(formData).unwrap();
            router.replace('/(tabs)');
            // Navigate or perform post-registration logic
        } catch (err) {
            console.error('Registration failed:', err);
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-white px-4">
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} contentContainerClassName="items-center justify-center">
                <View className="bg-white w-full max-w-sm rounded-2xl p-6 shadow-lg">
                    <View className="items-center mb-4">
                        <View className="w-14 h-14 rounded-full bg-black mb-4 flex justify-center items-center">
                            <Text className="text-3xl text-white font-pextrabold" >C</Text>
                        </View>

                        <Text className="text-xl font-psemibold text-black">Join Clicx</Text>
                        <Text className="text-sm font-plight text-gray-500 text-center mt-1">Start your story telling journey.</Text>
                    </View>

                    {/* Full Name */}
                    <View className="mb-3">
                        <Text className="text-sm font-plight text-gray-700 mb-1">Full Name</Text>
                        <TextInput
                            className="border border-gray-300 rounded-lg px-4 py-2 text-sm font-plight text-black"
                            placeholder="John Doe"
                            placeholderTextColor="#999"
                            value={fullname}
                            onChangeText={setFullname}
                        />
                    </View>

                    {/* Username */}
                    <View className="mb-3">
                        <Text className="text-sm font-plight text-gray-700 mb-1">Username</Text>
                        <TextInput
                            className="border border-gray-300 rounded-lg px-4 py-2 text-sm font-plight text-black"
                            placeholder="johndoe"
                            placeholderTextColor="#999"
                            value={username}
                            onChangeText={setUsername}
                        />
                    </View>

                    {/* Email */}
                    <View className="mb-3">
                        <Text className="text-sm font-plight text-gray-700 mb-1">Email</Text>
                        <TextInput
                            className="border border-gray-300 rounded-lg px-4 py-2 text-sm font-plight text-black"
                            placeholder="john.doe@example.com"
                            placeholderTextColor="#999"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            value={email}
                            onChangeText={setEmail}
                        />
                    </View>

                    {/* Password */}
                    <View className="mb-3">
                        <Text className="text-sm font-plight text-gray-700 mb-1">Password</Text>
                        <TextInput
                            className="border border-gray-300 rounded-lg px-4 py-2 text-sm font-plight text-black"
                            placeholder="Enter your password"
                            placeholderTextColor="#999"
                            secureTextEntry
                            value={password}
                            onChangeText={setPassword}
                        />
                    </View>

                    {/* Avatar Picker */}
                    <TouchableOpacity
                        className="bg-gray-100 rounded-lg py-3 items-center mb-2"
                        onPress={() => pickImage(setAvatar)}
                    >
                        <Text className="text-gray-800 font-pmedium">Pick Avatar</Text>
                    </TouchableOpacity>
                    {avatar && (
                        <Image
                            source={{ uri: avatar.uri }}
                            className="w-24 h-24 rounded-full self-center mb-3"
                        />
                    )}

                    {/* Cover Image Picker */}
                    <TouchableOpacity
                        className="bg-gray-100 rounded-lg py-3 items-center mb-2"
                        onPress={() => pickImage(setCoverImage)}
                    >
                        <Text className="text-gray-800 font-pmedium">Pick Cover Image (optional)</Text>
                    </TouchableOpacity>
                    {coverImage && (
                        <Image
                            source={{ uri: coverImage.uri }}
                            className="w-full h-24 rounded-xl mb-3"
                            resizeMode="cover"
                        />
                    )}

                    {/* Error Message */}
                    {isError && (
                        <Text className="text-red-500 text-sm mb-2 font-pregular">
                            {"Something went wrong while registering"}
                        </Text>
                    )}

                    {/* Register Button */}
                    <TouchableOpacity
                        className={`bg-black rounded-lg py-3 items-center mb-4 ${isLoading ? 'opacity-60' : ''
                            }`}
                        onPress={handleRegister}
                        disabled={isLoading}
                    >
                        <Text className="text-white font-psemibold ">
                            {isLoading ? 'Registering...' : 'Register'}
                        </Text>
                    </TouchableOpacity>

                    <Text className="text-center text-sm text-gray-600 font-pregular">
                        Already have an account?
                        <TouchableOpacity onPress={() => router.replace("/(auth)")}>
                            <Text className="text-blue-600 font-plight">Login</Text>
                        </TouchableOpacity>
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Register;
