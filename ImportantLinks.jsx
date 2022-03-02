import React, { useState, useEffect } from 'react';
import Link from './Link';
import './ImportantLinks.css'

export default function ImportantLinks () {
    const endpoint = "http://internal.millerjohnson.com/_api/web/lists/getbytitle('Important Links')/items?$select=Title,URL,Icon";
    const [links, setLinks] = useState([]);

    function retrieveLinks () {
        fetch(endpoint, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            }
        }).then(r => r.json()).then(data => setLinks(data.value));
    }

    useEffect(() => { retrieveLinks(); }, []);
    
    
    
    //style={ styles.testheader }
    //TODO: create a good banner, maybe with a nav?
    return (
        <div className="link-banner">{links.map((e, i) => {
            return (<Link title={e.Title} url={e.URL.Url} icon={e.Icon} key={i} />);
        })}
        </div>
    );
}