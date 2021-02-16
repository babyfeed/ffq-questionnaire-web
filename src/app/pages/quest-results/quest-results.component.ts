import { Component, OnInit } from "@angular/core";
import { ResultsService } from "src/app/services/results/results.service";
import { FFQResultsResponse } from "src/app/models/ffqresultsresponse";
import {Observable} from 'rxjs';
import { NutrientConstants } from 'src/app/models/NutrientConstants';


/////////// added imports from recommend.component.ts/////////////////////
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RecommendModalComponent } from 'src/app/components/recommend-modal/recommend-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { NutrientsRecommendationsService } from 'src/app/services/nutrients-recommendations/nutrients-recommendations.service';
import { ErrorDialogPopupComponent } from 'src/app/components/error-dialog-popup/error-dialog-popup.component';
import { Router } from '@angular/router';
import { FoodRecommendModalComponent } from 'src/app/components/food-recommend-modal/food-recommend-modal.component';
import { FoodRecommendationsService } from 'src/app/services/food-recommendation-service/food-recommendations.service';
import { FoodDescriptionService } from 'src/app/services/food-description/food-description.service';
import {DeletePopupComponent} from '../../components/delete-popup/delete-popup.component';

// Questionnaire reesults page added by Daykel Muro 09/30/2019
@Component({
  selector: 'app-quest-results',
  templateUrl: './quest-results.component.html',
  styleUrls: ['./quest-results.component.css']
})
export class QuestResultsComponent implements OnInit {
  public show = false;
  public showFeedback = false;

  results: FFQResultsResponse[] = [];
  questionnaireId: string;

  constructor(public resultsService: ResultsService, ////////////////////////////////////////
              public nutrientsRecommendationsService: NutrientsRecommendationsService,
              public foodRecommendationsService: FoodRecommendationsService,
              public foodDescriptionService: FoodDescriptionService,
              private modalService: NgbModal,
              private errorDialog: MatDialog,
              private router: Router) {}
  userAttributes: FFQResultsResponse[];
  toDelete: Observable<FFQResultsResponse[]>;
  dataLoaded: Promise<boolean>;

  ngOnInit() {
    this.getAllResults();
  }

  // (Khalid)Changed below code to sort the list in the nutient view page
  private getAllResults() {

    this.resultsService.getAllResults().subscribe(data => {
      this.userAttributes = data;
    });
    this.dataLoaded = Promise.resolve(true);
    const oldList: Observable<FFQResultsResponse[]> = this.resultsService.getAllResults();
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
       });

       element.weeklyTotals = newWeeklyMap;
       element.dailyAverages = newDailyMap;
       });

      this.results = m.reverse();
    }

   );

 }
  deleteQuestionnaire(questionnaireId: string){
    for (let item of this.userAttributes) {
      if (item.questionnaireId == questionnaireId)
      {
        const confirmDelete = this.modalService.open(DeletePopupComponent);
        confirmDelete.componentInstance.service = 'Questionnaire';
        confirmDelete.componentInstance.attributes = item;
        break;
      }
    }
  }

  private returnZero(){
    return 0;
  }

  toggle(index) {
    this.results[index].show = !this.results[index].show;
  }
  /////////////////////////////////////////////////////////////////////////////////
  // (Francis) attempting to add Nutrients and Food Items buttons from recommend tab
  //            copy/pasted from recommend.component.ts
  /////////////////////////////////////////////////////////////////////////////////

  private getNutrientsRecommendations(questionnaireId: string) {
    this.nutrientsRecommendationsService.getNutrientsRecommendationsByQuestionnaireId(questionnaireId).subscribe(
      data => {
        this.onModalRequest(questionnaireId);
      },
      error => {
        const dialogRef = this.errorDialog.open(ErrorDialogPopupComponent);
        dialogRef.componentInstance.title = error.error.message;
        dialogRef.componentInstance.router = this.router;
      }
    );
  }

  private getFoodRecommendations(questionnaireId: string) {
    this.foodRecommendationsService.getFoodRecommendationsByQuestionnaireId(questionnaireId).subscribe(
      data => {
        this.onModalRequestFood(questionnaireId);
      },
      error => {
        const dialogRef = this.errorDialog.open(ErrorDialogPopupComponent);
        dialogRef.componentInstance.title = error.error.message;
        dialogRef.componentInstance.router = this.router;
      }
    );
  }

  onModalRequest(id: string): void {
    const modalRef = this.errorDialog.open(RecommendModalComponent);
    modalRef.componentInstance.id = id;
  }

  onModalRequestFood(id: string): void {
    const modalRef = this.errorDialog.open(FoodRecommendModalComponent);
    modalRef.componentInstance.id = id;
  }


}
