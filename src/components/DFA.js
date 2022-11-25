import React, { useState } from "react";
import { Table } from 'react-bootstrap';
import { Graphviz } from 'graphviz-react';
import './css/DFA.css';
import { FiTrash2 } from 'react-icons/fi';

const DFA = props => {
    const [input, setInput] = useState('')

    let dotStr = "digraph fsm {\n"; // digraph is a graphviz keyword
    dotStr += "rankdir=LR;\n"; // Left to right
    dotStr += 'size="8,5";\n'; // Size of the graph
    if (props.final_state.length !== 0) {
        dotStr += "node [shape = doublecircle]; " + props.final_state + ";\n"; // Accepting states
    }
    dotStr += "node [shape = point]; INITIAL_STATE\n"; // invisible node
    dotStr += "node [shape = circle];\n"; // visible nodes
    dotStr += "INITIAL_STATE -> " + props.dfa[0][0] + ";\n"; // initial state

    let header = []; // table header
    header.push(<th key="State">States</th>) // first column of table header
    let temp = props.inputSymbol.map((symbol) => { // remaining columns of table header
        return <th key={symbol + 999}>{symbol}</th> // key is used to avoid duplicate keys
    })

    header = [...header, ...temp]; // merging two arrays

    let body = []; // table body
    for (let i = 0; i < props.dfa.length; i++) { // loop to create table body
        let jsx = []; // table data
        for (let j = 0; j < props.dfa[0].length; j++) { // loop to create table data
            jsx.push(<td key={`dfa${(i + 1) * (j + 1)}`}>{props.dfa[i][j]}</td>) // key is used to avoid duplicate keys
            if (j > 0) { // to avoid the first column
                dotStr += ` 
                    ${props.dfa[i][0]} 
                     ->  
                    ${props.dfa[i][j] === "-" ? "Trap" : props.dfa[i][j]} 
                     [label= 
                    ${props.inputSymbol[j - 1]} 
                    ];\n`;
            } // creating edges
        } // end of inner loop
        body.push(<tr key={i + 1}>{jsx}</tr>) // key is used to avoid duplicate keys
    }
    dotStr += "}"; // graphviz keyword

    //check if string is accepted by designed machine
    const checkString = () => {
        let currentState = props.dfa[0][0];
        let inputString = input;
        let inputArray = inputString.split('');
        let flag = false;
        for (let i = 0; i < inputArray.length; i++) {
            let index = props.inputSymbol.indexOf(inputArray[i]);
            if (index === -1) {
                alert("Invalid Input");
                return;
            }
            currentState = props.dfa[props.dfa.findIndex((state) => state[0] === currentState)][index + 1];
            if (currentState === "-") {
                flag = false;
                break;
            }
            else {
                flag = true;
            }
        }
        if (flag) {
            if (props.final_state.includes(currentState)) {
                alert("Accepted");
            }
            else {
                alert("Rejected");
            }
        }
        else {
            alert("Rejected");
        }
    }

    // to handle input change
    const clearInput = () => {
        let inputStr = document.getElementById("inputString");
        inputStr.value = "";
        setInput('')
    }




    return <div className="dfa-content">
        <h2>DFA Transition Table:</h2>
        <Table striped bordered hover responsive style={{ marginBottom: '50px' }}>
            <thead>
                <tr>
                    {header}
                </tr>
            </thead>
            <tbody>
                {body}
            </tbody>
        </Table>
        <h1>DFA TRANSITION DIAGRAM:</h1>
        <div className="dfa-transition-diagram">
            <Graphviz dot={`${dotStr}`} />
        </div>
        <div className="checkSection">
            <label className="mr-5">Check Input: </label>
            <input id="inputString" type="text" onChange={(e) => setInput(e.target.value)} />
            <div className="buttons">
                <button id="check" className="button-check btn-success" onClick={() => checkString(input)}>Check</button>
                <button id="clear" className="button-clear btn-danger" onClick={clearInput}><FiTrash2 /></button>
            </div>
        </div>
    </div>
}

export default DFA;