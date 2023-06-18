import {PersonDTO} from "./response/personDTO";

export interface Person {

  birth: {
    years: number,
    standard: string;
  };
  eye_color: string;
  films: string[];
  gender: string;
  hair_color: string;
  height: number;
  homeworld: string;
  mass: number;
  name: string;
  skin_color: string;
  created: Date;
  edited: Date;
  species: string[];
  starships: string[];
  url: string;
  vehicles: string[];

  [n: string]: any
}

export enum BirthDateStandard {
  BBY = 'До битвы при Явине',
  ABY = 'Полсе битвы при Явине'
}
