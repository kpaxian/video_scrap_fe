import axios from "axios";
import { v1 as uuidv1 } from 'uuid';


const SERVER_HOST = 'http://localhost:3003';


function videoDataProcessor(data: any) {
    console.log('data is', data)

    const { title, formats: formats } =  data;

    //get mp4 videos
    const mp4List = formats.filter((item) => {
        return item?.mimeType?.includes('video/mp4');
    })

    const filteredFormats = mp4List.map(item => {
        const { mimeType, quality, qualityLabel, url } = item;
        return {
            mimeType, quality, qualityLabel, url,
            key: uuidv1()
        }
    })

    return {
        title,
        formats: filteredFormats
    };
}


export async function getVideoData(videoId: string | null) {
    return axios.post(`${SERVER_HOST}/youtube-video`, {
        videoId
    })
    .then(function (response) {
        return videoDataProcessor(response.data);
    })
    .catch(function (error) {
        console.log(error);
    });
}

export async function downloadVideo(payload) {
    console.log('payload is', payload);
    return axios.post(`${SERVER_HOST}/download-video`, payload)
    .then(function (response) {
        return response.data;
    })
    .catch(function(error){
        console.log(error);
    })
}