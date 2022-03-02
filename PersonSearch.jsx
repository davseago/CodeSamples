import React from 'react';

export default class PersonSearch extends React.Component {
    showDefaultImage (e) {
        e.target.src = 'http://internal.millerjohnson.com/DirectoryImages/person.gif';
    }

    render () {
        return (
            <div className="search-person">
                <div className="search-person-img">
                    <img src={`http://internal.millerjohnson.com/DirectoryImages/${this.props.username}.jpg`} alt={`Picture of ${this.props.displayName}`} onError={this.showDefaultImage}/>
                </div>
                <div className="search-person-info">
                    <div className="search-person-name">{this.props.displayName}</div>
                    <div className="search-person-title">{this.props.title}</div>
                    <div className="search-person-email"><a href={`mailto:${this.props.email}`}>{this.props.email}</a></div>
                    <div className="search-person-phone">{this.props.phone}</div>
                </div>
            </div>
        );
    }
}