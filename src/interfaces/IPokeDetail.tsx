export interface IPokeDetail {
    types: string[];
    weight: number;
    abilities: string[];
    moves: string[];
    sprites: string[];
  }

 export interface INames {
    names: Name[];
  }
  interface Name {
    language: Language;
    name: string;
  }
  interface Language {
    name: string;
    url: string;
  }