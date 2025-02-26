import React from 'react';
import ShortUrlItem from './ShortUrlItem';

const ShortenUrlList = ({ urls }) => {


    // Return component JSX
    return (
        <div className="max-w-4xl mx-auto p-4">
            <h2 className="text-xl font-bold mb-4">Your Shortened URLs</h2>
            <div className="space-y-4">
                {urls.map((url) => (
                    <ShortUrlItem key={url.id} url={url} />
                ))}
            </div>
        </div>
    );
};

export default ShortenUrlList;