import React from 'react';
import PropTypes from 'prop-types';

export default function Link (props) {
    return (
        <div className="mj-link" style = {{lineHeight: "60px", height:"60px"}}>
            <a className="mj-url" href={props.url}><span className={`fas fa-fw ${props.icon}`}/>{props.title}</a>
        </div>
    );
}

Link.propTypes = {
    title: PropTypes.string,
    url: PropTypes.string,
    icon: PropTypes.string
};