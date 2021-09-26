import { request, gql } from "graphql-request";

export default async function GetPokemonsData() {

    const endpoint = 'https://dex-server.herokuapp.com/';

    const query = gql`
    query ExampleQuery($allPokemonLimit: Int) {
        allPokemon(limit: $allPokemonLimit) {
        id
        name
        types {
            name
        }
        sprites {
            front_default
        }
        }
    }
    `;

    const variables = {
        allPokemonLimit: 10,
    }

    return await request(endpoint, query, variables);
}

