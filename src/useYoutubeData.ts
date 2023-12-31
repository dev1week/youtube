import { useCallback, useState } from "react";
import { TypeListItem } from "./TypeListItem";
import axios from "axios";



const API_KEY ='';
const axiosInstance = axios.create({
    baseURL:'https://www.googleapis.com/youtube/v3',
})

type TypeVideoListResponse = {
    kind: 'youtube#videoListResponse';
    etag: string;
    nextPageToken: string;
    prevPageToken: string;
    pageInfo: {
      totalResults: number;
      resultsPerPage: number;
    };
    items: {
      kind: 'youtube#video';
      etag: string;
      id: string;
      snippet: {
        publishedAt: string;
        channelId: string;
        title: string;
        description: string;
        thumbnails: {
          [key: string]: {
            url: string;
            width: number;
            height: number;
          };
        };
        channelTitle: string;
        tags: string[];
        categoryId: string;
      };
      contentDetails: {
        duration: string;
        dimension: string;
        definition: string;
        caption: string;
        licensedContent: boolean;
        regionRestriction: {
          allowed: [string];
          blocked: [string];
        };
        contentRating: {
          mpaaRating: string;
          tvpgRating: string;
          bbfcRating: string;
          chvrsRating: string;
          eirinRating: string;
          cbfcRating: string;
          fmocRating: string;
          icaaRating: string;
          acbRating: string;
          oflcRating: string;
          fskRating: string;
          kmrbRating: string;
          djctqRating: string;
          russiaRating: string;
          rtcRating: string;
          ytRating: string;
        };
      };
      statistics: {
        viewCount: number;
        likeCount: number;
        dislikeCount: number;
        favoriteCount: number;
        commentCount: number;
      };
    }[];
  };



export const useYoutubeData = () =>{
    const [data, setData] = useState<TypeListItem[]> ([]);
    
    const [hasNextPage, setHasNextPage] = useState<boolean> (true); 
    const [nextPageCursor, setNextPageCursor] = useState<string|null>(null); 
    
    const loadData= useCallback(async () =>{
        
        try{
            const videoResults = await axiosInstance.get<TypeVideoListResponse>(
                '/videos',{
                    params:{
                        key: API_KEY,
                        part: 'snippet, contentDetails, statistics',
                        chart: 'mostPopular',
                        regionCode: 'KR',
                    }
                }
            )
            const videoData = videoResults.data;
            setData(
                videoData.items.map(item=>(
                    {
                        title:item.snippet.title, 
                        thumbnail:item.snippet.thumbnails.high.url, 
                        publishedAt:item.snippet.publishedAt, 
                        viewCount:item.statistics.viewCount,
                        channelTitle:item.snippet.channelTitle
                     })),
                );

                setHasNextPage(typeof videoData.nextPageToken !== 'undefined');
                setNextPageCursor(
                    typeof videoData.nextPageToken !== 'undefined'
                    ? videoData.nextPageToken
                    : null, 
                )
        }catch(ex){
            console.log(ex);
        }
    },[]);
    
    const loadMoreData = useCallback(async()=>{
        if(!hasNextPage) return; 
        try{
            const videoResults = await axiosInstance.get<TypeVideoListResponse>(
                '/videos',{
                    params:{
                        key: API_KEY,
                        part: 'snippet, contentDetails, statistics',
                        chart: 'mostPopular',
                        regionCode: 'KR',
                        //무한 페이지 구현시 추가해야하는 파라미터 
                        pageToken: nextPageCursor,
                    }
                }
            )
            const videoData = videoResults.data;
            setData(prevData =>
                prevData.concat(
                    videoData.items.map(item=>(
                        {
                            title:item.snippet.title, 
                            thumbnail:item.snippet.thumbnails.high.url, 
                            publishedAt:item.snippet.publishedAt, 
                            viewCount:item.statistics.viewCount,
                            channelTitle:item.snippet.channelTitle
                        })),
                    )
                );

                setHasNextPage(typeof videoData.nextPageToken !== 'undefined');
                setNextPageCursor(
                    typeof videoData.nextPageToken !== 'undefined'
                    ? videoData.nextPageToken
                    : null, 
                )
        }catch(ex){

        }
    },[hasNextPage, nextPageCursor])
    return {
        data, 
        loadData,
        loadMoreData, 
    }
}