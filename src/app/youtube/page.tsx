'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';

const VIDEO_URL = 'https://www.youtube.com/watch?v=wl8WWLM0Y7U';

function getVideoId(url: string) {
    const splitter = 'watch?v=';

    if (!url.includes(splitter)) {
        return null;
    }

    return url.split(splitter)[1];
}

export default function Youtube() {
    const [title, setTitle] = useState<string>('');
    const [formats, setFormats] = useState<unknown[]>([])
    const videoId = getVideoId(VIDEO_URL);


    useEffect(() => {
        axios.post('http://localhost:3003/youtube-video', {
            videoId
        })
        .then(function (response) {
            console.log(response.data.formats);
            setTitle(response.data.title);

            const { formats: fmt } = response.data;

            const mimeTypes = fmt.map(item => {
                return item.mimeType;
            })

            const validFormats = fmt.filter(item => {
                console.log('item', item);
                return item?.mimeType?.includes('video/mp4');
            })

            console.log('mimeTypes', mimeTypes);

            setFormats(validFormats);

        })
        .catch(function (error) {
            console.log(error);
        });
    }, [])

    return formats ? (
        <>
            <h1>{title}</h1>
            {formats.map((item) => {
                <h3>sfkdjfk</h3>
            })}
        </>
    ) : null;

}