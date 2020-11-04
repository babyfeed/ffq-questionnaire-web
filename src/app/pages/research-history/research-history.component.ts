/*

  Added by Ver 2.0 group, edited by Javier Romero to make it look more consistent with the rest of the pages.
  This is the first page of the resarch portal (research/home).
  Here you can see a list of all the food items in the database.
  The admin can create, edit or delete food items in this page.

*/

import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { HttpClient, HttpHeaders } from "@angular/common/http";

// For getting results
import { ResultsService } from "src/app/services/results/results";
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { NutrientsRecommendationsService } from 'src/app/services/nutrients-recommendations/nutrients-recommendations.service';
import { FFQResultsResponse } from 'src/app/models/ffqresultsresponse';
import { NutrientConstants } from 'src/app/models/NutrientConstants';
import { Observable } from 'rxjs';
import { FoodRecommendationsService } from 'src/app/services/food-recommendation-service/food-recommendations.service';
import { ErrorDialogPopupComponent } from 'src/app/components/error-dialog-popup/error-dialog-popup.component';


@Component({
  selector: "research-history",
  templateUrl: "./research-history.component.html",
  styleUrls: ["./research-history.component.css"],
})
export class ResearchHistoryComponent implements OnInit {

  public show: boolean = false;
  public buttonName: any = "Results";

  MESSAGE = "No questionnaires have been submitted yet!";

  results: FFQResultsResponse[] = [];

  constructor(
    private errorDialog: MatDialog,
    private router: Router,
    private modalService: NgbModal,
    private http: HttpClient,
    private authenticationService: AuthenticationService,
    public resultsService: ResultsService,
    public foodRecommendationsService: FoodRecommendationsService,
    public nutrientsRecommendationsService: NutrientsRecommendationsService,

  ) {}

  toggle(index) {
    this.results[index].show = !this.results[index].show;
    if (this.results[index].show) this.buttonName = "Results";
    else this.buttonName = "Results";
  }

  ngOnInit() {
    this.getParticipantResult();
  }


  private getParticipantResult() {
    const oldList: Observable<FFQResultsResponse[]> = this.resultsService.getResultsByUserType("participant");
    const reqList: string[] = NutrientConstants.NUTRIENT_NAMES;

    oldList.subscribe(m => {

      m.forEach(element => {
       const newWeeklyMap = new Map<string, number>();
       const newDailyMap = new Map<string, number>();

       const weeklyMap = element.weeklyTotals;
       const dailyMap = element.dailyAverages;

       reqList.forEach(a =>  {
           newWeeklyMap.set(a, weeklyMap[a]);
           newDailyMap.set(a, dailyMap[a]);
       })

       element.weeklyTotals = newWeeklyMap;
       element.dailyAverages = newDailyMap;
       })

       console.log(m);
       this.results = m.reverse();
    }

   )
  }

 
}
