import React, { useState } from 'react';
import './css/In.css'
import { Table } from 'react-bootstrap';
import Button from './assets/Button';
import NFA from './ENFA';


// function to create table
const In = (props) => { // props = {states, alphabet, start, final, nfa}
    const [final, setFinal] = useState(false) // to check if the final state is set or not
    const input = []; // to store the input
    const [nfa, setNfa] = useState([]); // to store the nfa
    let header = []; // to store the header of the table
    header.push(<th key="States">States</th>) // push the header of the table

    // function to create table header
    let temp = props.inputSymbol.map((symbol) => { // loop to create table header
        return <th key={symbol}>{symbol}</th> // return the table header
    }) // end of map

    header = [...header, ...temp]; // add the table header to the header of the table

    header.push(<th key={"epilson"} >Epsilon</ th>) // push the header of the table

    // function to create table body
    for (let i = 0; i < props.row; i++) { // loop to create table body
        let jsx = []; // to store the table body
        // function to create table data
        for (let j = 0; j < props.col + 2; j++) { // loop to create table data
            // function to create input field
            if (j === 0) { // if the table data is the first column
                jsx.push(<td key={(i + 1) * (j + 1)}>{props.states[i]}</td>) // push the table data to the table body
            } // end of if
            else { // if the table data is not the first column
                jsx.push(<td key={(i + 1) * (j + 1)}><input id={`row${i}col${j}`}></input></td>) // push the table data to the table body
            } // end of else
        } // end of for
        input.push(<tr key={i + 1}>{jsx}</tr>) // push the table body to the input
    } // end of for

    // function to get the input from the table
    const fetchInput = () => { // function to get the input from the table
        let arr = []; // to store the input from the table
        for (let i = 0; i < props.row; i++) { // loop to get the input from the table
            const temp = []; // to store the input from the table
            for (let j = 1; j < props.col + 2; j++) { // loop to get the input from the table
                temp.push(document.getElementById(`row${i}col${j}`).value); // push the input from the table to the temp
            } // end of for
            arr.push(temp); // push the temp to the arr
        } // end of for
        setNfa(arr); // set the nfa
        setFinal(true); // set the final state
    } // end of fetchInput

    return (
        <>
            <div className="table-content">
                <h2>ε-NFA TRANSITION TABLE:</h2>
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            {header}
                        </tr>
                    </thead>
                    <tbody>
                        {input}
                    </tbody>
                </Table>

            </div>
            <div className="mid-button">
                <Button inverse onClick={fetchInput}>Convert To DFA</Button>
            </div>
            <div className="dfa-container">
                {final &&
                    <NFA
                        text="hello"
                        inputSymbol={[...props.inputSymbol]}
                        states={props.states} nfa={nfa}
                    />}
            </div>
        </>
    )
}

export default In;