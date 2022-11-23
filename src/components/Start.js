import React, { useState } from "react";
import Button from './assets/Button';
import './css/Start.css';
import In from './In';


const Start = props => {
    const [transition, setTransition] = useState(false); // to check if the transition is done or not
    const [inputSymbol, setSymbol] = useState([]) // to store the input symbols
    const [states, setStates] = useState([]); // to store the states
    const onSubmitHandler = (event) => { // to handle the submit event
        event.preventDefault(); // to prevent the default behaviour of the submit button
    } // end of onSubmitHandler

    // function to add input symbol
    const getInput = (event) => { // to handle the change event
        let symbols = document.getElementById('inputSymbol').value.split(',') // to get the input symbols
        setSymbol(symbols); // to set the input symbols
        let inputStates = document.getElementById('states').value.split(','); // to get the states
        setStates(inputStates); // to set the states
        if (symbols.length > 1 && inputStates.length > 1) { // to check if the input symbols and states are not empty
            setTransition(true); // to set the transition to true
        } // end of if
    } // end of getInput

    // function to reset the input
    const reset = () => { // to handle the reset event
        setTransition(false); // to set the transition to false
        setSymbol([]); // to reset the input symbols
        setStates([]); // to reset the states
    } // end of reset

    return (
        <>
            <form className="form-holder" onSubmit={onSubmitHandler}>
                <label>Enter States</label>
                <input type="text" id="states" placeholder="Enter States (eg. q0, q1, q2,...)" ></input>
                <label>Enter Language</label>
                <input type="text" id="inputSymbol" placeholder="Enter Symbol (eg. 0, 1 or a, b) "></input>
                <div className="Button-content">
                    <Button success onClick={getInput}>Submit</Button>
                    <Button danger onClick={reset}>Reset</Button>
                </div>
            </form>
            {transition && <In row={states.length} col={inputSymbol.length} inputSymbol={inputSymbol} states={states} />}
        </>
    );
}

export default Start;