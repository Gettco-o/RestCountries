import { Component, OnInit } from '@angular/core';
import { SharedService } from './shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'rest-countries';

  darkMode!: boolean;

  constructor(private sharedService: SharedService) {

  }

  ngOnInit(): void {
      this.sharedService.getDarkMode().subscribe((darkMode: boolean) => {
        this.darkMode = darkMode;
      })
  }


  toggleDarkMode() {
    this.sharedService.setDarkMode(!this.darkMode);
  }
  
}
