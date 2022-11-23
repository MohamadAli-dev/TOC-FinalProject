import React from "react";
import { Table } from 'react-bootstrap';
import './css/DFA.css';
import { Graphviz } from 'graphviz-react';


const DFA = props => {

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
    </div>
}

export default DFA;