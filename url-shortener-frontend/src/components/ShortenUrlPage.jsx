import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Redirect from './Redirecting';

const ShortenUrlPage = () => {

    // fetches the dynamic slug of the url
    const { url } = useParams();
    const [redirectUrl, setRedirectUrl] = useState('');

    // whenever change redirect
    useEffect(() => {
        if(url) {
            setRedirectUrl(import.meta.env.VITE_BACKEND_URL + `/${url}`)
        }
    })

  return <Redirect redirectUrl={redirectUrl} redirectDelay={3}/>;
}

export default ShortenUrlPage