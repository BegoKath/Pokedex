import { Api } from "./Api";

export class PokemonService {
    static getPokemon = async(url:string):Promise<any> => 
    {        
        return Api.get(url); 
    }
}