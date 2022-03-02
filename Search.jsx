import React, { useState } from 'react';
import PersonSearch from './PersonSearch';
import { useQuery, gql } from '@apollo/client';
import './Search.css'

const SEARCH_QUERY = gql`
    query SearchQuery($filter: String!) {
        search(filter: $filter) {
            accountName,
            displayName,
            title,
            phoneNumber,
            faxNumber,
            email
        }
    }
`;

export default function Search() {
    const [filter, setFilter] = useState('xxxx');
    const { data, error, loading } = useQuery(SEARCH_QUERY, { variables: { filter } });
    let content;
    let sFilter;

    if (data !== undefined && data.search !== undefined && data.search !== null) {
        if (loading) { content = <p>Searching...</p>; }
        if (error) { content = <p>An error occurred. Please try again.</p>; }
        if (data.search.length === 0 && filter !== 'xxxx') { content = <p>Nobody found.</p>; }
        if (filter === '') { content = <p/>; }

        if (content === undefined) {
            content = data.search.map((person, index) => {
                return <PersonSearch key={index} username={person.accountName} displayName={person.displayName} title={person.title} email={person.email} phone={person.phoneNumber} fax={person.faxNumber} />;
            });
        }
    }

    return (
        <div> Find Someone
            <div id="search">
                <input type="text" id="searchFilter" onChange={(event) => { sFilter = event.target.value; }} onKeyDown={(event) => { if (event.key === 'Enter') { setFilter(sFilter); } }} placeholder="Enter a name"/>
                <button className="search-button" id="search-button" type="button" onClick={(event) => {setFilter(sFilter);}} value={filter}><i className="fa fa-search"/></button>
            </div>
            <div id="results">
                {content}
            </div>
        </div>
    );
};