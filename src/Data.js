import { GraphQLClient, gql } from "graphql-request";

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

    const client = new GraphQLClient(endpoint);
    const data = await client.request(query, variables);
    console.log(data);
    // return data;
}

