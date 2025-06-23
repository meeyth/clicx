// app/(tabs)/CreateBlogScreen.tsx
import { useCreateBlogMutation } from '@/features/blog/blogApi';
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import {
    Alert,
    Image,
    SafeAreaView,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

export default function CreateBlogScreen() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [tag, setTag] = useState('');
    const [image, setImage] = useState(null);

    const [createBlog, { isLoading }] = useCreateBlogMutation();

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0]);
            console.log(result.assets[0]);
        }
    };

    const handleSubmit = async () => {
        if (!title || !content || !image) {
            Alert.alert('Validation', 'Title, content, and image are required');
            return;
        }

        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        formData.append('tag', tag);
        formData.append('image', {
            uri: image.uri,
            name: 'blog-image.jpeg',
            type: 'image/jpeg',
        });

        try {
            await createBlog(formData).unwrap();
            Alert.alert('Success', 'Blog created successfully!');
            setTitle('');
            setContent('');
            setTag('');
            setImage(null);
        } catch (err) {
            console.error('Error creating blog:', JSON.stringify(err));
            Alert.alert('Error', 'Failed to create blog');
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-white px-4">
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} contentContainerClassName="items-center justify-center">
                <View className="bg-white w-full max-w-sm rounded-2xl p-6 shadow-lg">
                    <View className="items-center mb-4">
                        <Text className="text-xl font-semibold text-black">Create Clicx</Text>
                        <Text className="text-sm text-gray-500 text-center mt-1">
                            Share your thoughts with the world
                        </Text>
                    </View>

                    {/* Title */}
                    <View className="mb-3">
                        <Text className="text-sm text-gray-700 mb-1">Title</Text>
                        <TextInput
                            className="border border-gray-300 rounded-lg px-4 py-2 text-sm text-black"
                            placeholder="Blog Title"
                            placeholderTextColor="#999"
                            value={title}
                            onChangeText={setTitle}
                        />
                    </View>

                    {/* Tag */}
                    <View className="mb-3">
                        <Text className="text-sm text-gray-700 mb-1">Tag</Text>
                        <TextInput
                            className="border border-gray-300 rounded-lg px-4 py-2 text-sm text-black"
                            placeholder="e.g. mindfulness"
                            placeholderTextColor="#999"
                            value={tag}
                            onChangeText={setTag}
                        />
                    </View>

                    {/* Content */}
                    <View className="mb-3">
                        <Text className="text-sm text-gray-700 mb-1">Content</Text>
                        <TextInput
                            className="border border-gray-300 rounded-lg px-4 py-2 text-sm text-black h-32 text-top"
                            placeholder="Write your blog content here..."
                            placeholderTextColor="#999"
                            value={content}
                            onChangeText={setContent}
                            multiline
                            textAlignVertical="top"
                        />
                    </View>

                    {/* Pick Image Button */}
                    <TouchableOpacity
                        className="bg-gray-100 rounded-lg py-3 items-center mb-3"
                        onPress={pickImage}
                    >
                        <Text className="text-gray-800 font-medium">Pick Blog Image</Text>
                    </TouchableOpacity>

                    {/* Preview */}
                    {image && (
                        <Image
                            source={{ uri: image.uri }}
                            className="w-full h-32 rounded-lg mb-3"
                            resizeMode="cover"
                        />
                    )}

                    {/* Submit Button */}
                    <TouchableOpacity
                        className={`bg-black rounded-lg py-3 items-center ${isLoading ? 'opacity-60' : ''
                            }`}
                        onPress={handleSubmit}
                        disabled={isLoading}
                    >
                        <Text className="text-white font-semibold">
                            {isLoading ? 'Submitting...' : 'Create Blog'}
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
