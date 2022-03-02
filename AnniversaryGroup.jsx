import React from 'react';
import PersonAnn from './PersonAnn';
import './Anniversaries.css';


function notNewHire (person, index, array) {
    const hired = new Date(person.hireDate);
    const anniv = new Date(person.nextAnniversary);
    const years = anniv.getFullYear() - hired.getFullYear();
    return years > 0;
}

export default function AnniversaryGroup (props) {
    var dt = new Date(props.day);
    const dtOptions = { month: 'long', day: 'numeric' };

    return props.people.some(notNewHire) ? (
        <div className="mj-ann">
            <div className="mj-ann-date">{dt.toLocaleDateString('en-us', dtOptions)}</div>
            {
                props.people.map(person => {
                    return <PersonAnn username={person.accountName} displayName={person.displayName} title={person.title} department={person.department} hired={person.hireDate} anniversary={person.nextAnniversary} key={person.accountName} />;
                })
            }
        </div>
    ) : null;
}