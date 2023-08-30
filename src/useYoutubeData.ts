import { useCallback, useState } from "react";
import { TypeListItem } from "./TypeListItem";


export const useYoutubeData = () =>{
    const [data] = useState<TypeListItem[]> ([]);

    const loadData= useCallback(async () =>{

    }, []);

    return {
        data, 
        loadData
    }
}