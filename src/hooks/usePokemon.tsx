import {useState} from 'react';
import {IPokeInfo} from '../interfaces/IPokeInfo';
import {PokemonService} from '../services/PokemonService';
import {INames, IPokeDetail} from '../interfaces/IPokeDetail';

export const usePokemon = () => {
  const [urlNext, setUrlNext] = useState('');
  const getPokemon = async (index: number) => {
    const url = 'https://pokeapi.co/api/v2/pokemon?limit=40';
    var data;
    if (index == 0) {
      data = await PokemonService.getPokemon(url);
    } else {
      data = await PokemonService.getPokemon(urlNext);
    }
    setUrlNext(data.next);
    const pokemon = data.results as IPokeInfo[];
    return pokemon;
  };
  function ExtractValues(obj: any): any {
    const values = [];

    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const value = obj[key];

        if (typeof value === 'object' && value !== null) {
          values.push(...ExtractValues(value));
        } else {
          if (value != null) values.push(value);
        }
      }
    }

    return values;
  }
  const getDetailPokemon = async (id: string) => {
    const url = 'https://pokeapi.co/api/v2/pokemon/' + id;
    const data = await PokemonService.getPokemon(url);
    var types: string[] = [];
    for (let type of data.types) {
      const type1 = await getLanguageDetailPokemon(type.type.url);

      types.push(type1 ?? '');
    }
    var abilities: string[] = [];
    for (let type of data.abilities) {
      const type1 = await getLanguageDetailPokemon(type.ability.url);
      abilities.push(type1 ?? '');
    }
    var moves: string[] = [];
    for (let type of data.moves) {
      const type1 = await getLanguageDetailPokemon(type.move.url);
      moves.push(type1 ?? '');
    }
    const pokemon = data as IPokeDetail;
    const sprites = ExtractValues(data.sprites);
    pokemon.types = types;
    pokemon.abilities = abilities;
    pokemon.moves = moves;
    pokemon.sprites = sprites;
    return pokemon;
  };

  const getLanguageDetailPokemon = async (url: string) => {
    const data = await PokemonService.getPokemon(url);
    var es = data as INames;
    const nameEs = es.names.find(e => e.language.name === 'es');
    return nameEs?.name;
  };
  return {getPokemon, getDetailPokemon};
};
