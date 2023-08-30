import React, { useState, useEffect } from "react";
import { TypeListItem } from "./TypeListItem";
import { FlatList } from "react-native";
import { ListItemView } from "./ListItemView";
import { useYoutubeData } from "./useYoutubeData";
export const ListView: React.FC = ()=>{
    const {data, loadData, loadMoreData} = useYoutubeData(); 

    useEffect(()=>{
        loadData(); 
    }, [loadData]);

    return (
        <FlatList
            data = {data}
            renderItem={({item})=>
                <ListItemView item={item}></ListItemView>
            }
            onEndReached={loadMoreData}
            onEndReachedThreshold={0.1}
        />
    )

}