import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Button.css';

const Button = props => {
    if (props.href) { // if the button is a link
        return (
            <a
                className={`button button--${props.size || 'default'} ${props.inverse &&
                    'button--inverse'} ${props.danger && 'button--danger'}  ${props.success && 'button-success'}`}
                href={props.href}
            >
                {props.children}
            </a>
        );
    }
    if (props.to) { // if the button is a link
        return (
            <Link
                to={props.to}
                exact={props.exact}
                className={`button button--${props.size || 'default'} ${props.inverse &&
                    'button--inverse'} ${props.danger && 'button--danger'} ${props.success && 'button-success'}`}
            >
                {props.children}
            </Link>
        );
    }
    return (

        <button
            className={`button button--${props.size || 'default'} ${props.inverse &&
                'button--inverse'} ${props.danger && 'button--danger'}  ${props.success && 'button-success'}`}
            type={props.type}
            onClick={props.onClick}
            disabled={props.disabled}
        >
            {props.children}
        </button>
    );
};

export default Button;