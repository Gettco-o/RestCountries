import { Component, EventEmitter, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';

import { Country } from '../country';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  countries!: Country[];

  selectedCountry!: Country;

  darkMode!: boolean;

  private countriesSubscription!: Subscription;

  constructor(private sharedService: SharedService) { 
    
  }

  

  ngOnInit(): void {
      this.countriesSubscription = this.sharedService.getCountries()
      .subscribe((data: Country[]) => {
        this.countries = data;
      });

      this.sharedService.getDarkMode().subscribe((darkMode: boolean) => {
        this.darkMode = darkMode;
      })
  }

  selectCountry(country: Country) {
    this.selectedCountry = country
    this.sharedService.setSelectedCountry(this.selectedCountry)
  }

  getCountriesByRegion(region: string) {
    this.sharedService.getCountriesByRegion(region).subscribe((data: Country[]) => {
      this.countries = data;
    });
  }
  
  getCountriesByName(name: string) {
    this.sharedService.getCountriesByName(name).subscribe((data: Country[]) => {
      this.countries = data;
    });
  }

  ngOnDestroy(): void {
    if (this.countriesSubscription) this.countriesSubscription.unsubscribe();
  }
  
  
}
