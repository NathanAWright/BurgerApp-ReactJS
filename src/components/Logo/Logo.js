import React from 'react';
import burgerLogo from '../../assets/images/burger-logo.png';
import classes from './Logo.module.css';
/*
not using the logo import will work at run time but not during production since 
webpack doesn't import it by default when the files are compressed for hosting.
*/

const logo = props => {
    return (
        <div className={classes.Logo}>
            <img src={burgerLogo} alt="myBurger"/>
        </div>
    );
}

export default logo;