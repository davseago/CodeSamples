import React from 'react';
import PropTypes from 'prop-types';

export default function DocumentLink (props) {
    return (
        <div className="mj-doclink">
            <a href={`iwl:dms=mjsciman&lib=mj_dms&num=${props.iwl}&ver=1&latest=1`}>
                <span className={`fas fa-fw ${props.icon}`} />{props.title}
            </a>
        </div>
    );
}

DocumentLink.propTypes = {
    title: PropTypes.string,
    iwl: PropTypes.string,
    icon: PropTypes.string
};