import React, { useState } from "react";
import { TypeListItem } from "./TypeListItem";
import { FlatList } from "react-native";
import { ListItemView } from "./ListItemView";
export const ListView: React.FC = ()=>{
    const [list] = useState<TypeListItem[]>([
    {
        title: '타이틀',
        thumbnail: 'https://docs.expo.dev/static/images/tutorial/background-image.png',
        publishedAt: '2023-08-21',
        viewCount: 100,
        channelTitle: '채널 이름' 
    },
    {
        title: '타이틀',
        thumbnail: 'https://docs.expo.dev/static/images/tutorial/background-image.png',
        publishedAt: '2023-08-21',
        viewCount: 100,
        channelTitle: '채널 이름' 
    },
    {
        title: '타이틀',
        thumbnail: 'https://docs.expo.dev/static/images/tutorial/background-image.png',
        publishedAt: '2023-08-21',
        viewCount: 100,
        channelTitle: '채널 이름' 
    },
    ]);

    return (
        <FlatList
            data = {list}
            renderItem={({item})=>
                <ListItemView item={item}></ListItemView>
            }
        
        />
    )

}