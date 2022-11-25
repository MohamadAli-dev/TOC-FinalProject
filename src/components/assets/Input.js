import React, { useReducer, useEffect } from 'react';
import { validate } from '../../util/validators';
import '../css/Input.css';

// Reducer function
const inputReducer = (state, action) => {
    switch (action.type) {
        case 'CHANGE': // if the action type is 'CHANGE'
            return { // return a new state object
                ...state, // with the old state object
                value: action.val, // and the new value
                isValid: validate(action.val, action.validators) // and the new isValid
            };
        case 'TOUCH': { // if the action type is 'TOUCH'
            return { // return a new state object
                ...state, // with the old state object
                isTouched: true // and the new isTouched
            }
        }
        default: // if the action type is not 'CHANGE' or 'TOUCH'
            return state; // return the old state object
    }
};

// Input component
const Input = props => {
    const [inputState, dispatch] = useReducer(inputReducer, {
        value: props.initialValue || '',
        isTouched: false,
        isValid: props.initialValid || false
    });

    const { id, onInput } = props;
    const { value, isValid } = inputState;

    // useEffect hook
    useEffect(() => {
        onInput(id, value, isValid)
    }, [id, value, isValid, onInput]);

    // onChange handler
    const changeHandler = event => {
        dispatch({
            type: 'CHANGE',
            val: event.target.value,
            validators: props.validators
        });
    };

    // onBlur handler
    const touchHandler = () => {
        dispatch({
            type: 'TOUCH'
        });
    };

    // JSX code for the Input component
    const element =
        props.element === 'input' ? (
            <input
                id={props.id}
                type={props.type}
                placeholder={props.placeholder}
                onChange={changeHandler}
                onBlur={touchHandler}
                value={inputState.value}
            />
        ) : (
            <textarea
                id={props.id}
                rows={props.rows || 3}
                onChange={changeHandler}
                onBlur={touchHandler}
                value={inputState.value}
            />
        );

    return (
        <div
            className={`form-control ${!inputState.isValid && inputState.isTouched &&
                'form-control--invalid'}`}
        >
            <label htmlFor={props.id}>{props.label}</label>
            {element}
            {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
        </div>
    );
};

export default Input;