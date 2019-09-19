import React from 'react';
import Scrollspy from 'react-scrollspy';
import { Link } from 'gatsby';
import ScrollIndicator from './ScrollIndicator';

const Navbar = () => (
    <nav className="navbar navbar-fixed-top navbar-inverse" id="nav-parent">
        <ScrollIndicator />
        <div className="container-fluid">
            <div className="navbar-header">
                <button 
                    className="navbar-toggle" 
                    data-toggle="collapse" 
                    data-target="#nav-child" 
                    aria-label="Dropdown for navigation bar"
                >
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                </button>
            </div>

            <div>
                <div className="collapse navbar-collapse" id="nav-child">
                    <Scrollspy 
                        className="nav navbar-nav"
                        items={['about-me', 'education', 'projects', 'skills', 'contact']} 
                        currentClassName='active'
                    >
                        <li><Link className="anchor" to={'/blog-posts'} getProps={isPartiallyActive}>
                            <span className="fa fa-pencil"><span> Blog</span></span>
                        </Link></li>
                        <li><Link className="anchor" to={'/#about-me'}>About Me</Link></li>
                        <li><Link className="anchor" to={'/#education'}>Education</Link></li>
                        <li><Link className="anchor" to={'/#projects'}>Projects</Link></li>
                        <li><Link className="anchor" to={'/#skills'}>Skills</Link></li>
                        <li><Link className="anchor" to={'/#contact'}>Contact</Link></li>
                        <li><Link className="anchor" to={'/resume'} getProps={isPartiallyActive}>
                            <span className="fa fa-file-pdf-o"><span> Resume</span></span>
                        </Link></li>
                    </Scrollspy>
                </div>
            </div>
        </div>
    </nav>
);

const isPartiallyActive = ({isPartiallyCurrent}) => (
    isPartiallyCurrent
    ? { className: "active" }
    : null
);

export default Navbar;