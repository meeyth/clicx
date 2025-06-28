// app/(tabs)/CreateOrEditBlogScreen.tsx
import { images } from '@/constants';
import { useCreateBlogMutation, useUpdateBlogMutation } from '@/features/blog/blogApi';
import * as ImagePicker from 'expo-image-picker';
import { useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import {
    Alert, Image, SafeAreaView, ScrollView,
    Text, TextInput, TouchableOpacity, View
} from 'react-native';

export default function CreateOrEditBlogScreen() {
    const router = useRouter();

    // mode: 'create' or 'edit'
    const { mode = 'create', blog, } = useLocalSearchParams();

    const [createBlog, { isLoading: isCreating }] = useCreateBlogMutation();
    const [updateBlog, { isLoading: isUpdating }] = useUpdateBlogMutation();

    console.log(mode);

    // Separate states as in your original code
    const [blogId, setBlogId] = useState(null);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [tag, setTag] = useState('');
    const [image, setImage] = useState(null);

    const resetForm = useCallback(() => {
        setBlogId(null);
        setTitle('');
        setContent('');
        setTag('');
        setImage(null);
    }, []);


    // Reset form whenever screen comes into focus
    useFocusEffect(
        useCallback(() => {
            // Always reset to initial state first
            setBlogId(null);
            setTitle('');
            setContent('');
            setTag('');
            setImage(null);

            // Then populate if in edit mode
            if (mode === 'edit' && blog) {
                try {
                    const parsed = JSON.parse(blog);
                    setBlogId(parsed._id);
                    setTitle(parsed.title || '');
                    setContent(parsed.content || '');
                    setTag(parsed.tag || '');
                    setImage({ uri: parsed.image });
                } catch (err) {
                    console.error('Invalid blog param:', err);
                }
            }

            return () => {
                // Optional cleanup if needed
            };
        }, [mode, blog]) // Reset whenever mode or blog changes
    );

    useEffect(() => {
        resetForm();
        if (mode === 'edit' && blog) {
            // Load edit data...
        }
    }, [mode, blog, resetForm]);

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0]);
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

        // if image already has uri, it's reused, else it's new
        formData.append('image', {
            uri: image.uri,
            name: 'blog-image.jpg',
            type: 'image/jpeg',
        });

        try {
            if (mode === 'edit') {
                formData.append('blogId', blogId);
                await updateBlog(formData).unwrap();
                Alert.alert('Success', 'Blog updated successfully!');
            } else {
                await createBlog(formData).unwrap();
                Alert.alert('Success', 'Blog created successfully!');
            }

            // Reset
            setTitle('');
            setContent('');
            setTag('');
            setImage(null);
            router.back();
        } catch (err) {
            console.error('Error:', JSON.stringify(err));
            Alert.alert('Error', 'Failed to submit blog');
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-white px-4">
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} contentContainerClassName="items-center">
                <View className="h-20 w-[90%] mt-[10%] px-2 self-center">
                    <Text className="font-pextrabold text-3xl">
                        {mode === 'edit' ? 'Edit Clicx' : 'Create Clicx'}
                    </Text>
                    <Image source={images.path} className="h-2 w-20" style={{ resizeMode: 'contain' }} />
                    <View className="bg-black-200 h-[0.1rem] w-full rounded-lg mt-2 opacity-35 mb-20" />
                </View>

                <View className="bg-white w-full max-w-sm rounded-2xl p-6 shadow-lg justify-center">
                    {/* Title */}
                    <View className="mb-3">
                        <Text className="text-sm text-gray-700 mb-1 font-pregular">Title</Text>
                        <TextInput
                            className="border border-gray-300 rounded-lg px-4 py-2 text-sm text-black font-pregular"
                            placeholder="Blog Title"
                            placeholderTextColor="#999"
                            value={title}
                            onChangeText={setTitle}
                        />
                    </View>

                    {/* Tag */}
                    <View className="mb-3">
                        <Text className="text-sm text-gray-700 mb-1 font-pregular">Tag</Text>
                        <TextInput
                            className="border border-gray-300 rounded-lg px-4 py-2 text-sm text-black font-pregular"
                            placeholder="e.g. mindfulness"
                            placeholderTextColor="#999"
                            value={tag}
                            onChangeText={setTag}
                        />
                    </View>

                    {/* Content */}
                    <View className="mb-3">
                        <Text className="text-sm text-gray-700 mb-1 font-pregular">Content</Text>
                        <TextInput
                            className="border border-gray-300 rounded-lg px-4 py-2 text-sm text-black h-32 text-top font-pregular"
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
                        className="bg-gray-100 rounded-lg py-3 items-center mb-3 font-pmedium"
                        onPress={pickImage}
                    >
                        <Text className="text-gray-800 font-pmedium">
                            {image ? 'Change Blog Image' : 'Pick Blog Image'}
                        </Text>
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
                        className={`bg-black rounded-lg py-3 items-center mb-3 ${isCreating || isUpdating ? 'opacity-60' : ''
                            }`}
                        onPress={handleSubmit}
                        disabled={isCreating || isUpdating}
                    >
                        <Text className="text-white font-semibold">
                            {isCreating || isUpdating
                                ? mode === 'edit' ? 'Updating...' : 'Creating...'
                                : mode === 'edit' ? 'Update Blog' : 'Create Blog'}
                        </Text>
                    </TouchableOpacity>


                    <TouchableOpacity
                        className={`bg-slate-200 rounded-lg py-3 items-center `}
                        onPress={() => {
                            router.replace({
                                pathname: '/(tabs)/create',
                                params: {
                                    mode: 'create',
                                }
                            });
                        }}
                    >
                        <Text className="text-black font-semibold">
                            Cancel
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
