import React, { useEffect, useState } from 'react';
import { gql, useLazyQuery } from '@apollo/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import './WorkAreas.css';
//import { fa } from '@fortawesome/free-regular-svg-icons';

library.add(fas);

const GET_GROUPS = gql`
  query getGroups($username: String!) {
    groups(name: $username) {
      groupName
    }
  }
`;

export default function WorkAreas () {
  const [areas, setAreas] = useState({});
  const [getGroups, { loading, error, data }] = useLazyQuery(GET_GROUPS);

  const hasAccess = (workArea, groups) => {
    const areaGroups = workArea.Groups.split(', ');
    return areaGroups.some(a => groups.includes(a));
  }

  useEffect(() => {
    fetch("http://internal.millerjohnson.com/_api/web/lists/GetByTitle('WorkAreas')/items?$select=Title,URL,Icon,Groups", {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Accept': 'application/json;odata=verbose',
        'Content-type': 'application/json;odata=verbose'
      }
    }).then((response) => response.json()).then((data) => setAreas(data.d.results));
  }, []);

  useEffect(() => {
    fetch('http://internal.millerjohnson.com/_api/SP.UserProfiles.PeopleManager/GetMyProperties?$select=AccountName', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Accept': 'application/json;odata=verbose',
        'Content-type': 'application/json;odata=verbose'
      }
    }).then((response) => response.json()).then((json) => getGroups({variables: {username: json.d.AccountName.replace('MJSC\\', '')} }));
  }, []);
  
  if(loading) { return <p>Loading...</p>; }
  if(error) { return <p>Error...</p> }  
  if(!data || !data.groups || !areas) { return null; }

  const groupList = data.groups.map(g => g.groupName).join('|');
  //console.log(areas.filter(a => hasAccess(a, groupList)).map((area, i)));
  return (
    <div className="mj-areas"> 
    <h2> Your Work Areas </h2>
    <div className="mj-areas-grid">
      {
        areas.filter(a => hasAccess(a, groupList)).map((area, i) => (<div className = "mj-area" key={i}>
            <a href={area.URL.Url} style={{color: "#000000", textAlign:"center"}}>
                <FontAwesomeIcon icon={area.Icon.substring(area.Icon.indexOf("-") + 1)} className = "area-icon" size="6x"/>
            </a>
            <span className="area-caption">{area.Title}</span>
            
            
        </div>))
        
      }
    </div>
    </div>
  );
}
