import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';

import { Country } from '../country';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  countries!: Country[];

  selectedCountry!: Country;

  darkMode!: boolean;

  searchKey: string = '';
  filterKey!: string;

  private countriesSubscription!: Subscription;

  constructor(private sharedService: SharedService, private router: Router) { 
    
  }

  

  ngOnInit(): void {
    if (this.sharedService.getSearchState()) {
      this.countries = this.sharedService.getSearchState().countries;
      this.searchKey = this.sharedService.getSearchState().keyword;
    }
    else if (this.sharedService.getFilterState()) {
      this.countries = this.sharedService.getFilterState().countries;
      this.filterKey = this.sharedService.getFilterState().keyword;
    }
    else {
      this.countriesSubscription = this.sharedService.getCountries()
      .subscribe((data: Country[]) => {
        this.countries = data;
      });
    }

    
    
    this.sharedService.getDarkMode().subscribe((darkMode: boolean) => {
      this.darkMode = darkMode;
    })
  }


  selectCountry(country: Country) {
    this.selectedCountry = country;
    this.sharedService.setSelectedCountry(this.selectedCountry);

    this.router.navigate([this.selectedCountry.name]);
  }

  getCountriesByRegion(region: string) {
    this.sharedService.getCountriesByRegion(region).subscribe((data: Country[]) => {
      this.countries = data;
      this.filterKey = region;
      this.sharedService.setFilterState(this.filterKey, this.countries);
    });
  }
  
  
  getCountriesByName(name: string) {
    this.sharedService.getCountriesByName(name).subscribe((data: Country[]) => {
      this.countries = data;
      this.searchKey = name;
      this.sharedService.setSearchState(this.searchKey, this.countries)
    });
  }

  ngOnDestroy(): void {
    if (this.countriesSubscription) this.countriesSubscription.unsubscribe();
  }
  
  
}
