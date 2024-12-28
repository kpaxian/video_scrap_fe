'use client';

import { isEmpty } from 'lodash';

import { useVideoData } from '../utils/queryHooks';
import { useMutation } from '@tanstack/react-query';
import { downloadVideo } from '../utils/apiRequests';
import { Format } from '../utils/queryHooks';

const VIDEO_URL = 'https://www.youtube.com/watch?v=wl8WWLM0Y7U';

function getVideoId(url: string): string | null {
    const splitter = 'watch?v=';

    if (!url.includes(splitter)) {
        return null;
    }

    return url.split(splitter)[1];
};

const FormatsListItem = ({ item }: { item: Format }) => {
    const { mimeType, quality, qualityLabel } = item;
    const mutation = useMutation({
        mutationFn: downloadVideo
    })
    const buttonHandler = () => {
        mutation.mutate({ ...item });
    }
    return (
        <ul className="formats-list bg-zinc-900 p-2 my-2 rounded-md flex flex-row text-xs" key={item.key}>
            <li>{mimeType}</li>
            <li>{quality}</li>
            <li>{qualityLabel}</li>
            <li>
                <button
                    onClick={buttonHandler}
                >
                    Download
                </button>
            </li>
        </ul>
    )
}


const FormatsList = ({ formats }: {formats: Format[] | undefined}) => {
    if (isEmpty(formats)) return null;
    return formats?.map(item => <FormatsListItem key={item.key} item={item}/>)
}

export default function Youtube() {
    const videoId = getVideoId(VIDEO_URL);
    const { title, formats } = useVideoData(videoId);
    console.log('video data', {
        title, formats
    })

    return (
        <div>
            {title && (<h3>{title}</h3>)}
            <FormatsList formats={formats}/>
        </div>
    );

}