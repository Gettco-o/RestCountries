import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Country } from './country';
import { BehaviorSubject, Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

    private countries!: Observable<Country[]>

    private selectedCountry!: Country|undefined;

    private darkMode = new BehaviorSubject<boolean>(true);

    constructor(private http: HttpClient) {}

    setDarkMode(value: boolean) {
        this.darkMode.next(value)
    }

    getDarkMode() {
        return this.darkMode.asObservable();
    }

    getCountries(): Observable<Country[]> {
        this.countries =  this.http
        .get<Country[]>("./assets/data.json");
        return this.countries
    }

    getCountriesByRegion(region: string): Observable<Country[]> {
        return this.countries.pipe( // this.countries since getbyregion is only used on the homepage which already initializes the getcountries request
            map((countries: Country[]) => countries.filter(country => country.region.toLowerCase() === region.toLowerCase()))
          );
    }

    getCountriesByName(name: string): Observable<Country[]> {
        return this.countries.pipe( //this.getCountries will make the requests again to make the page accessible without the homepage
            map((countries: Country[]) => countries.filter(country => country.name.toLowerCase().includes(name.trim().toLowerCase())))
          );
    }

    getCountryByName(name: string): Observable<Country|undefined> {
        return this.getCountries().pipe(
          map((countries: Country[]) => countries.find(country => country.name.toLowerCase() === name.toLowerCase()))
        );
      }

    getCountryNameByCode(code: string): Observable<string|undefined> {
        return this.getCountries().pipe(
            map((countries: Country[]) => {
                const country = countries.find(country => country.alpha3Code === code);
                return country?.name;
            })
        );
    }

    setSelectedCountry(country: Country) {
        this.selectedCountry = country;
    }

    getSelectedCountry() {
        return this.selectedCountry;
    }
}
