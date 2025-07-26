import { useRequestOtpMutation } from '@/features/auth/authApi';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native';


const GetOTPScreen = () => {
    const [email, setEmail] = useState('');

    const [requestOtp, { isLoading }] = useRequestOtpMutation();

    const router = useRouter();


    const handleOTPReq = async () => {
        try {
            await requestOtp({ email, }).unwrap();
            router.replace({
                pathname: '/(auth)/resetpass',
                params: { email }
            });
        } catch (err) {
            console.error('OTP error:', err);
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-white items-center justify-center px-4">
            <View className="bg-white w-full max-w-sm rounded-2xl p-6 shadow-lg">
                {/* Logo and Heading */}
                <View className="items-center mb-6">
                    <View className="w-14 h-14 rounded-full bg-black mb-4 flex justify-center items-center">
                        <Text className="text-3xl text-white font-pextrabold" >C</Text>
                    </View>
                    <Text className="text-xl font-psemibold text-black">Reset Password.</Text>
                    <Text className="text-sm font-plight  text-gray-500 mt-1 text-center">
                        Each experience, a story worth sharing.
                    </Text>
                </View>


                {/* Email */}
                <View className="mb-3">
                    <Text className="text-sm font-plight text-gray-700 mb-1">Email Address</Text>
                    <TextInput
                        className="border font-plight border-gray-300 rounded-lg px-4 py-2 text-sm text-black"
                        placeholder="john.doe@gmail.com"
                        placeholderTextColor="#999"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        value={email}
                        onChangeText={setEmail}
                    />
                </View>



                {/* Send OTP Button */}
                <TouchableOpacity
                    className={`bg-black rounded-lg py-3 items-center mb-4 ${isLoading ? 'opacity-60' : ''
                        }`}

                    onPress={handleOTPReq}
                    disabled={isLoading}
                >
                    <Text className="text-white font-psemibold">
                        {isLoading ? 'Sending OTP...' : 'Send OTP'}
                    </Text>
                </TouchableOpacity>

            </View>
        </SafeAreaView>
    );
};

export default GetOTPScreen;
