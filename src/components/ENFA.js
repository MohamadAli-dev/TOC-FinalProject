import React from 'react'
import DFA from './DFA';

const ENFA = (props) => {
    const dfa = []; // dfa transition table
    const final_states_of_dfa = []; // final states of dfa
    const isfinal = (new_state) => { // function to check if a state is final or not
        let f = false; // flag
        let n = props.states.length; // number of states
        let parsed_new_state = new_state.split(","); // to parse the new state

        for (let x of parsed_new_state) { // loop to check if any state of new state is final
            if (x === props.states[n - 1]) { // if any state is final
                f = true; // set the flag to true
            } // end of if
        } // end of for

        if (f) { // if any state is final
            final_states_of_dfa.push(new_state.replaceAll(",", "")); // push the new state to final states of dfa
        } // end of if
    }

    const find_transition = (nfa, col, src, closure, hash_of_states, state_map) => { // function to find the transition
        let n = nfa.length; // number of states
        let temp = new Array(n).fill(false); // to store the states
        let state_parse = src.split(","); // to parse the source state
        for (const x of state_parse) { // loop to check the transition of each state
            let parsed_nfa = nfa[hash_of_states[x]][col].split(","); // to parse the transition
            for (const y of parsed_nfa) { // loop to check the transition of each state
                if (y !== "-") { // if the transition is not null
                    temp[hash_of_states[y]] = true; // set the transition to true
                } // end of if
            } // end of for
        } // end of for

        let temp1 = new Array(n).fill(false); // to store the states
        for (let i = 0; i < n; i++) { // loop to check the closure of each state
            if (temp[i]) { // if the state is true
                let parsed_closure = closure[state_map[i]].split(","); // to parse the closure
                for (const y of parsed_closure) { // loop to check the closure of each state
                    temp1[hash_of_states[y]] = true; // set the closure to true
                } // end of for
            } // end of if
        } // end of for

        let ans = ""; // to store the transition
        for (let i = 0; i < n; i++) { // loop to check the transition of each state
            if (temp1[i]) { // if the state is true
                ans += state_map[i] + ","; // add the state to the transition
            } // end of if 
        } // end of for
        return ans.slice(0, -1); // return the transition
    } // end of find_transition

    const nfa_to_dfa = (closure, nfa, start, hash_of_states, state_map) => { // function to convert nfa to dfa
        const q = []; // to store the states
        q.push(start); // push the start state to the queue
        let seen = new Set(); // to store the seen states
        seen.add(start) // add the start state to the seen states
        let i = 0; // to iterate over the queue
        while (q.length !== 0) { // loop to check the queue is empty or not
            dfa[i] = []; // push the new state to the dfa transition table
            let front = q[0]; // to store the front of the queue
            isfinal(front); // check if the state is final or not
            dfa[i].push(front.replaceAll(",", "")); // push the state to the dfa transition table
            q.shift(1); // pop the front of the queue
            for (let j = 0; j < nfa[0].length - 1; j++) { // loop to check the transition of each state
                let option = find_transition(nfa, j, front, closure, hash_of_states, state_map); // to store the transition
                if (!option.length) { // if the transition is null
                    dfa[i].push("-"); // push the null to the dfa transition table
                } // end of if
                else { // if the transition is not null
                    dfa[i].push(option.replaceAll(",", "")); // push the transition to the dfa transition table
                } // end of else

                if (!seen.has(option) && option.length) { // if the transition is not seen and not null
                    q.push(option); // push the transition to the queue
                    seen.add(option); // add the transition to the seen states
                } // end of if
            } // end of for
            i++; // increment the iterator
        } // end of while
    } // end of nfa_to_dfa

    const dfs = (graph, src, visited) => { // function to perform dfs
        //DFS to find all reachable node from given node
        // console.log(src);
        visited[src] = true; // set the source to true
        for (const x of graph[src]) { // loop to check the transition of each state
            if (!visited[x]) { // if the transition is not visited
                dfs(graph, x, visited); // perform dfs
            } // end of if
        } // end of for
        return;
    } // end of dfs

    // function to find the closure of each state
    const find_closure = (graph, reachable_states, n) => { // function to find the closure
        for (let i = 0; i < n; i++) { //n=states
            const visited = new Array(n).fill(false); // to store the visited states

            dfs(graph, i, visited); // perform dfs

            reachable_states[i] = []; // push the new state to the reachable states
            for (let j = 0; j < n; j++) { // loop to check the transition of each state
                if (visited[j]) { // if the transition is visited
                    reachable_states[i].push(j); // push the transition to the reachable states
                } // end of if
            } // end of for
        } // end of for
    } // end of find_closure

    const store_closure = (reachable_states, state_map, closure) => { // function to store the closure
        for (let i = 0; i < reachable_states.length; i++) { // loop to check the transition of each state
            let clos = ""; // to store the closure
            for (const x of reachable_states[i]) { // loop to check the transition of each state
                clos += state_map[x] + ","; // add the transition to the closure
            } // end of for
            closure[state_map[i]] = clos.slice(0, -1); // store the closure
        } // end of for
    } // end of store_closure

    const closure = (nfa, hash_of_states, state_map) => { // function to find the closure
        const states = nfa.length; // number of states
        const inputSymbol = nfa[0].length; // number of input symbols
        const graph = []; // to store the graph
        ///Graph logic to find closure
        for (let i = 0; i < states; i++) { // loop to check the transition of each state
            graph[i] = []; // push the new state to the graph
            let s = ""; // to store the state
            for (let j = 0; j < nfa[i][inputSymbol - 1].length; j++) { // loop to check the transition of each state

                let x = nfa[i][inputSymbol - 1][j]; // to store the transition
                if (x === ",") { // if the transition is null
                    graph[i].push(hash_of_states[s]); // push the transition to the graph

                    s = ""; // set the state to null
                } // end of if
                else if (x === "-") { // if the transition is null
                    continue; // continue
                } // end of else if
                else { // if the transition is not null
                    s += x; // add the transition to the state
                } // end of else
            } // end of for
            if (s.length !== 0) { // if the state is not null
                graph[i].push(hash_of_states[s]); // push the state to the graph
            } // end of if
        } // end of for

        const reachable_state = []; // to store the reachable states
        const closure = new Map(); // to store the closure
        find_closure(graph, reachable_state, states); // find the closure
        store_closure(reachable_state, state_map, closure); // store the closure
        nfa_to_dfa(closure, nfa, closure[state_map[0]], hash_of_states, state_map); // convert nfa to dfa
    } // end of closure

    const hash_of_states = new Map(); // to store the hash of states
    props.states.map((val, i) => { // loop to check the transition of each state
        return hash_of_states[val] = i; // store the hash of states
    }) // end of map

    closure(props.nfa, hash_of_states, props.states); // find the closure

    return (
        <div>
            <DFA dfa={dfa} inputSymbol={props.inputSymbol} final_state={final_states_of_dfa} />
        </div>
    )
}

export default ENFA;