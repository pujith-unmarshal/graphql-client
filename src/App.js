import './App.css';
import React, {useEffect, useState} from 'react';
import {
    ApolloClient,
    InMemoryCache,
    gql
} from "@apollo/client";

const client = new ApolloClient({
    uri: '/query',
    cache: new InMemoryCache()
});


function App() {
    const [swaps, setSwaps] = useState();
    const [mints, setMints] = useState();

    function fetchSwaps() {
        client
            .query({
                query: gql`query Swaps($where: SwapsFilter){
                    swaps(where: $where){
                        id
                }}`,
                variables: {
                    where: {
                        id: "0x4362adec803f39956b05d67e3827bf332ade00640c54cb2c78f8db0f47fafaee-0"
                    }
                }
            })
            .then(result => setSwaps(result));
    }

    function fetchMints() {
        client
            .query({
                query: gql`query Mints($where: MintsFilter){
                    mints(where: $where) {
                            id
                }}`,
                variables: {
                    where: {
                        id: "0x1093b670a1fbf5d525ce300500fe71b83dc1854b192e566f1d3203d8f08e8787-0"
                    }
                }
            })
            .then(result => setMints(result));
    }

    useEffect(() => {
        fetchSwaps()
        fetchMints()
    }, []);

    return (
        <div className="App">
            <header className="App-header">
                <h1>Swap id:</h1> <p>{swaps?.data?.swaps[0]?.id}</p>
                <h1>Mint id:</h1> <p>{mints?.data?.mints[0]?.id}</p>
            </header>
        </div>
    );
}

export default App;
