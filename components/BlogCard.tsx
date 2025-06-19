import React from 'react';
import { Image, Text, View } from 'react-native';

const BlogCard = ({ item }) => {
    // console.log(item.image);
    return (
        <View style={{ padding: 16, borderBottomWidth: 1 }}>
            <Text style={{ fontSize: 16 }}>{item?.title}</Text>
            <Image
                source={{ uri: item?.image }}
                className="h-52 w-full"
            />
            <Text style={{ color: '#888' }}>{item?.content}</Text>
            <Text style={{ color: '#888' }}>{item?.owner?.username}</Text>
        </View>
    )
};

export default BlogCard