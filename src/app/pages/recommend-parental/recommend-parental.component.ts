import { Component, OnInit } from '@angular/core';
import { ResultsService } from 'src/app/services/results/results.service';
import { FFQResultsResponse } from 'src/app/models/ffqresultsresponse';
import {Observable} from 'rxjs';
import { Description } from 'src/app/models/ffqfooddescription';
import { FoodDescriptionService } from 'src/app/services/food-description/food-description.service';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-recommend-parental',
  templateUrl: './recommend-parental.component.html',
  styleUrls: ['./recommend-parental.component.css']
})
export class RecommendParentalComponent implements OnInit {

  showBracketFirst = false;
  showBracketSecond = false;
  showBracketThird = false;
  showNone = true;

  ageMessage = 'Please select infant age.';
  ageRange1 =  'for child 0 to 5.9 months';
  ageRange2 = 'for child 6 to 11.9 months';
  ageRange3 = 'for child 12 to 24 months';

  results: Description[] = [];

  // Used to get current day and time for when submitting
  today = new Date();

  // Used to get logged in person's name for when submitting
  loggedInUser = this.authenticationService.currentUserValue;
  username: string;

  // Used later when clinican has to GET username / times
  clinicianID

  constructor(
    public foodDescriptionService: FoodDescriptionService,
    private authenticationService: AuthenticationService,
    private translate: TranslateService  ) { }

  ngOnInit() {
    this.getAllResults();
  }
  public getAllResults() {
     const list: Observable<Description[]> = this.foodDescriptionService.getAllFoodItems();
     list.subscribe(m => {
       this.results = m;
     });
  }
  public showFirst() {
    this.showBracketFirst = true;
    this.showBracketSecond = false;
    this.showBracketThird = false;
    this.ageMessage = this.ageRange1;
    this.showNone = false;
  }
  public showSecond() {
    this.showBracketFirst = false;
    this.showBracketSecond = true;
    this.showBracketThird = false;
    this.ageMessage = this.ageRange2;
    this.showNone = false;
  }
  public showThird() {
    this.showBracketFirst = false;
    this.showBracketSecond = false;
    this.showBracketThird = true;
    this.ageMessage = this.ageRange3;
    this.showNone = false;
  }

  submitTime() {
    this.username = this.loggedInUser[0].username
    this.clinicianID = this.loggedInUser[0].assignedclinician

    console.log(this.username)
    console.log(this.clinicianID)
    console.log(this.today)
    if (this.translate.currentLang == "es") {
      alert("Presentado con éxito en " + this.today.toLocaleString("es"))      
    }
    else {
      alert("Sucessfully submitted at " + this.today.toLocaleString("en-US"))
    }
  }
}
