import React from 'react';
import classes from './NavigationItem.module.css';
import {NavLink} from 'react-router-dom';

const navigationItem = props=>{
    return (
        
            <li className={classes.NavigationItem}>
                <NavLink
                    activeClassName={classes.active}
                    exact={props.exact}
                    to={props.link}
                >
                    {props.children}
                </NavLink>
                {/* <a href={props.link} className={props.active ? classes.active : null}>{props.children}</a> */}
            </li>
    );
}

export default navigationItem;