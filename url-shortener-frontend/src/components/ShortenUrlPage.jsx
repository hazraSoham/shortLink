import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Redirect from './Redirecting';

const ShortenUrlPage = () => {

    // fetches the dynamic slug of the url
    const { shortenedLink } = useParams();
    const [redirectUrl, setRedirectUrl] = useState('');

    // console.log('url -> ', shortenedLink);

    // whenever change redirect
    useEffect(() => {
        if(shortenedLink) {
            setRedirectUrl(import.meta.env.VITE_BACKEND_URL + `/${shortenedLink}`)
        }
    })

  return <Redirect redirectUrl={redirectUrl} redirectDelay={3}/>;
}

export default ShortenUrlPage