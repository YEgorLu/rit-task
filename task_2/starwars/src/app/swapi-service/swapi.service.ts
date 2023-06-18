import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {PersonDTO} from "./interfaces/response/personDTO";
import {ListDTO} from "./interfaces/response/listDTO";
import {PlanetDTO} from "./interfaces/response/planetDTO";
import {Planet} from "./interfaces/planet";
import {BirthDateStandard, Person} from "./interfaces/person";

@Injectable({
  providedIn: 'root'
})
export class SwapiService {
  private baseURL: string = 'https://swapi.dev/api/'

  constructor(private http: HttpClient) {
  }

  getPersonById(id: number): Observable<Person> {
    return this.http
      .get<PersonDTO>(`${this.baseURL}people/${id}`)
      .pipe(
        map((value) => this.toPerson(value))
      )
  }

  getPersonByUrl(url: string): Observable<Person> {
    return this.http
      .get<PersonDTO>(url)
      .pipe(
        map((value) => this.toPerson(value))
      )
  }

  getPeople(): Observable<ListDTO<Person>> {
    return this.http
      .get<ListDTO<PersonDTO>>(`${this.baseURL}people`)
      .pipe(
        map<ListDTO<PersonDTO>, ListDTO<Person>>((value) => this.listTo(value, this.toPerson))
      )
  }

  getPlanets(page: number = 1, planetName?: string): Observable<ListDTO<Planet>> {
    let url = `${this.baseURL}planets?page=${page}`;
    if (planetName){
      url += `&search=${planetName}`
    }
    return this.http
      .get<ListDTO<PlanetDTO>>(url)
      .pipe(
        map<ListDTO<PlanetDTO>, ListDTO<Planet>>((value) => this.listTo(value, this.toPlanet.bind(this)))
      )
  }

  getPlanetById(id: number): Observable<Planet> {
    return this.http
      .get<PlanetDTO>(`${this.baseURL}planets/${id}`)
      .pipe(
        map<PlanetDTO, Planet>((value) => this.toPlanet(value))
      )
  }

  private listTo<TFrom, TTo>(listDTO: ListDTO<TFrom>, transform: (dto: TFrom) => TTo): ListDTO<TTo> {
    return {
      ...listDTO,
      results: listDTO.results.map(transform)
    }
  }

  private toPlanet(planetDTO: PlanetDTO): Planet {
    return {
      ...planetDTO,
      climate: planetDTO.climate.split(','),
      terrain: planetDTO.terrain.split(','),
      gravity: Number(planetDTO.gravity.split(' ')[0]),
      id: this.getIdFromUrl(planetDTO.url)
    }
  }

  private toPerson(personDTO: PersonDTO): Person {
    const years = Number(personDTO.birth_year.slice(0, personDTO.birth_year.length-3))
    const standard = personDTO.birth_year.slice(personDTO.birth_year.length-3)

    const person: Person = {
      ...personDTO,
      birth: {
        years: years,
        standard: BirthDateStandard[standard as keyof typeof BirthDateStandard]
      }
    }

    Object.entries(person).forEach(([k, v]) => {
      if (v === 'unknown' || v === 'n\\a' || v === 'n/a') {
        person[k] = 'неизвестен'
      }
      if (v === 'none'){
        person[k] = 'нет'
      }
    })

    return person;
  }

  private getIdFromUrl(url: string): number {
    const items = url.split('/');
    return Number(items[items.length - 2]);
  }
}
