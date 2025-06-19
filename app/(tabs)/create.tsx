// app/(tabs)/CreateBlogScreen.tsx
import { useCreateBlogMutation } from '@/features/blog/blogApi';
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import { Alert, Button, Image, TextInput, View } from 'react-native';

export default function CreateBlogScreen() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [tag, setTag] = useState('');
    const [image, setImage] = useState(null);

    const [createBlog, { isLoading }] = useCreateBlogMutation();

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            quality: 0.7,
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
            const res = await createBlog(formData).unwrap();
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
        <View style={{ padding: 16 }}>
            <TextInput placeholder="Title" value={title} onChangeText={setTitle} style={{ borderWidth: 1, marginBottom: 8 }} />
            <TextInput placeholder="Tag" value={tag} onChangeText={setTag} style={{ borderWidth: 1, marginBottom: 8 }} />
            <TextInput
                placeholder="Content"
                value={content}
                onChangeText={setContent}
                multiline
                numberOfLines={4}
                style={{ borderWidth: 1, marginBottom: 8, textAlignVertical: 'top' }}
            />

            <Button title="Pick Image" onPress={pickImage} />
            {image && <Image source={{ uri: image.uri }} style={{ width: 100, height: 100, marginTop: 10 }} />}

            <Button title={isLoading ? 'Submitting...' : 'Create Blog'} onPress={handleSubmit} disabled={isLoading} />
        </View>
    );
}
