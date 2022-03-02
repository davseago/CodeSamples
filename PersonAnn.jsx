import React from 'react';
import PropTypes from 'prop-types';
import './Anniversaries.css';

export default function PersonAnn (props) {
    function showDefaultImage (e) {
        e.target.src = 'http://internal.millerjohnson.com/DirectoryImages/person.gif';
    }

    const hired = new Date(props.hired);
    const anniv = new Date(props.anniversary);
    const years = anniv.getFullYear() - hired.getFullYear();
    const yearTxt = years === 1 ? "1 year" : years + " years";

    return years <= 0 ? null : (
        <div className="mj-ann-person">
            <div className="ann-person-img">
                <img src={'http://internal.millerjohnson.com/DirectoryImages/' + props.username + '.jpg'} onError={showDefaultImage} height="91px" width="76px"/>
            </div>
            <div className="ann-person-info">
                <div className="ann-person-name">{yearTxt} - {props.displayName}</div>
                <div className="ann-person-title">{props.title}</div>
            </div>
        </div>
    );
    
}

PersonAnn.propTypes = {
    hired: PropTypes.string,
    anniversary: PropTypes.string,
    username: PropTypes.string,
    displayName: PropTypes.string,
    title: PropTypes.string,
};