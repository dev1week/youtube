import React, { useState, useEffect } from "react";
import { TypeListItem } from "./TypeListItem";
import { FlatList } from "react-native";
import { ListItemView } from "./ListItemView";
import { useYoutubeData } from "./useYoutubeData";
export const ListView: React.FC = ()=>{
    const {data, loadData} = useYoutubeData(); 

    useEffect(()=>{
        loadData(); 
    }, [loadData]);

    return (
        <FlatList
            data = {data}
            renderItem={({item})=>
                <ListItemView item={item}></ListItemView>
            }
        
        />
    )

}