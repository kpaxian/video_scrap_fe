import { useQuery } from '@tanstack/react-query'

import { getVideoData } from './apiRequests';

interface Format {
    mimeType: string;
    key: string;
    qualityLabel: string;
    url: string;
}

type VideoDataResponse = {
    title: string;
    formats: Format[];
}

export function useVideoData(videoId: string | null): VideoDataResponse | object {
    const result  = useQuery({
        queryKey: ['youtube-video', videoId],
        queryFn: () => getVideoData(videoId)
    });

    console.log('result', result.data)

    return {
        ...result.data
    }
}
