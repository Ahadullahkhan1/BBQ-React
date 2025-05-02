import React from 'react';
import './NotFound.css';

const NotFound = () => {
    return (
        <div className="notfound-container">
            <div className="number">404</div>
            <div className="text">
                <span>Ooops...</span>
                <br />
                page not found
            </div>
            <a
                className="me"
                href="/"
            >
                Back to Home
            </a>
        </div>
    );
};

export default NotFound;
