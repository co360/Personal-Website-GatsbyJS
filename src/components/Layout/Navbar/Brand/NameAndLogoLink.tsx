import React, { useState } from 'react';
import { Link } from 'gatsby';
import { ACTIVE_CLASS_NAME } from '../NavContents';
import NameAndLogo from './NameAndLogo';

const NameLink = () => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <Link 
            to="/" 
            getProps={isActive}
            onMouseEnter={() => setIsHovered(true)} 
            onMouseLeave={() => setIsHovered(false)}
        >
            <NameAndLogo isHovered={isHovered} />
        </Link>
    );
};

const isActive = ({ isCurrent }) => (
    isCurrent
        ? { className: ACTIVE_CLASS_NAME }
        : null
);

export default NameLink;