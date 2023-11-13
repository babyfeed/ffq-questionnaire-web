import {Component,OnInit,ViewChild,AfterViewInit} from '@angular/core';
import {ResultsService} from 'src/app/services/results/results.service';
import {FFQResultsResponse} from 'src/app/models/ffqresultsresponse';
import {Observable} from 'rxjs';
import {NutrientConstants} from 'src/app/models/NutrientConstants';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {RecommendModalComponent} from 'src/app/components/recommend-modal/recommend-modal.component';
import {MatDialog} from '@angular/material/dialog';
import {NutrientsRecommendationsService} from 'src/app/services/nutrients-recommendations/nutrients-recommendations.service';
import {ErrorDialogPopupComponent} from 'src/app/components/error-dialog-popup/error-dialog-popup.component';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import {FoodRecommendModalComponent} from 'src/app/components/food-recommend-modal/food-recommend-modal.component';
import {FoodRecommendationsService} from 'src/app/services/food-recommendation-service/food-recommendations.service';
import {FoodDescriptionService} from 'src/app/services/food-description/food-description.service';
import {DeletePopupComponent} from '../../components/delete-popup/delete-popup.component';
import {ExportService} from '../../services/export/export-service';
import {FFQFoodRecommendations} from '../../models/ffqfood-recommendations';
import {FFQClinic} from '../../models/ffqclinic';
import {ClinicService} from 'src/app/services/clinic/clinic-service';
import {FFQParent} from '../../models/ffqparent';
import {ParentService} from '../../services/parent/parent-service';
import {FFQParentResponse} from '../../models/ffqparent-response';
import {FfqParticipant} from '../../models/ffq-participant';
import {ParticipantService} from '../../services/participant/participant-service';
import {FFQResearchInstitution} from '../../models/ffq-research-institution';
import {ResearchInstitutionService} from '../../services/research-institution-service/research-institution-service';
import {FFQClinicResponse} from '../../models/ffqclinic-response';
import {FFQInstitution} from '../../models/ffqinstitution';
import { DQISService } from 'src/app/services/dqis-service/dqis.service';
import { FFQDQIS } from 'src/app/models/ffqdqis';
import { DQISModalComponent } from 'src/app/components/dqis-modal/dqis-modal.component';
import { FFQChildren } from "src/app/models/ffqchildren";
import { FFQChildData } from "src/app/models/ffq-childData";
import { AuthenticationService } from "../../services/authentication/authentication.service";
import { BOYS_BMI_FOR_AGE_BIRTH_TO_TWO_YEARS_METRIC_SYSTEM } from "../../../assets/growth-charts-data/who/boys/metric system/bmi/BOYS_BMI_FOR_AGE_BIRTH_TO_TWO_YEARS_METRIC_SYSTEM";
import { ThemePalette } from "@angular/material/core";
import { ProgressSpinnerMode } from "@angular/material/progress-spinner";
//boys/metric system
import { NgForm, NgModel } from "@angular/forms";
import { GrowthChartsHelpComponent } from "src/app/components/growth-charts-help/growth-charts-help.component";
import { InterpretationGrowthChartsDialogComponent } from "src/app/components/interpretation-growth-charts-dialog/interpretation-growth-charts-dialog.component";

//height - age
import { BOYS_HEIGHT_FOR_AGE_BIRTH_TO_TWO_YEARS_METRIC_SYSTEM } from "../../../assets/growth-charts-data/who/boys/metric system/height - age/BOYS_HEIGHT_FOR_AGE_BIRTH_TO_TWO_YEARS_METRIC_SYSTEM";

//weight - age
import { BOYS_WEIGHT_FOR_AGE_BIRTH_TO_TWO_YEARS_METRIC_SYSTEM } from "../../../assets/growth-charts-data/who/boys/metric system/weight - age/BOYS_WEIGHT_FOR_AGE_BIRTH_TO_TWO_YEARS_METRIC_SYSTEM";
import html2canvas from "html2canvas";

//weight - height
import { BOYS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_METRIC_SYSTEM } from "../../../assets/growth-charts-data/who/boys/metric system/weight - height/BOYS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_METRIC_SYSTEM";
import { TranslateService } from "@ngx-translate/core";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
//girls/bmi

//bmi
import { GIRLS_BMI_FOR_AGE_BIRTH_TO_TWO_YEARS_METRIC_SYSTEM } from "../../../assets/growth-charts-data/who/girls/metric system/bmi/GIRLS_BMI_FOR_AGE_BIRTH_TO_TWO_YEARS_METRIC_SYSTEM";

//girls/metric system

//height - age
import { GIRLS_HEIGHT_FOR_AGE_BIRTH_TO_TWO_YEARS_METRIC_SYSTEM } from "../../../assets/growth-charts-data/who/girls/metric system/height - age/GIRLS_HEIGHT_FOR_AGE_BIRTH_TO_TWO_YEARS_METRIC_SYSTEM";

//weight - age
import { GIRLS_WEIGHT_FOR_AGE_BIRTH_TO_TWO_YEARS_METRIC_SYSTEM } from "../../../assets/growth-charts-data/who/girls/metric system/weight - age/GIRLS_WEIGHT_FOR_AGE_BIRTH_TO_TWO_YEARS_METRIC_SYSTEM";

//weight - height
import { GIRLS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_METRIC_SYSTEM } from "../../../assets/growth-charts-data/who/girls/metric system/weight - height/GIRLS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_METRIC_SYSTEM";

//boys/mixed

//weight - height - mixed: kg_vs_in
import { BOYS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_MIXED_SYSTEM_KG_VS_IN } from "src/assets/growth-charts-data/who/boys/mixed/BOYS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_MIXED_SYSTEM_KG_VS_IN";

//weight - height - mixed: lb_vs_cm
import { BOYS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_MIXED_SYSTEM_LB_VS_CM } from "src/assets/growth-charts-data/who/boys/mixed/BOYS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_MIXED_SYSTEM_LB_VS_CM";

//boys/us customary system

//height - age
import { BOYS_HEIGHT_FOR_AGE_BIRTH_TO_TWO_YEARS_US_CUSTOMARY_SYSTEM } from "src/assets/growth-charts-data/who/boys/US customary system/height - age/BOYS_HEIGHT_FOR_AGE_BIRTH_TO_TWO_YEARS_US_CUSTOMARY_SYSTEM";

//weight - age
import { BOYS_WEIGHT_FOR_AGE_BIRTH_TO_TWO_YEARS_US_CUSTOMARY_SYSTEM } from "src/assets/growth-charts-data/who/boys/US customary system/weight - age/BOYS_WEIGHT_FOR_AGE_BIRTH_TO_TWO_YEARS_US_CUSTOMARY_SYSTEM";

//weight - height
import { BOYS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_US_CUSTOMARY_SYSTEM } from "src/assets/growth-charts-data/who/boys/US customary system/weight - height/BOYS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_US_CUSTOMARY_SYSTEM";

//girls/mixed

//weight - height - mixed: kg_vs_in
import { GIRLS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_MIXED_SYSTEM_KG_VS_IN } from "src/assets/growth-charts-data/who/girls/mixed/GIRLS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_MIXED_SYSTEM_KG_VS_IN";

//weight - height - mixed: lb_vs_cm
import { GIRLS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_MIXED_SYSTEM_LB_VS_CM } from "src/assets/growth-charts-data/who/girls/mixed/GIRLS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_MIXED_SYSTEM_LB_VS_CM";

//girls/us customary system

//height - age
import { GIRLS_HEIGHT_FOR_AGE_BIRTH_TO_TWO_YEARS_US_CUSTOMARY_SYSTEM } from "src/assets/growth-charts-data/who/girls/US customary system/height - age/GIRLS_HEIGHT_FOR_AGE_BIRTH_TO_TWO_YEARS_US_CUSTOMARY_SYSTEM";

//weight - age
import { GIRLS_WEIGHT_FOR_AGE_BIRTH_TO_TWO_YEARS_US_CUSTOMARY_SYSTEM } from "src/assets/growth-charts-data/who/girls/US customary system/weight - age/GIRLS_WEIGHT_FOR_AGE_BIRTH_TO_TWO_YEARS_US_CUSTOMARY_SYSTEM";

//weight - height
import { GIRLS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_US_CUSTOMARY_SYSTEM } from "src/assets/growth-charts-data/who/girls/US customary system/weight - height/GIRLS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_US_CUSTOMARY_SYSTEM";

import 'apexcharts';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexFill,
  ApexStroke,
  ApexYAxis,
  ApexGrid,
  ApexTooltip,
  ApexMarkers,
  ApexXAxis,
  ApexLegend,
  ApexTitleSubtitle,
  ApexAnnotations
} from "ng-apexcharts";


export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis | ApexYAxis[];
  grid: ApexGrid;
  labels: string[];
  stroke: ApexStroke;
  markers: ApexMarkers;
  fill: ApexFill;
  tooltip: ApexTooltip;
  legend: ApexLegend;
  title: ApexTitleSubtitle;
  annotations: ApexAnnotations;
};





// import { GrowthChartsPageComponent } from '../growth-charts-page/growth-charts-page.component';
import {
  UnitsOfMeasurement,
  Gender,
  ChartOption,
  GrowthChartData,
} from "src/app/models/Enums";


@Component({
  selector: 'app-growth',
  templateUrl: './adminresults.component.html',
  styleUrls: ['./adminresults.component.css']
})

export class AdminresultsComponent implements OnInit{

  public show = false;
  public showFeedback = false;
  breastMilkFlag = [];
  results: FFQResultsResponse[] = [];
  parentResults: FFQResultsResponse[] = [];
  // to be deleted below

  dude:any;

  // to be uncommented below
  // currentParent: FfqParticipant;

  // to be uncommented above

  currentParent: FFQParentResponse;

  childrenList: FFQChildren[] = [];

  // currentChildName: string = "";

  // childInfo: FFQParent[] = [];

  // to be deleted above
  childrenPerParentList: [] = [];
  parentList : ParentService;
  parentResultsByClinicId: FFQResultsResponse[] = [];
  participantResults: FFQResultsResponse[] = [];
  participantResultsByClinicId: FFQResultsResponse[] = [];
  questionnaireId: string;
  showParent = false;
  bySite = true;
  byClinic = true;
  showParticipant = false;
  selectedClinic: string;
  selectedSite: string;
  public ffqclinicList$: Observable<FFQClinic[]>;
  public ffqSiteList$: Observable<FFQResearchInstitution[]>;
  clinicId: string;
  public ffqparentList: FFQParent[] = [];
  public ffqParticipantList: FfqParticipant[] = [];
  showByClinic = true;
  showBySite = true;
  private clinic = [];
  private site = [];
  clinicAttributes: FFQClinic;
  siteAttributes: FFQInstitution;
  id: string;
  userId: string;
  username: string;
  userpassword: string;
  usertype: string;
  firstname: string;
  lastname: string;
  assignedclinic: string;
  assignedclinician: string;
  childrennames: any;
  isactive: boolean;
  prefix: string;
  assignedClinicOrSiteId: string;
  // Used to keep track of when parent last read recommend
  lastReadRecommend: string;
  timesOfReading: number;
  children: FFQChildren[];
  tally_num:number = 0;


  constructor(public resultsService: ResultsService,
              public nutrientsRecommendationsService: NutrientsRecommendationsService,
              public foodRecommendationsService: FoodRecommendationsService,
              public dqisService: DQISService,
              public parentService: ParentService,
              private participantService: ParticipantService,
              public foodDescriptionService: FoodDescriptionService,
              private modalService: NgbModal,
              public clinicService: ClinicService,
              public researchInstitutionService: ResearchInstitutionService,
              private errorDialog: MatDialog,
              private router: Router,
              private exportService: ExportService,
              private authenticationService: AuthenticationService,
              private dialog: MatDialog,
              private translate: TranslateService

              // public ffqparentresponse : FFQParentResponse,

  ) {
    this.ffqclinicList$ = this.clinicService.getAllClinics();
    this.ffqSiteList$ = this.researchInstitutionService.getAllResearchInstitutions();
    Object.assign(this, {
      /*
      BOYS_BMI_FOR_AGE_BIRTH_TO_TWO_YEARS_METRIC_SYSTEM,
      BOYS_HEIGHT_FOR_AGE_BIRTH_TO_TWO_YEARS_METRIC_SYSTEM,
      BOYS_HEIGHT_FOR_AGE_BIRTH_TO_TWO_YEARS_US_CUSTOMARY_SYSTEM,
      BOYS_WEIGHT_FOR_AGE_BIRTH_TO_TWO_YEARS_METRIC_SYSTEM,
      BOYS_WEIGHT_FOR_AGE_BIRTH_TO_TWO_YEARS_US_CUSTOMARY_SYSTEM,
      */
      BOYS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_METRIC_SYSTEM,
      BOYS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_US_CUSTOMARY_SYSTEM,
       /*
      BOYS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_MIXED_SYSTEM_KG_VS_IN,
      BOYS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_MIXED_SYSTEM_LB_VS_CM,
      */

      /*
      GIRLS_BMI_FOR_AGE_BIRTH_TO_TWO_YEARS_METRIC_SYSTEM,
      GIRLS_HEIGHT_FOR_AGE_BIRTH_TO_TWO_YEARS_METRIC_SYSTEM,
      GIRLS_HEIGHT_FOR_AGE_BIRTH_TO_TWO_YEARS_US_CUSTOMARY_SYSTEM,
      GIRLS_WEIGHT_FOR_AGE_BIRTH_TO_TWO_YEARS_METRIC_SYSTEM,
      GIRLS_WEIGHT_FOR_AGE_BIRTH_TO_TWO_YEARS_US_CUSTOMARY_SYSTEM,
      */
      GIRLS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_METRIC_SYSTEM,
      GIRLS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_US_CUSTOMARY_SYSTEM,
      /*
      GIRLS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_MIXED_SYSTEM_KG_VS_IN,
      GIRLS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_MIXED_SYSTEM_LB_VS_CM,
      */
    });

    this.currentParent = new FFQParentResponse(
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      [] as string[],
      true,
      "",
      "",
      0,
      [] as FFQChildren[]
    );

    this.currentChild = new FFQChildren("", [] as FFQChildData[]);

    this.chartOptions = {//empty chart
      series: [],
      chart: {
        height: 0,
        width: 0,
        type: "line"
      },
      grid: {
        show: false
      },
      stroke: {
        show: false
      }
    };


  }





  ngOnInit() {
    const parentList: Observable<FFQParentResponse[]> = this.parentService.getAllParents();
    parentList.subscribe(a => {
      this.ffqparentList = a;
    });

    const participantList: Observable<FfqParticipant[]> = this.participantService.getAllParticipants();
    participantList.subscribe(a => {
      this.ffqParticipantList = a;
    });

    this.getAllResults();

    const parent: Observable<FFQParentResponse> = this.parentService.getParent(
      this.authenticationService.currentUserId
    );
    parent.subscribe((parent) => {
      this.currentParent = parent;
    });


    }


  private getAllResults() {
    const oldList: Observable<FFQResultsResponse[]> = this.resultsService.getAllResults();
    const reqList: string[] = NutrientConstants.NUTRIENT_NAMES;

    oldList.subscribe(m => {

        m.forEach(element => {

          if (element.userChoices.length > 0) {
            if (element.userChoices[0].name === 'Breast milk') {
              this.breastMilkFlag.push(element.questionnaireId);
            }
          }
          const newWeeklyMap = new Map<string, number>();
          const newDailyMap = new Map<string, number>();
          const weeklyMap = element.weeklyTotals;
          const dailyMap = element.dailyAverages;

          reqList.forEach(a => {
            if (dailyMap[a]) {
              newDailyMap.set(a, dailyMap[a]);
            }
            else {
              newDailyMap.set(a, 0);
            }
            if (weeklyMap[a]) {
              newWeeklyMap.set(a, weeklyMap[a]);
            }
            else {
              newWeeklyMap.set(a, 0);
            }

          });

          element.weeklyTotals = newWeeklyMap;
          element.dailyAverages = newDailyMap;
        });

        this.results = m.reverse();
        this.parentResults = this.results.filter(t => t.userType === 'parent').map(result => ({
          ...result,
          username: this.getParentUsernameById(result.userId)
        }));
        this.participantResults = this.results.filter(t => t.userType === 'participant');
        this.setFoodList();
      }
    );


  }

  sortByClinic(event: any) {
    this.clinic.push(this.clinicService.getClinic(event.value).subscribe(data => {
      this.clinicAttributes = data;
    }));

    // manually adding assignedClinicOrSite id field to result since it doesn't get added when parent takes ffq
    for (let i = 0; i <= this.ffqparentList.length - 1; i++) {
      for (let j = 0; j <= this.parentResults.length - 1; j++) {
        if (this.parentResults[j].userId === this.ffqparentList[i].userId) {
          this.parentResults[j].assignedClinicOrSiteId = this.ffqparentList[i].assignedclinic;
        }
      }
    }
    this.parentResultsByClinicId = this.parentResults.filter(t => t.assignedClinicOrSiteId === event.value);

    const matSelect: any = event.source;
    matSelect.writeValue(null);
  }

  sortBySite(event: any) {
    this.site.push(this.researchInstitutionService.getResearchInstitution(event.value).subscribe(data => {
      this.siteAttributes = data;
    }));

    for (let i = 0; i <= this.ffqParticipantList.length - 1; i++) {
      for (let j = 0; j <= this.participantResults.length - 1; j++) {
        if (this.participantResults[j].userId === this.ffqParticipantList[i].userId) {
          this.participantResults[j].assignedClinicOrSiteId = this.ffqParticipantList[i].assignedResearcherInst;
        }
      }
    }
    this.participantResultsByClinicId = this.participantResults.filter(t => t.assignedClinicOrSiteId === event.value);

    const matSelect: any = event.source;
    matSelect.writeValue(null);
  }

  setShowByParticipant(bool:boolean):void {
    this.showParticipant = true;
  }

  deleteQuestionnaire(questionnaireId: string) {
    for (const item of this.results) {
      if (item.questionnaireId === questionnaireId) {
        const confirmDelete = this.modalService.open(DeletePopupComponent);
        confirmDelete.componentInstance.service = 'Questionnaire';
        confirmDelete.componentInstance.attributes = item;
        break;
      }
    }
  }

  private returnZero() {
    return 0;
  }

  toggleParentResults(index) {
    this.parentResults[index].show = !this.parentResults[index].show;
  }

  toggleParticipantResults(index) {
    this.participantResults[index].show = !this.participantResults[index].show;
  }

  searchResults: string;

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
  private getDQIS(questionnaireId: string) {
    this.dqisService.getDQISByQuestionnaireId(questionnaireId).subscribe(
      data => {
        this.onModalRequestDQIS(questionnaireId);
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
    console.log('this.breastMilkFlag');
    const modalRef = this.errorDialog.open(FoodRecommendModalComponent, {
      // the FoodRecommendModalComponent is independent component, in order to access the data which I can only get in current component,
      // pass the data by this method
      data: this.breastMilkFlag
    });
    modalRef.componentInstance.id = id;
  }
  onModalRequestDQIS(id: string): void {
    console.log('this.breastMilkFlag');
    const modalRef = this.errorDialog.open(DQISModalComponent, {
      // the FoodRecommendModalComponent is independent component, in order to access the data which I can only get in current component,
      // pass the data by this method
      data: this.breastMilkFlag
    });
    modalRef.componentInstance.id = id;
  }

  ALLIDS = [];

  ALLDATES = [];

  ALLAGES = [];

  ALLWEIGHTS = [];

  ALLLENGTHS = [];

  ALLGENDERS = [];

  percentileCalculator20(height:number,weight:number,gender:string) : string {

    let percentileData = BOYS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_METRIC_SYSTEM;

    let percentileDataTwo = GIRLS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_METRIC_SYSTEM;

    let minimumDifference = 1000000;

    let percentileToReturn = "";

      // console.log("this.currentChildGender: "+this.currentChildGender);

      switch(gender) {

        case "male":

          for(let i = 0; i < 11; i++) {

            // console.log("Another time?");
            // console.log("percentileData[i].data: "+percentileData[i].data);

            for(let j = 0; j < percentileData[i].data.length; j++) {

            //   console.log("percentileData[i].data[j][0]: ",percentileData[i].data[j][0]);
            // console.log("height: "+height);
            // console.log("weight: "+weight);
            // console.log("percentileData[i].data[j][1]: "+percentileData[i].data[j][1]);


              if(percentileData[i].data[j][0] == height) {
                  if(Math.abs(weight-percentileData[i].data[j][1]) < minimumDifference) {
                    minimumDifference = Math.abs(weight-percentileData[i].data[j][1]);
                    percentileToReturn = percentileData[i].name;
                  }
              }

            }

        }

          break;

        case "female":

          for(let i = 0; i < 11; i++) {

              for(let j = 0; j < percentileDataTwo[i].data.length; j++) {

                if(percentileData[i].data[j][0] == height) {
                    if(Math.abs(weight-percentileDataTwo[i].data[j][1]) < minimumDifference) {
                    minimumDifference = Math.abs(weight-percentileData[i].data[j][1]);
                    percentileToReturn = percentileData[i].name;
                    }
                }

              }

          }

          break;


    }

      return percentileToReturn;

  }

  ALLGENDERSPARENT = [];

  ALLGENDERSPARTICIPANT = [];

  returnable = [];

  loadAllData() {

    this.ALLGENDERSPARENT = this.getAllGenders(this.parentResults);

    this.ALLGENDERSPARTICIPANT = this.getAllGenders(this.participantResults);

    console.log("This went here");

    console.log("this.ALLGENDERSPARENT: ",this.ALLGENDERSPARENT);

    let j = 0;

    let z = 0;

    let index = 0;

    // let returnable = [];

  console.log("this.ffqparentList.length: ",this.ffqparentList.length);

    for(let parent of this.ffqparentList) {

      for(let a of this.create(this.ffqparentList,j)) {

        for(let dog of this.createArray(a)) {

          console.log("a[z].childData[0].age: ",a[z].childData[0].age);

          const pushable = {
            ID:this.ffqparentList[j].userId,
            Date:this.checker(this.ffqparentList[j].username,a[z].childData[0].age,this.parentResults),
            "Infant age (months)": a[z].childData[0].age,
            "Infant weight (kg)": a[z].childData[0].weight,
            "Infant length (cm)":a[z].childData[0].height,
            Percentile: this.percentileCalculator20(a[z].childData[0].height,a[z].childData[0].weight,this.ALLGENDERSPARENT[index++])
          }

          this.returnable.push(pushable);
          z++;

          // this.ALLIDS[index] = this.ffqparentList[j].userId;

          // this.ALLDATES[index] = this.checker(this.ffqparentList[j].username,a[z].childData[0].age,parentResults);
          // this.ALLAGES[index] = a[z].childData[0].age;
          // this.ALLWEIGHTS[index] = a[z].childData[0].weight;
          // this.ALLLENGTHS[index] = a[z].childData[0].height;



        }

        z = 0;



      }

      j++;

    }

    console.log("this.returnable: ",this.returnable);

  }


  exportAllAnotherAttempt() {

    this.exportService.exportingAllParent(this.returnable,"Growth_ChartResults");

  }


  export(ffqparent:any,j:number,z:number,a:any) {
    // this.exportService.exportFFQAlternative4(this.results[i], this.ffqparentList[i].children[this.ffqparentList[i].children.length-i-1].childData[0],this.results[i].gender,'Growth_Chart');
    this.exportService.exportFFQAlternative4(ffqparent,this.checker(this.ffqparentList[j].username,a[z].childData[0].age,this.parentResults),a[z].childData[0],this.getGender(ffqparent,this.parentResults),'Growth_Chart');

    // this.getGender(this.ffqparentList[0],this.parentResults);


  }

  export2(ffqparticipant:any,j:number,z:number,a:any) {
    // this.exportService.exportFFQAlternative4(this.results[i], this.ffqparentList[i].children[this.ffqparentList[i].children.length-i-1].childData[0],this.results[i].gender,'Growth_Chart');
    this.exportService.exportFFQAlternative4(ffqparticipant,this.checker(this.ffqParticipantList[j].username,a[z].childData[0].age,this.participantResults),a[z].childData[0],this.getGender(ffqparticipant,this.participantResults),'Growth_Chart');

  }

  exportAll() {

    for(let i = 0; i < this.ffqparentList.length; i++) {

      for(let j = 0; j < this.ffqparentList[i].children.length; j++) {

        this.exportService.exportFFQAlternative4(this.ffqparentList[i],this.checker(this.ffqparentList[i].username,parseInt(this.ffqparentList[i].children[j].childData[0].age),this.parentResults),this.ffqparentList[i].children[j].childData[0],this.currentChildGender,'Growth_Chart');

      }

    }


  }

  exportAll2() {

    // this.exportService.exportFFQAlternative5(this.ffqparentList,)

    // this.exportService.exportFFQAlternative5(this.ffqparentList,this.checkerArray(this.patientNames(this.parentResults),this.ages(this.ffqparentList),this.parentResults),this.allChildData(),this.allGenders(),"Growth_Chart");
    this.exportService.exportFFQAll(this.allIDS(),this.checkerArray(this.patientNames(this.parentResults),this.ages(),this.parentResults),this.ages(),this.allWeights(),this.allHeights(),this.getAllGenders(this.parentResults),this.parentResults,"Growth_Chart");
    // this.allIDS();
    // console.log("this.parentResults: ",this.parentResults);
    // console.log("this.ffqparentList: ",this.ffqparentList);

  }

  exportAll3() {

    this.exportService.exportFFQAll(this.allIDS2(),this.checkerArray(this.patientNames(this.participantResults),this.ages2(),this.participantResults),this.ages2(),this.allWeights2(),this.allHeights2(),this.getAllGenders(this.participantResults),this.participantResults,"Growth_Chart_participants");


  }

  getGender(ffqparent:FFQParent,parentResults:FFQResultsResponse[]) {

    // console.log("Hi?");

    // console.log("parentResults.length: ",parentResults.length);

    for(let i = 0; i < parentResults.length; i++) {

      // console.log("ffqparent.username: ",ffqparent.username);
      // console.log("parentResults[i].patientName: ",parentResults[i].patientName);

      if(ffqparent.username == parentResults[i].patientName) {

        // console.log("Hello?");

        for(let j = 0; j < ffqparent.children.length; i++) {
          // console.log("typeof(parentResults[i].ageInMonths): ",typeof(parentResults[i].ageInMonths));
          // console.log("typeof(ffqparent.children[j].childData[0].age)",typeof(ffqparent.children[j].childData[0].age));
          if(parentResults[i].ageInMonths == parseInt(ffqparent.children[j].childData[0].age)) {
            return parentResults[i].gender;
          }
        }

      }

    }


  }

  getAllGenders(results:FFQResultsResponse[]) {

    let returnable = [];

    let wIndex = 0;

    for(let i = results.length-1; i >= 0; i--) {


        returnable[wIndex] = results[i].gender;

         wIndex++;
    }

    return returnable;


  }

   allIDS2() {

    let returnable = [];

    for(let i = 0; i < this.ffqParticipantList.length; i++) {

      for(let j = 0; j < this.ffqParticipantList[i].children.length; j++) {

          returnable.push(this.ffqParticipantList[i].userId);

      }

    }

    console.log("allIDS: "+returnable);

    return returnable;

  }

  allIDS() {

    let returnable = [];

    for(let i = 0; i < this.ffqparentList.length; i++) {

      for(let j = 0; j < this.ffqparentList[i].children.length; j++) {

          returnable.push(this.ffqparentList[i].userId);

      }

    }

    // console.log("allIDS: "+returnable);

    return returnable;

  }

  allGenders2() {

    let returnable = [];

    for(let i = 0; i < this.participantResults.length; i++) {
      returnable.push(this.participantResults[i].gender);
    }

    console.log("allGenders(): "+returnable);

    return returnable;

  }

  allGenders() {

    let returnable = [];

    for(let i = 0; i < this.parentResults.length; i++) {
      returnable.push(this.parentResults[i].gender);
    }

    // console.log("allGenders(): "+returnable);

    return returnable;

  }

  allWeights2() {

    let returnables = this.allChildData2();

    let all_weights = [];

    for(let i = 0; i < returnables.length; i++) {
      all_weights[i] = returnables[i].weight;
    }

    return all_weights;

  }

  allWeights() {

    let returnables = this.allChildData();

    let all_weights = [];

    for(let i = 0; i < returnables.length; i++) {
      all_weights[i] = returnables[i].weight;
    }

    return all_weights;

  }

  allHeights2() {

    let returnables = this.allChildData2();

    let all_heights = [];

    for(let i = 0; i < returnables.length; i++) {
      all_heights[i] = returnables[i].height;
    }

    return all_heights;

  }

  allHeights() {

    let returnables = this.allChildData();

    let all_heights = [];

    for(let i = 0; i < returnables.length; i++) {
      all_heights[i] = returnables[i].height;
    }

    return all_heights;

  }

  allChildData2() {

    let returnable:any[] = [];

    for(let i = 0; i < this.ffqParticipantList.length; i++) {
      for(let j = 0; j < this.ffqParticipantList[i].children.length; j++) {

        returnable.push(this.ffqParticipantList[i].children[j].childData[0]);

      }
    }


    // console.log("allChildData() blabla .weight : "+returnable[0].weight,returnable[1].weight,returnable[2].weight,returnable[3].weight);
    // console.log("allChildData() blabla .height : "+returnable[0].height,returnable[1].height,returnable[2].height,returnable[3].height);


    return returnable;



  }

  allChildData() {

    let returnable:any[] = [];

    for(let i = 0; i < this.ffqparentList.length; i++) {
      for(let j = 0; j < this.ffqparentList[i].children.length; j++) {

        returnable.push(this.ffqparentList[i].children[j].childData[0]);

      }
    }


    // console.log("allChildData() blabla .weight : "+returnable[0].weight,returnable[1].weight,returnable[2].weight,returnable[3].weight);
    // console.log("allChildData() blabla .height : "+returnable[0].height,returnable[1].height,returnable[2].height,returnable[3].height);


    return returnable;

  }

  ages2() {

    let returnable = [];

    for(let i = 0; i < this.ffqParticipantList.length; i++) {

        for(let j = 0; j < this.ffqParticipantList[i].children.length; j++) {
          returnable.push(this.ffqParticipantList[i].children[j].childData[0].age);
        }

    }

    // console.log("ages(): "+returnable);

    return returnable;

  }

  ages() {

    let returnable = [];

    for(let i = 0; i < this.ffqparentList.length; i++) {

        for(let j = 0; j < this.ffqparentList[i].children.length; j++) {
          returnable.push(this.ffqparentList[i].children[j].childData[0].age);
        }

    }

    // console.log("ages(): "+returnable);

    return returnable;

  }

  patientNames(results:FFQResultsResponse[]) {

      let returnable = [];

      results.forEach(result => {

        returnable.push(result.patientName);

      })

      console.log("patientNames() : "+returnable);

      return returnable;

  }

  checkerArray(patientName:string[], age:number[],results:FFQResultsResponse[]) {

    let returnable = [];

    let i = 0;

    let date = "";

    // console.log("parentResults: "+results);

    while(returnable.length < results.length) {

    results.forEach(result => {

      // console.log("result.ageInMonths: "+result.ageInMonths);
      // console.log("result.patientName: "+result.patientName);
      // console.log("age[i]:"+age[i]);
      // console.log("patientName[i]: ",patientName[i]);

      if(result.ageInMonths == age[age.length-i-1] && result.patientName == patientName[age.length-i-1]) {
        date = result.date;
        returnable.push(date);
        i++;
      }

    })

    }

    console.log("checkerArray(): "+returnable);

    return returnable;

  }

  type(input:any) {
    return typeof(input);
  }

  private setFoodList() {
    this.results.forEach(result => {
      const recommendedFood: FFQFoodRecommendations[] = [];
      const dqisScore: FFQDQIS[] = [];

      this.foodRecommendationsService.getFoodRecommendationsByQuestionnaireId(result.questionnaireId).subscribe(
        data => {
          recommendedFood.push(data);
        },
      );
      this.dqisService.getDQISByQuestionnaireId(result.questionnaireId).subscribe(
        data => {
          dqisScore.push(data);
        },
      );
      result.foodRecList = recommendedFood;
      result.dqis = dqisScore;


    });
  }

  getParentUsernameById(userId: string) {
    return this.ffqparentList.find(parent => parent.userId === userId)?.username ?? "[not found]";
  }

  getChildData(child: FFQChildren): FFQChildData[] {
    return child.childData;
  }

  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;


  //who

  //boys
  //bmi
  BOYS_BMI_FOR_AGE_BIRTH_TO_TWO_YEARS_METRIC_SYSTEM: any[];

  //height - age
  BOYS_HEIGHT_FOR_AGE_BIRTH_TO_TWO_YEARS_METRIC_SYSTEM: any[];
  BOYS_HEIGHT_FOR_AGE_BIRTH_TO_TWO_YEARS_US_CUSTOMARY_SYSTEM: any[];

  //weight - age
  BOYS_WEIGHT_FOR_AGE_BIRTH_TO_TWO_YEARS_METRIC_SYSTEM: any[];
  BOYS_WEIGHT_FOR_AGE_BIRTH_TO_TWO_YEARS_US_CUSTOMARY_SYSTEM: any[];

  //weight - height
  BOYS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_METRIC_SYSTEM: any[];
  BOYS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_US_CUSTOMARY_SYSTEM: any[];

  //weight - height - mixed
  BOYS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_MIXED_SYSTEM_KG_VS_IN: any[];
  BOYS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_MIXED_SYSTEM_LB_VS_CM: any[];

  //girls

  //bmi
  GIRLS_BMI_FOR_AGE_BIRTH_TO_TWO_YEARS_METRIC_SYSTEM: any[];

  //height - age
  GIRLS_HEIGHT_FOR_AGE_BIRTH_TO_TWO_YEARS_METRIC_SYSTEM: any[];
  GIRLS_HEIGHT_FOR_AGE_BIRTH_TO_TWO_YEARS_US_CUSTOMARY_SYSTEM: any[];

  //weight - age
  GIRLS_WEIGHT_FOR_AGE_BIRTH_TO_TWO_YEARS_METRIC_SYSTEM: any[];
  GIRLS_WEIGHT_FOR_AGE_BIRTH_TO_TWO_YEARS_US_CUSTOMARY_SYSTEM: any[];

  //weight - height
  GIRLS_WEIGHT_FOR_LENGTH_BIRTH_TO_TWO_YEARS_METRIC_SYSTEM: any[];
  GIRLS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_US_CUSTOMARY_SYSTEM: any[];

  //weight - height - mixed
  GIRLS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_MIXED_SYSTEM_LB_VS_CM: any[];
  GIRLS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_MIXED_SYSTEM_KG_VS_IN: any[];

  // constant to validate the max and min values allowed
  readonly MAX_AGE_MONTHS = 24;
  readonly MIN_AGE_MONTHS = 0;
  // these are mutable depends on the units of measurements, by default they are in metric system.
  MAX_HEIGHT = 110;
  MIN_HEIGHT = 40;
  MAX_WEIGHT = 30;
  MIN_WEIGHT = 1;

  // determines the measurement units selected by the user
  heightUnitOptions: UnitsOfMeasurement = UnitsOfMeasurement.cm;
  weightUnitOptions: UnitsOfMeasurement = UnitsOfMeasurement.kg;

  // curent child data entered by the user
  currentChildName: string = "";
  currentChildHeight: string = "";
  currentChildWeight: string = "";
  currentChildAge: string = "";
  // currentChildGender: Gender.NotAssigned;

  currentChildGender = "a";

  // current child
  currentChild: FFQChildren = {} as FFQChildren;

  // children list to avoid working with currentParent.children
  // childrenList: FFQChildren[] = [];

  // // current parent, data retrived from db
  // currentParent: FFQParentResponse;

  //interpretation message
  interMessage: string = " ";

  //message color y= yellow, g= green, r= red
  interMessageColor: string = " ";

  myDocDefinition: any;
  loading: boolean = false;
  color: ThemePalette = "primary";
  mode: ProgressSpinnerMode = "indeterminate";
  value = 65;

  chosenChartOption: ChartOption = ChartOption.NotAssigned;

  currentGrowthChartData: GrowthChartData = GrowthChartData.NONE;

  lang: boolean = true;

  dataWasAdded: boolean = true;
  xaxis: any;
  yaxis: any;


  public generateData(count, yrange) {
    var i = 0;
    var series = [];
    while (i < count) {
      var x = "w" + (i + 1).toString();
      var y =
        Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

      series.push({
        x: x,
        y: y
      });
      i++;
    }
    return series;
  }

  extractFemaleMetricSeries(babyWeightHeightData, nameBaby) {//function for female metric series
    let babyDataSeries = {
      name: nameBaby,
      type: "line",
      data: babyWeightHeightData//baby weight height data is passed into function
    };

    let seriesResult = [babyDataSeries];//series results starts with baby data

    for (let i = 0; i < GIRLS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_METRIC_SYSTEM.length; i++) {//for every element in the girl's metric data array
      seriesResult.push(GIRLS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_METRIC_SYSTEM[i]);//push into the series result
    }
    return seriesResult;
  }

  extractFemaleCustomarySeries(babyWeightHeightData, nameBaby) {//function for female metric series
    let babyDataSeries = {
      name: nameBaby,
      type: "line",
      data: babyWeightHeightData//baby weight height data is passed into function
    };

    let seriesResult = [babyDataSeries];//series results starts with baby data

    for (let i = 0; i < GIRLS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_US_CUSTOMARY_SYSTEM.length; i++) {//for every element in the girl's metric data array
      seriesResult.push(GIRLS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_US_CUSTOMARY_SYSTEM[i]);//push into the series result
    }
    return seriesResult;
  }

  extractMaleMetricSeries(babyWeightHeightData, nameBaby) {//function for male metric series
    let babyDataSeries = {
      name: nameBaby,
      type: "line",
      data: babyWeightHeightData//baby weight data is passed
    };

    let seriesResult = [babyDataSeries];//series results starts with baby data

    for (let i = 0; i < BOYS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_METRIC_SYSTEM.length; i++) {//for every element in boy's metric data array
      seriesResult.push(BOYS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_METRIC_SYSTEM[i]);//push into the series result
    }
    return seriesResult;
  }

  extractMaleCustomarySeries(babyWeightHeightData, nameBaby) {//function for male metric series
    let babyDataSeries = {
      name: nameBaby,
      type: "line",
      data: babyWeightHeightData//baby weight data is passed
    };

    let seriesResult = [babyDataSeries];//series results starts with baby data

    for (let i = 0; i < BOYS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_US_CUSTOMARY_SYSTEM.length; i++) {//for every element in boy's metric data array
      seriesResult.push(BOYS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_US_CUSTOMARY_SYSTEM[i]);//push into the series result
    }
    return seriesResult;
  }

  findXPointsOfQuadrilateral(babyX: number, percentileData: any): [number, number]
  {

    let i = 0;

    let xLeft: number;
    let xRight: number;

    do
    {
      xLeft = percentileData[0].data[i][0];
      xRight = percentileData[0].data[i+1][0];
      i++;
    } while((babyX < xLeft) || (babyX > xRight));

    i--;

    return [i, i+1];
  }

  checkIfPointInQuadrilateral(ptOfInterest: [number, number], upperLeftPt: [number, number], upperRightPt: [number, number],
    lowerLeftPt: [number, number], lowerRightPt: [number, number]) : number
  {

    let baby_x = ptOfInterest[0];
    let baby_y = ptOfInterest[1];
    let left_x = upperLeftPt[0];
    let upperLeftPt_y = upperLeftPt[1];
    let right_x = upperRightPt[0];
    let upperRightPt_y = upperRightPt[1];
    let lowerLeftPt_y = lowerLeftPt[1];
    let lowerRightPt_y = lowerRightPt[1];

    if((baby_x >= left_x) && (baby_x <= right_x))
    {
      let slopeUpperLine = (upperRightPt_y - upperLeftPt_y) / (right_x - left_x);
      let yIntUpperLine = upperRightPt_y - (slopeUpperLine * right_x);
      let yUpperBound = (slopeUpperLine * baby_x) + yIntUpperLine;


      let slopeLowerLine = (lowerRightPt_y - lowerLeftPt_y) / (right_x - left_x);
      let yIntLowerLine = lowerRightPt_y - (slopeLowerLine * right_x);
      let yLowerBound = (slopeLowerLine * baby_x) + yIntLowerLine;

      if((baby_y <= yUpperBound) && (baby_y >= yLowerBound))
      {
        return 1;
      }

      else if(baby_y > yUpperBound)
      {
        return 2;
      }

      else if(baby_y < yLowerBound)
      {
        return 3;
      }

      else
      {
        return 0;
      }
    }

  }


  onSubmitChildPersonalInformationForm() {
    console.log("Working in progress submitting  Child Personal Information");
  }

  onSubmitChildBodyMeasurementsForm() {
    let index = this.currentParent.children.findIndex(
      (x) => x.name === this.currentChildName
    );
    for(let i = 0; i < this.ffqparentList.length; i++) {
      let index1 = this.ffqparentList[i].children.findIndex(
        (x) => x.name == this.currentChildName
      );
    }

    if (index > -1) {
      this.currentParent.children[index] = this.currentChild;
    } else {
      this, this.currentParent.children.push(this.currentChild);
    }
    this.parentService
      .updateParent(<FFQParentResponse>this.currentParent)
      .subscribe();
    this.dataWasAdded = true;
  }

  onSubmitChartOptionsForm() {
    console.log("Working in progress submitting Chart options");
  }


  onUnitsChange(typeOfChart: ChartOption) {
    if (
      this.heightUnitOptions === UnitsOfMeasurement.cm &&
      this.weightUnitOptions === UnitsOfMeasurement.kg
    ) {
      this.MAX_HEIGHT = 110;
      this.MIN_HEIGHT = 40;
      this.MAX_WEIGHT = 30;
      this.MIN_WEIGHT = 1;
    } else if (
      this.heightUnitOptions === UnitsOfMeasurement.cm &&
      this.weightUnitOptions === UnitsOfMeasurement.lb
    ) {
      this.MAX_HEIGHT = 110;
      this.MIN_HEIGHT = 40;
      this.MAX_WEIGHT = Math.round(30 * FFQChildren.KG_TO_LB);
      this.MIN_WEIGHT = Math.round(1 * FFQChildren.KG_TO_LB);
    } else if (
      this.heightUnitOptions === UnitsOfMeasurement.in &&
      this.weightUnitOptions === UnitsOfMeasurement.lb
    ) {
      this.MAX_HEIGHT = Math.round(110 / FFQChildren.IN_TO_CM);
      this.MIN_HEIGHT = Math.round(40 / FFQChildren.IN_TO_CM);
      this.MAX_WEIGHT = Math.round(30 * FFQChildren.KG_TO_LB);
      this.MIN_WEIGHT = Math.round(1 * FFQChildren.KG_TO_LB);
    } else if (
      this.heightUnitOptions === UnitsOfMeasurement.in &&
      this.weightUnitOptions === UnitsOfMeasurement.kg
    ) {
      this.MAX_HEIGHT = Math.round(110 / FFQChildren.IN_TO_CM);
      this.MIN_HEIGHT = Math.round(40 / FFQChildren.IN_TO_CM);
      this.MAX_WEIGHT = 30;
      this.MIN_WEIGHT = 1;
    }
  }


  onAddingData(childBodyMeasurementsForm: NgForm) {
    let ageValue = Number.parseInt(
      childBodyMeasurementsForm.controls["ageControl"].value
    );

    let weightValue = Number.parseFloat(
      childBodyMeasurementsForm.controls["weightControl"].value
    );

    let heightValue = Number.parseFloat(
      childBodyMeasurementsForm.controls["heightControl"].value
    );

    if (
      ageValue <= this.MAX_AGE_MONTHS &&
      ageValue >= this.MIN_AGE_MONTHS &&
      weightValue <= this.MAX_WEIGHT &&
      weightValue >= this.MIN_WEIGHT &&
      heightValue <= this.MAX_HEIGHT &&
      heightValue >= this.MIN_HEIGHT
    ) {
      if (
        this.heightUnitOptions === UnitsOfMeasurement.cm &&
        this.weightUnitOptions === UnitsOfMeasurement.kg
      ) {
        this.currentChild.addData(
          new FFQChildData(
            this.currentChildWeight,
            this.currentChildHeight,
            this.currentChildAge
          )
        );
      } else if (
        this.heightUnitOptions === UnitsOfMeasurement.cm &&
        this.weightUnitOptions === UnitsOfMeasurement.lb
      ) {
        this.currentChild.addData(
          new FFQChildData(
            (
              parseFloat(this.currentChildWeight) / FFQChildren.KG_TO_LB
            ).toString(),
            this.currentChildHeight,
            this.currentChildAge
          )
        );
      } else if (
        this.heightUnitOptions === UnitsOfMeasurement.in &&
        this.weightUnitOptions === UnitsOfMeasurement.lb
      ) {
        this.currentChild.addData(
          new FFQChildData(
            (
              parseFloat(this.currentChildWeight) / FFQChildren.KG_TO_LB
            ).toString(),
            (
              parseFloat(this.currentChildHeight) * FFQChildren.IN_TO_CM
            ).toString(),
            this.currentChildAge
          )
        );
      } else if (
        this.heightUnitOptions === UnitsOfMeasurement.in &&
        this.weightUnitOptions === UnitsOfMeasurement.kg
      ) {
        this.currentChild.addData(
          new FFQChildData(
            this.currentChildWeight,
            (
              parseFloat(this.currentChildHeight) * FFQChildren.IN_TO_CM
            ).toString(),
            this.currentChildAge
          )
        );
      }

      this.dataWasAdded = false;
      childBodyMeasurementsForm.resetForm();

      this.plottingData();
    }
  }

  plottingData() {
    let babyData: [number, number][];
    let babyName = this.currentChild.name;


    let rawBabyData: [number, number][];
    rawBabyData = this.currentChild.getWeightHeightChartData(
      this.heightUnitOptions,
      this.weightUnitOptions
    );

    babyData = this.currentChild.extractBabyData(rawBabyData);
    let seriesData = [];
    let babyChartTitle = "";
    let babyChartYAxisTitle = "";
    let babyChartXAxisTitle = "";
    let babyChartYAxisTooltip = "";
    let babyChartXAxisTooltip = "";
    let chartInterpretation = "";
    let xBounds : [number, number];
    let percentileData: any;
    let yellowOverweightResult: number;
    let greenResult: number;
    let yellowUnderweightResult: number;

   if(this.currentChildGender != Gender.NotAssigned) {
    switch (this.currentChildGender)
    {
      case (Gender.Female)://if gender is female

        if(this.weightUnitOptions === UnitsOfMeasurement.kg){
          seriesData = this.extractFemaleMetricSeries(babyData, babyName);//use female metric data for percentiles
          babyChartYAxisTitle = "Weight (Kg)";
          babyChartXAxisTitle = "Length (Cm)";
          babyChartYAxisTooltip = " kg";
          babyChartXAxisTooltip = " cm";

          percentileData = GIRLS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_METRIC_SYSTEM;
          xBounds = this.findXPointsOfQuadrilateral( babyData[babyData.length - 1][0] , percentileData);

          let ptOfInterest : [number, number];
          let upperLeftPt : [number, number];
          let upperRightPt : [number, number];
          let lowerLeftPt : [number, number];
          let lowerRightPt : [number, number];

          ptOfInterest = babyData[babyData.length - 1];
          upperLeftPt = [percentileData[1].data[xBounds[0]][0], percentileData[1].data[xBounds[0]][1]]; // point with x <= baby_x on 98th percentile line
          upperRightPt = [percentileData[1].data[xBounds[1]][0], percentileData[1].data[xBounds[0]][1]]; // point with x >= baby_x on 98th percentile line
          lowerLeftPt = [percentileData[3].data[xBounds[0]][0], percentileData[3].data[xBounds[0]][1]]; // point with x <= baby_x on 90th percentile line
          lowerRightPt = [percentileData[3].data[xBounds[1]][0], percentileData[3].data[xBounds[0]][1]]; // point with x >= baby_x on 90th percentile line

          console.log("ptOfInterest x: " + ptOfInterest[0] + " ptOfInterest y: " + ptOfInterest[1]);
          console.log("upperLeftPt x: " + upperLeftPt[0] + " upperLeftPt y: " + upperLeftPt[1]);
          console.log("upperRightPt x: " + upperRightPt[0] + " upperRightPt y: " + upperRightPt[1]);
          console.log("lowerLeftPt x: " + lowerLeftPt[0] + " lowerLeftPt y: " + lowerLeftPt[1]);
          console.log("lowerRightPt x: " + lowerRightPt[0] + " lowerRightPt y: " + lowerRightPt[1]);

          yellowOverweightResult = this.checkIfPointInQuadrilateral(ptOfInterest, upperLeftPt, upperRightPt, lowerLeftPt, lowerRightPt); // checking if baby point in yellow overweight section
          console.log("Result of check pt in quad yellow overweight: " + yellowOverweightResult);

          if(yellowOverweightResult == 2)
          {
            chartInterpretation = "Your baby is NOT following a healthy growth pattern. She could be overweight. Follow up with your pediatrician soon.";
            this.interMessageColor = 'r';
          }

          else if(yellowOverweightResult == 1)
          {
            chartInterpretation = "Your baby is moving towards an overweight pattern. Please discuss with your pediatrician.";
            this.interMessageColor = 'y';
          }

          else if(yellowOverweightResult == 3)
          {
            upperLeftPt = [percentileData[3].data[xBounds[0]][0], percentileData[3].data[xBounds[0]][1]]; // point with x <= baby_x on 90th percentile line
            upperRightPt = [percentileData[3].data[xBounds[1]][0], percentileData[3].data[xBounds[0]][1]]; // point with x >= baby_x on 90th percentile line
            lowerLeftPt = [percentileData[7].data[xBounds[0]][0], percentileData[7].data[xBounds[0]][1]]; // point with x <= baby_x on 10th percentile line
            lowerRightPt = [percentileData[7].data[xBounds[1]][0], percentileData[7].data[xBounds[0]][1]]; // point with x >= baby_x on 10th percentile line

            console.log("ptOfInterest x: " + ptOfInterest[0] + " ptOfInterest y: " + ptOfInterest[1]);
            console.log("upperLeftPt x: " + upperLeftPt[0] + " upperLeftPt y: " + upperLeftPt[1]);
            console.log("upperRightPt x: " + upperRightPt[0] + " upperRightPt y: " + upperRightPt[1]);
            console.log("lowerLeftPt x: " + lowerLeftPt[0] + " lowerLeftPt y: " + lowerLeftPt[1]);
            console.log("lowerRightPt x: " + lowerRightPt[0] + " lowerRightPt y: " + lowerRightPt[1]);

            greenResult = this.checkIfPointInQuadrilateral(ptOfInterest, upperLeftPt, upperRightPt, lowerLeftPt, lowerRightPt); // checking if baby point in green section
            console.log("Result of check pt in quad green: " + greenResult);

            if(greenResult == 1)
            {
              chartInterpretation = "Great job! Your baby is following a healthy growth pattern.";
              this.interMessageColor = 'g';
            }


            upperLeftPt = [percentileData[7].data[xBounds[0]][0], percentileData[7].data[xBounds[0]][1]]; // point with x <= baby_x on 90th percentile line
            upperRightPt = [percentileData[7].data[xBounds[1]][0], percentileData[7].data[xBounds[0]][1]]; // point with x >= baby_x on 90th percentile line
            lowerLeftPt = [percentileData[9].data[xBounds[0]][0], percentileData[9].data[xBounds[0]][1]]; // point with x <= baby_x on 10th percentile line
            lowerRightPt = [percentileData[9].data[xBounds[1]][0], percentileData[9].data[xBounds[0]][1]]; // point with x >= baby_x on 10th percentile line

            console.log("ptOfInterest x: " + ptOfInterest[0] + " ptOfInterest y: " + ptOfInterest[1]);
            console.log("upperLeftPt x: " + upperLeftPt[0] + " upperLeftPt y: " + upperLeftPt[1]);
            console.log("upperRightPt x: " + upperRightPt[0] + " upperRightPt y: " + upperRightPt[1]);
            console.log("lowerLeftPt x: " + lowerLeftPt[0] + " lowerLeftPt y: " + lowerLeftPt[1]);
            console.log("lowerRightPt x: " + lowerRightPt[0] + " lowerRightPt y: " + lowerRightPt[1]);

            yellowUnderweightResult = this.checkIfPointInQuadrilateral(ptOfInterest, upperLeftPt, upperRightPt, lowerLeftPt, lowerRightPt); // checking if baby point in green section
            console.log("Result of check pt in quad green: " + yellowUnderweightResult);

            if(yellowUnderweightResult == 1)
            {
              chartInterpretation = "Your baby is moving towards an underweight pattern. Please discuss with your pediatrician.";
              this.interMessageColor = 'y';
            }

            else if(yellowUnderweightResult == 3)
            {
              chartInterpretation = "Your baby is NOT following a healthy growth pattern. She could be underweight. Follow up with your pediatrician soon."
              this.interMessageColor = 'r';
            }

          }

          console.log("Chart Interpretation: " + chartInterpretation);

        }else{
          seriesData = this.extractFemaleCustomarySeries(babyData, babyName);//use female customary data for percentiles
          babyChartYAxisTitle = "Weight (Lb)";
          babyChartXAxisTitle = "Length (In)";
          babyChartYAxisTooltip = " lbs";
          babyChartXAxisTooltip = " in";

          percentileData = GIRLS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_US_CUSTOMARY_SYSTEM;
        xBounds = this.findXPointsOfQuadrilateral( babyData[babyData.length - 1][0] , percentileData);

        let ptOfInterest : [number, number];
        let upperLeftPt : [number, number];
        let upperRightPt : [number, number];
        let lowerLeftPt : [number, number];
        let lowerRightPt : [number, number];

        ptOfInterest = babyData[babyData.length - 1];
        upperLeftPt = [percentileData[1].data[xBounds[0]][0], percentileData[1].data[xBounds[0]][1]]; // point with x <= baby_x on 98th percentile line
        upperRightPt = [percentileData[1].data[xBounds[1]][0], percentileData[1].data[xBounds[0]][1]]; // point with x >= baby_x on 98th percentile line
        lowerLeftPt = [percentileData[3].data[xBounds[0]][0], percentileData[3].data[xBounds[0]][1]]; // point with x <= baby_x on 90th percentile line
        lowerRightPt = [percentileData[3].data[xBounds[1]][0], percentileData[3].data[xBounds[0]][1]]; // point with x >= baby_x on 90th percentile line

        console.log("ptOfInterest x: " + ptOfInterest[0] + " ptOfInterest y: " + ptOfInterest[1]);
        console.log("upperLeftPt x: " + upperLeftPt[0] + " upperLeftPt y: " + upperLeftPt[1]);
        console.log("upperRightPt x: " + upperRightPt[0] + " upperRightPt y: " + upperRightPt[1]);
        console.log("lowerLeftPt x: " + lowerLeftPt[0] + " lowerLeftPt y: " + lowerLeftPt[1]);
        console.log("lowerRightPt x: " + lowerRightPt[0] + " lowerRightPt y: " + lowerRightPt[1]);

        yellowOverweightResult = this.checkIfPointInQuadrilateral(ptOfInterest, upperLeftPt, upperRightPt, lowerLeftPt, lowerRightPt); // checking if baby point in yellow overweight section
        console.log("Result of check pt in quad yellow overweight: " + yellowOverweightResult);

        if(yellowOverweightResult == 2)
        {
          chartInterpretation = "Your baby is NOT following a healthy growth pattern. She could be overweight. Follow up with your pediatrician soon.";
          this.interMessageColor = 'r';
        }

        else if(yellowOverweightResult == 1)
        {
          chartInterpretation = "Your baby is moving towards an overweight pattern. Please discuss with your pediatrician.";
          this.interMessageColor = 'y';
        }

        else if(yellowOverweightResult == 3)
        {
          upperLeftPt = [percentileData[3].data[xBounds[0]][0], percentileData[3].data[xBounds[0]][1]]; // point with x <= baby_x on 90th percentile line
          upperRightPt = [percentileData[3].data[xBounds[1]][0], percentileData[3].data[xBounds[0]][1]]; // point with x >= baby_x on 90th percentile line
          lowerLeftPt = [percentileData[7].data[xBounds[0]][0], percentileData[7].data[xBounds[0]][1]]; // point with x <= baby_x on 10th percentile line
          lowerRightPt = [percentileData[7].data[xBounds[1]][0], percentileData[7].data[xBounds[0]][1]]; // point with x >= baby_x on 10th percentile line

          console.log("ptOfInterest x: " + ptOfInterest[0] + " ptOfInterest y: " + ptOfInterest[1]);
          console.log("upperLeftPt x: " + upperLeftPt[0] + " upperLeftPt y: " + upperLeftPt[1]);
          console.log("upperRightPt x: " + upperRightPt[0] + " upperRightPt y: " + upperRightPt[1]);
          console.log("lowerLeftPt x: " + lowerLeftPt[0] + " lowerLeftPt y: " + lowerLeftPt[1]);
          console.log("lowerRightPt x: " + lowerRightPt[0] + " lowerRightPt y: " + lowerRightPt[1]);

          greenResult = this.checkIfPointInQuadrilateral(ptOfInterest, upperLeftPt, upperRightPt, lowerLeftPt, lowerRightPt); // checking if baby point in green section
          console.log("Result of check pt in quad green: " + greenResult);

          if(greenResult == 1)
          {
            chartInterpretation = "Great job! Your baby is following a healthy growth pattern.";
            this.interMessageColor = 'g';
          }


          upperLeftPt = [percentileData[7].data[xBounds[0]][0], percentileData[7].data[xBounds[0]][1]]; // point with x <= baby_x on 90th percentile line
          upperRightPt = [percentileData[7].data[xBounds[1]][0], percentileData[7].data[xBounds[0]][1]]; // point with x >= baby_x on 90th percentile line
          lowerLeftPt = [percentileData[9].data[xBounds[0]][0], percentileData[9].data[xBounds[0]][1]]; // point with x <= baby_x on 10th percentile line
          lowerRightPt = [percentileData[9].data[xBounds[1]][0], percentileData[9].data[xBounds[0]][1]]; // point with x >= baby_x on 10th percentile line

          console.log("ptOfInterest x: " + ptOfInterest[0] + " ptOfInterest y: " + ptOfInterest[1]);
          console.log("upperLeftPt x: " + upperLeftPt[0] + " upperLeftPt y: " + upperLeftPt[1]);
          console.log("upperRightPt x: " + upperRightPt[0] + " upperRightPt y: " + upperRightPt[1]);
          console.log("lowerLeftPt x: " + lowerLeftPt[0] + " lowerLeftPt y: " + lowerLeftPt[1]);
          console.log("lowerRightPt x: " + lowerRightPt[0] + " lowerRightPt y: " + lowerRightPt[1]);

          yellowUnderweightResult = this.checkIfPointInQuadrilateral(ptOfInterest, upperLeftPt, upperRightPt, lowerLeftPt, lowerRightPt); // checking if baby point in green section
          console.log("Result of check pt in quad green: " + yellowUnderweightResult);

          if(yellowUnderweightResult == 1)
          {
            chartInterpretation = "Your baby is moving towards an underweight pattern. Please discuss with your pediatrician.";
            this.interMessageColor = 'y';
          }

          else if(yellowUnderweightResult == 3)
          {
            chartInterpretation = "Your baby is NOT following a healthy growth pattern. She could be underweight. Follow up with your pediatrician soon."
            this.interMessageColor = 'r';
          }

          }

          console.log("Chart Interpretation: " + chartInterpretation);

        }
        babyChartTitle = "Female Weight-Length Chart";//change the title of chart
        break;

      case (Gender.Male)://if gender is male

        if(this.weightUnitOptions === UnitsOfMeasurement.kg){
          seriesData = this.extractMaleMetricSeries(babyData, babyName);//use male metric data for percentiles
          babyChartYAxisTitle = "Weight (Kg)";
          babyChartXAxisTitle = "Length (Cm)";
          babyChartYAxisTooltip = " kg";
          babyChartXAxisTooltip = " cm";

          percentileData = BOYS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_METRIC_SYSTEM;
          xBounds = this.findXPointsOfQuadrilateral( babyData[babyData.length - 1][0] , percentileData);

          let ptOfInterest : [number, number];
          let upperLeftPt : [number, number];
          let upperRightPt : [number, number];
          let lowerLeftPt : [number, number];
          let lowerRightPt : [number, number];

          ptOfInterest = babyData[babyData.length - 1];
          upperLeftPt = [percentileData[1].data[xBounds[0]][0], percentileData[1].data[xBounds[0]][1]]; // point with x <= baby_x on 98th percentile line
          upperRightPt = [percentileData[1].data[xBounds[1]][0], percentileData[1].data[xBounds[0]][1]]; // point with x >= baby_x on 98th percentile line
          lowerLeftPt = [percentileData[3].data[xBounds[0]][0], percentileData[3].data[xBounds[0]][1]]; // point with x <= baby_x on 90th percentile line
          lowerRightPt = [percentileData[3].data[xBounds[1]][0], percentileData[3].data[xBounds[0]][1]]; // point with x >= baby_x on 90th percentile line

          console.log("ptOfInterest x: " + ptOfInterest[0] + " ptOfInterest y: " + ptOfInterest[1]);
          console.log("upperLeftPt x: " + upperLeftPt[0] + " upperLeftPt y: " + upperLeftPt[1]);
          console.log("upperRightPt x: " + upperRightPt[0] + " upperRightPt y: " + upperRightPt[1]);
          console.log("lowerLeftPt x: " + lowerLeftPt[0] + " lowerLeftPt y: " + lowerLeftPt[1]);
          console.log("lowerRightPt x: " + lowerRightPt[0] + " lowerRightPt y: " + lowerRightPt[1]);

          yellowOverweightResult = this.checkIfPointInQuadrilateral(ptOfInterest, upperLeftPt, upperRightPt, lowerLeftPt, lowerRightPt); // checking if baby point in yellow overweight section
          console.log("Result of check pt in quad yellow overweight: " + yellowOverweightResult);

          if(yellowOverweightResult == 2)
          {
            chartInterpretation = "Your baby is NOT following a healthy growth pattern. He could be overweight. Follow up with your pediatrician soon.";
            this.interMessageColor = 'r';
          }

          else if(yellowOverweightResult == 1)
          {
            chartInterpretation = "Your baby is moving towards an overweight pattern. Please discuss with your pediatrician.";
            this.interMessageColor = 'y';
          }

          else if(yellowOverweightResult == 3)
          {
            upperLeftPt = [percentileData[3].data[xBounds[0]][0], percentileData[3].data[xBounds[0]][1]]; // point with x <= baby_x on 90th percentile line
            upperRightPt = [percentileData[3].data[xBounds[1]][0], percentileData[3].data[xBounds[0]][1]]; // point with x >= baby_x on 90th percentile line
            lowerLeftPt = [percentileData[7].data[xBounds[0]][0], percentileData[7].data[xBounds[0]][1]]; // point with x <= baby_x on 10th percentile line
            lowerRightPt = [percentileData[7].data[xBounds[1]][0], percentileData[7].data[xBounds[0]][1]]; // point with x >= baby_x on 10th percentile line

            console.log("ptOfInterest x: " + ptOfInterest[0] + " ptOfInterest y: " + ptOfInterest[1]);
            console.log("upperLeftPt x: " + upperLeftPt[0] + " upperLeftPt y: " + upperLeftPt[1]);
            console.log("upperRightPt x: " + upperRightPt[0] + " upperRightPt y: " + upperRightPt[1]);
            console.log("lowerLeftPt x: " + lowerLeftPt[0] + " lowerLeftPt y: " + lowerLeftPt[1]);
            console.log("lowerRightPt x: " + lowerRightPt[0] + " lowerRightPt y: " + lowerRightPt[1]);

            greenResult = this.checkIfPointInQuadrilateral(ptOfInterest, upperLeftPt, upperRightPt, lowerLeftPt, lowerRightPt); // checking if baby point in green section
            console.log("Result of check pt in quad green: " + greenResult);

            if(greenResult == 1)
            {
              chartInterpretation = "Great job! Your baby is following a healthy growth pattern.";
              this.interMessageColor = 'g';
            }


            upperLeftPt = [percentileData[7].data[xBounds[0]][0], percentileData[7].data[xBounds[0]][1]]; // point with x <= baby_x on 90th percentile line
            upperRightPt = [percentileData[7].data[xBounds[1]][0], percentileData[7].data[xBounds[0]][1]]; // point with x >= baby_x on 90th percentile line
            lowerLeftPt = [percentileData[9].data[xBounds[0]][0], percentileData[9].data[xBounds[0]][1]]; // point with x <= baby_x on 10th percentile line
            lowerRightPt = [percentileData[9].data[xBounds[1]][0], percentileData[9].data[xBounds[0]][1]]; // point with x >= baby_x on 10th percentile line

            console.log("ptOfInterest x: " + ptOfInterest[0] + " ptOfInterest y: " + ptOfInterest[1]);
            console.log("upperLeftPt x: " + upperLeftPt[0] + " upperLeftPt y: " + upperLeftPt[1]);
            console.log("upperRightPt x: " + upperRightPt[0] + " upperRightPt y: " + upperRightPt[1]);
            console.log("lowerLeftPt x: " + lowerLeftPt[0] + " lowerLeftPt y: " + lowerLeftPt[1]);
            console.log("lowerRightPt x: " + lowerRightPt[0] + " lowerRightPt y: " + lowerRightPt[1]);

            yellowUnderweightResult = this.checkIfPointInQuadrilateral(ptOfInterest, upperLeftPt, upperRightPt, lowerLeftPt, lowerRightPt); // checking if baby point in green section
            console.log("Result of check pt in quad green: " + yellowUnderweightResult);

            if(yellowUnderweightResult == 1)
            {
              chartInterpretation = "Your baby is moving towards an underweight pattern. Please discuss with your pediatrician.";
              this.interMessageColor = 'y';
            }

            else if(yellowUnderweightResult == 3)
            {
              chartInterpretation = "Your baby is NOT following a healthy growth pattern. He could be underweight. Follow up with your pediatrician soon."
              this.interMessageColor = 'r';
            }

            }

            console.log("Chart Interpretation: " + chartInterpretation);

        }else{
          seriesData = this.extractMaleCustomarySeries(babyData, babyName);//use male customary data for percentiles
          babyChartYAxisTitle = "Weight (Lb)";
          babyChartXAxisTitle = "Length (In)";
          babyChartYAxisTooltip = " lbs";
          babyChartXAxisTooltip = " in";

          percentileData = BOYS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_US_CUSTOMARY_SYSTEM;
          xBounds = this.findXPointsOfQuadrilateral( babyData[babyData.length - 1][0] , percentileData);

          let ptOfInterest : [number, number];
          let upperLeftPt : [number, number];
          let upperRightPt : [number, number];
          let lowerLeftPt : [number, number];
          let lowerRightPt : [number, number];

          ptOfInterest = babyData[babyData.length - 1];
          upperLeftPt = [percentileData[1].data[xBounds[0]][0], percentileData[1].data[xBounds[0]][1]]; // point with x <= baby_x on 98th percentile line
          upperRightPt = [percentileData[1].data[xBounds[1]][0], percentileData[1].data[xBounds[0]][1]]; // point with x >= baby_x on 98th percentile line
          lowerLeftPt = [percentileData[3].data[xBounds[0]][0], percentileData[3].data[xBounds[0]][1]]; // point with x <= baby_x on 90th percentile line
          lowerRightPt = [percentileData[3].data[xBounds[1]][0], percentileData[3].data[xBounds[0]][1]]; // point with x >= baby_x on 90th percentile line

          console.log("ptOfInterest x: " + ptOfInterest[0] + " ptOfInterest y: " + ptOfInterest[1]);
          console.log("upperLeftPt x: " + upperLeftPt[0] + " upperLeftPt y: " + upperLeftPt[1]);
          console.log("upperRightPt x: " + upperRightPt[0] + " upperRightPt y: " + upperRightPt[1]);
          console.log("lowerLeftPt x: " + lowerLeftPt[0] + " lowerLeftPt y: " + lowerLeftPt[1]);
          console.log("lowerRightPt x: " + lowerRightPt[0] + " lowerRightPt y: " + lowerRightPt[1]);

          yellowOverweightResult = this.checkIfPointInQuadrilateral(ptOfInterest, upperLeftPt, upperRightPt, lowerLeftPt, lowerRightPt); // checking if baby point in yellow overweight section
          console.log("Result of check pt in quad yellow overweight: " + yellowOverweightResult);

          if(yellowOverweightResult == 2)
          {
            chartInterpretation = "Your baby is NOT following a healthy growth pattern. He could be overweight. Follow up with your pediatrician soon.";
            this.interMessageColor = 'r';
          }

          else if(yellowOverweightResult == 1)
          {
            chartInterpretation = "Your baby is moving towards an overweight pattern. Please discuss with your pediatrician.";
            this.interMessageColor = 'y';
          }

          else if(yellowOverweightResult == 3)
          {
            upperLeftPt = [percentileData[3].data[xBounds[0]][0], percentileData[3].data[xBounds[0]][1]]; // point with x <= baby_x on 90th percentile line
            upperRightPt = [percentileData[3].data[xBounds[1]][0], percentileData[3].data[xBounds[0]][1]]; // point with x >= baby_x on 90th percentile line
            lowerLeftPt = [percentileData[7].data[xBounds[0]][0], percentileData[7].data[xBounds[0]][1]]; // point with x <= baby_x on 10th percentile line
            lowerRightPt = [percentileData[7].data[xBounds[1]][0], percentileData[7].data[xBounds[0]][1]]; // point with x >= baby_x on 10th percentile line

            console.log("ptOfInterest x: " + ptOfInterest[0] + " ptOfInterest y: " + ptOfInterest[1]);
            console.log("upperLeftPt x: " + upperLeftPt[0] + " upperLeftPt y: " + upperLeftPt[1]);
            console.log("upperRightPt x: " + upperRightPt[0] + " upperRightPt y: " + upperRightPt[1]);
            console.log("lowerLeftPt x: " + lowerLeftPt[0] + " lowerLeftPt y: " + lowerLeftPt[1]);
            console.log("lowerRightPt x: " + lowerRightPt[0] + " lowerRightPt y: " + lowerRightPt[1]);

            greenResult = this.checkIfPointInQuadrilateral(ptOfInterest, upperLeftPt, upperRightPt, lowerLeftPt, lowerRightPt); // checking if baby point in green section
            console.log("Result of check pt in quad green: " + greenResult);

            if(greenResult == 1)
            {
              chartInterpretation = "Great job! Your baby is following a healthy growth pattern.";
              this.interMessageColor = 'g';
            }


            upperLeftPt = [percentileData[7].data[xBounds[0]][0], percentileData[7].data[xBounds[0]][1]]; // point with x <= baby_x on 90th percentile line
            upperRightPt = [percentileData[7].data[xBounds[1]][0], percentileData[7].data[xBounds[0]][1]]; // point with x >= baby_x on 90th percentile line
            lowerLeftPt = [percentileData[9].data[xBounds[0]][0], percentileData[9].data[xBounds[0]][1]]; // point with x <= baby_x on 10th percentile line
            lowerRightPt = [percentileData[9].data[xBounds[1]][0], percentileData[9].data[xBounds[0]][1]]; // point with x >= baby_x on 10th percentile line

            console.log("ptOfInterest x: " + ptOfInterest[0] + " ptOfInterest y: " + ptOfInterest[1]);
            console.log("upperLeftPt x: " + upperLeftPt[0] + " upperLeftPt y: " + upperLeftPt[1]);
            console.log("upperRightPt x: " + upperRightPt[0] + " upperRightPt y: " + upperRightPt[1]);
            console.log("lowerLeftPt x: " + lowerLeftPt[0] + " lowerLeftPt y: " + lowerLeftPt[1]);
            console.log("lowerRightPt x: " + lowerRightPt[0] + " lowerRightPt y: " + lowerRightPt[1]);

            yellowUnderweightResult = this.checkIfPointInQuadrilateral(ptOfInterest, upperLeftPt, upperRightPt, lowerLeftPt, lowerRightPt); // checking if baby point in green section
            console.log("Result of check pt in quad green: " + yellowUnderweightResult);

            if(yellowUnderweightResult == 1)
            {
              chartInterpretation = "Your baby is moving towards an underweight pattern. Please discuss with your pediatrician.";
              this.interMessageColor = 'y';
            }

            else if(yellowUnderweightResult == 3)
            {
              chartInterpretation = "Your baby is NOT following a healthy growth pattern. He could be underweight. Follow up with your pediatrician soon."
              this.interMessageColor = 'r';
            }

            }

            console.log("Chart Interpretation: " + chartInterpretation);

        }
        babyChartTitle = "Male Weight-Length Chart";//change the title of the chart
        break;
    }

    this.chartOptions = {//new chart options
      series: seriesData,
      chart: {
        height: 690,
        width: 950,
        type: "line"
      },
      grid: {
        show: false
      },
      stroke: {
        curve: "straight",
        colors: ["#000000"],
        width: [3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
      },
      legend: {
        show: true,
        position: "right",
        markers: {
          width: 9,
          height: 9,
          strokeWidth: 0,
          strokeColor: '#fff',
          fillColors: ["#000000", "#cc0404", , "#fae102", "#fae102", "#1da302", "#1da302", "#1da302", "#1da302", "#fae102", "#fae102", "#cc0404", "#ffffff"]
      },
      },
      fill: {
        type: "solid",
        opacity: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        // white, red, yellow, yellow, green, green, green, green, green, yellow, yellow, red, white
        colors: ["#ffffff", "#cc0404", "#fae102", "#fae102", "#1da302", "#1da302", "#1da302", "#1da302", "#fae102", "#fae102", "#cc0404", "#ffffff"]

      },
      markers: {
        size: [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        colors: ['#000', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff'],
        strokeColors: '#000',
        strokeWidth: 2,
        strokeOpacity: 0.5,
        strokeDashArray: 0,
        fillOpacity: 1,
        discrete: [],
        shape: "circle",
        radius: 2,
        onClick: undefined,
        onDblClick: undefined,
        showNullDataPoints: true,
        hover: {
          size: undefined,
          sizeOffset: 3
        }
      },
      yaxis: [
        {
          title: {
            text: babyChartYAxisTitle,
            style: {
              color: "000",
              fontSize: '12px',
              fontFamily: 'Helvetica, Arial, sans-serif',
              fontWeight: 600,
              cssClass: 'apexcharts-yaxis-title',
            }
          },
          tickAmount: 9,
          forceNiceScale: true
        }
      ],
      xaxis: {
        labels: {
          show: true,
          style: {
            colors: [],
            fontSize: '12px',
            fontFamily: 'Helvetica, Arial, sans-serif',
            fontWeight: 400,
            cssClass: 'apexcharts-yaxis-label',
          },
          rotate: 0
        },
        title: {
          text: babyChartXAxisTitle,
          style: {
            color: "000",
            fontSize: '12px',
            fontFamily: 'Helvetica, Arial, sans-serif',
            fontWeight: 600,
            cssClass: 'apexcharts-yaxis-title',
          }
        },
        type: 'numeric',
        tickAmount: 10,
      },
      title: {
        text: babyChartTitle,
        align: "center",
        style: {
          fontSize:  '16px',
          fontWeight:  'bold',
          fontFamily:  undefined
        }
    },

      tooltip: {
        shared: true,
        intersect: false,
        x: {
          formatter: function (x) {
            if (typeof x !== "undefined") {
              return x.toFixed(0) + babyChartXAxisTooltip;
            }
            return x;
          }
        },
        y: {
          formatter: function (y) {
            if (typeof y !== "undefined") {
              return y.toFixed(0) + babyChartYAxisTooltip;
            }
            return y;
          }
        }
      }
    };
   }
   this.interMessage = chartInterpretation;


  }

  onChildrenChange() {
    // there is not data at all
    if (this.childrenList.length === 0) {
      if (this.currentParent.children === null) {
        this.currentParent.children = [] as FFQChildren[];
      }

      // creates children from the names available from the parent property childrennames
      if (this.currentParent.children.length === 0) {
        for (let name of this.currentParent.childrennames) {
          this.childrenList.push(new FFQChildren(name, [] as FFQChildData[]));
        }
      } else {
        // there is data from the child to retrive
        // creates children from the names available from the parent property childrennames
        for (let name of this.currentParent.childrennames) {
          this.childrenList.push(new FFQChildren(name, [] as FFQChildData[]));
        }
        // there is data from the child to retrievied
        for (let child of this.currentParent.children) {
          let index = this.childrenList.findIndex((x) => x.name === child.name);
          if (index > -1) {
            for (let data of child.childData)
              this.childrenList[index].addData(data);
          }
        }
      }
      let index = this.childrenList.findIndex(
        (x) => x.name === this.currentChildName
      );
      if (index > -1) {
        this.currentChild = this.childrenList[index];
      }
    }
    // this.onTypeChartChange(this.chosenChartOption);
  }


  onLangChange() {
    this.lang = !this.lang;
    if (this.translate.currentLang === "es") {
      this.translate.use("en-US");
    } else {
      this.translate.use("es");
    }
  }
  onHelp() {
    let data = { data: { langauge: this.translate.currentLang } };

    const dialogRef = this.dialog.open(GrowthChartsHelpComponent, data);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  /*
  {
    "name": "0",
    "value": "52",
    "series": "Tom"
  }
*/
  onSelect(selectedData: any): void {
    if (this.currentChild.name === selectedData.series) {
      //console.log("Item clicked", JSON.parse(JSON.stringify(selectedData)));

      let data;

      if (this.chosenChartOption === ChartOption.WeightAge) {
        data = {
          data: {
            title: "Weight Chart's Interpretation",
            value: selectedData.value,
            name: selectedData.series,
            messages: [
              "This calculator provides your child's weight percentile based on age. The percentile shows how your child's weight compares to other children. The percentile tells you what percentage of children weigh less than your child. For example out of a sample of 100 children, a percentile value of 40 percent means your child weighs more than 40 children and weighs less than the other 60.",
              "A percentile of 50% represents the average or mean weight. A value below 50 percent means a child weighs less than the average. A value greater than 50 percent means a child is above average. This does not mean your child is overweight or underweight. A doctor or physician should be consulted to determine weight status.",
            ],
          },
        };
      } else if (this.chosenChartOption === ChartOption.HeightAge) {
        data = {
          data: {
            title: "Height Chart's Interpretation",
            value: selectedData.value,
            name: selectedData.series,
            messages: [
              "This calculator provides your child's stature percentile based on age. Stature is the standing upright height of the child. The percentile shows how your child's height or stature compares to other children. The percentile tells you what percentage of children that have a height less than your child. For example out of a sample of 100 children, a percentile value of 45 percent means your child measures more than 45 children and measures less than the other 55 children.",
              "A percentile of 50% represents the average or mean height or stature. A value below 50 percent means a child measures less than the average or is shorter than average. A value greater than 50 percent means a child is above average or taller than average. This does not mean your child is short or tall. A doctor or physician should be consulted to determine height status.",
            ],
          },
        };
      } else if (this.chosenChartOption === ChartOption.WeightHeight) {
        data = {
          data: {
            title: "Weight - Height Chart's Interpretation",
            value: selectedData.value,
            name: selectedData.series,
            messages: [
              "This calculator provides your child's weight percentile based on stature. Stature is upright height or standing straight height. The percentile shows how your child's weight compares to other children of the same height. The percentile tells you what percentage of children weigh less than your child. For example out of a sample of 100 children, a percentile value of 40 percent means your child weighs more than 40 children and weighs less than the other 60 children.",
              "A percentile of 50% represents the average or mean weight. A value below 50 percent means a child weighs less than the average. A value greater than 50 percent means a child is above average. This does not mean your child is overweight or underweight. A doctor or physician should be consulted to determine weight status.",
            ],
          },
        };
      } else if (this.chosenChartOption === ChartOption.BMI) {
        data = {
          data: {
            title: "BMI Chart's Interpretation",
            value: selectedData.value,
            name: selectedData.series,
            message: [
              "This calculator provides body mass index (BMI) and the corresponding BMI-for-age percentile based on WHO growth charts for children ages 0 through 24 months. This calculator can help to determine whether a child is at a healthy weight for his/her height, age and gender. The amounts of body fat, muscle, and bone change with age, and differ between boys and girls. This BMI-calculator automatically adjusts for differences in height, age and gender, making it is one of the best tools for evaluating a growing child's weight. ",
              "Plotting a child's BMI-for-age on the appropriate WHO growth chart can alert parents to early signs that their child is gaining weight too fast, enabling them to help their child avoid developing weight problems by making small changes in their family's diet and physical activity habits. Keep in mind that BMI is not a diagnostic tool. BMI and BMI-percentile-for-age do not directly measure body fat. Very athletic kids can have a high BMI-for-age due to extra muscle mass, not necessarily excess body fat. As a result, a child may have a high BMI for their age and gender, but to determine if excess fat is a problem, a health care provider would need to perform further tests.",
            ],
          },
        };
      }

      const dialogRef = this.dialog.open(
        InterpretationGrowthChartsDialogComponent,
        data
      );

      dialogRef.afterClosed().subscribe((result) => {
        console.log(`Dialog result: ${result}`);
      });
    }
  }

  async creatingPdf() {
    // Charts are now rendered
    const chart = document.getElementById("chart-line");
    html2canvas(chart, {
      height: chart.scrollHeight,
      width: chart.clientWidth,
      scale: 3,
      backgroundColor: null,
      logging: false,
    }).then((canvas) => {
      // Get chart data so we can append to the pdf
      const chartData = canvas.toDataURL();

      // Prepare pdf structure
      const docDefinition = {
        content: [],
        styles: {
          tableHeader: {
            bold: true,
            fontSize: 13,
            color: "black",
          },
          subheader: {
            fontSize: 16,
            bold: true,
            margin: [0, 10, 0, 5],
            alignment: "left",
          },
          subsubheader: {
            fontSize: 12,
            italics: true,
            margin: [0, 10, 0, 25],
            alignment: "left",
          },
          table: {
            margin: [0, 5, 0, 15],
          },
        },
        defaultStyle: {
          // alignment: 'justify'
        },
        pageOrientation: "portrait",
      };

      // Add some content to the pdf
      const title = {
        text: `${this.currentChild.name}'s Data:`,
        style: "subheader",
      };

      let counter = 0;
      let graphData: string[] = [] as string[];
      graphData.push(`x: ${this.xaxis.title.text}, y: ${this.yaxis.title.text}\n`);
      for (let pointData of this.currentChild.childData) {
        switch (this.chosenChartOption) {
          case ChartOption.BMI:
            if (counter < 3) {
              graphData.push(
                `(x: ${pointData.age}, y: ${(
                  parseFloat(pointData.weight) /
                  Math.pow(
                    parseFloat(pointData.height) / FFQChildren.M_TO_CM,
                    2
                  )
                )}) `
              );
              counter++;
            } else {
              graphData.push(
                `(x: ${pointData.age}, y: ${(
                  parseFloat(pointData.weight) /
                  Math.pow(
                    parseFloat(pointData.height) / FFQChildren.M_TO_CM,
                    2
                  )
                )}) \n`
              );
              counter = 0;
            }

            break;
          case ChartOption.HeightAge:
            if (counter < 3) {
              graphData.push(`(x: ${pointData.age}, y: ${pointData.height}) `);
              counter++;
            } else {
              graphData.push(
                `(x: ${pointData.age}, y: ${pointData.height}) \n`
              );
              counter = 0;
            }
            break;
          case ChartOption.WeightAge:
            if (counter < 3) {
              graphData.push(`(x: ${pointData.age}, y: ${pointData.weight}) `);
              counter++;
            } else {
              graphData.push(
                `(x: ${pointData.age}, y: ${pointData.weight}) \n`
              );
              counter = 0;
            }
            break;
          case ChartOption.WeightHeight:
            if (counter < 3) {
              graphData.push(
                `(x: ${pointData.height}, y: ${pointData.weight}) `
              );
              counter++;
            } else {
              graphData.push(
                `(x: ${pointData.height}, y: ${pointData.weight}) \n`
              );
              counter = 0;
            }
            break;
        }
      }
      const description = {
        text: graphData.join(""),
        style: "subsubheader",
      };
      docDefinition.content.push(title);
      docDefinition.content.push(description);
      // Push image of the chart
      docDefinition.content.push({
        image: chartData,
        width: 450,
      });
      this.myDocDefinition = docDefinition;

      if (this.myDocDefinition) {
        let pdf = pdfMake.createPdf(this.myDocDefinition);
        this.loading = false;

        pdf.download(this.chosenChartOption + ".pdf");
      } else {
        console.log("Chart is not yet rendered!");
      }
    });
  }

  async onDownloadSave() {
    this.loading = true;
    await this.creatingPdf();
  }

  onActivate(): void {
    //console.log("Activate", JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(): void {
    //console.log("Deactivate", JSON.parse(JSON.stringify(data)));
  }


  getMBIChart(childGender: string) {
    if (childGender === Gender.Male) {
      this.currentGrowthChartData =
        GrowthChartData.BOYS_BMI_FOR_AGE_BIRTH_TO_TWO_YEARS_METRIC_SYSTEM;
    } else if (childGender === Gender.Female) {
      this.currentGrowthChartData =
        GrowthChartData.GIRLS_BMI_FOR_AGE_BIRTH_TO_TWO_YEARS_METRIC_SYSTEM;
    }
  }
  /*
    Gets the correct data for MBI charts depending on gender
  */
  getHeightAgeChart(childGender: Gender) {
    switch (this.heightUnitOptions) {
      case UnitsOfMeasurement.cm:
        if (childGender === Gender.Male) {
          this.currentGrowthChartData =
            GrowthChartData.BOYS_HEIGHT_FOR_AGE_BIRTH_TO_TWO_YEARS_METRIC_SYSTEM;
        } else if (childGender === Gender.Female) {
          this.currentGrowthChartData =
            GrowthChartData.GIRLS_HEIGHT_FOR_AGE_BIRTH_TO_TWO_YEARS_METRIC_SYSTEM;
        }
        break;
      case UnitsOfMeasurement.in:
        if (childGender === Gender.Male) {
          this.currentGrowthChartData =
            GrowthChartData.BOYS_HEIGHT_FOR_AGE_BIRTH_TO_TWO_YEARS_US_CUSTOMARY_SYSTEM;
        } else if (childGender === Gender.Female) {
          this.currentGrowthChartData =
            GrowthChartData.GIRLS_HEIGHT_FOR_AGE_BIRTH_TO_TWO_YEARS_US_CUSTOMARY_SYSTEM;
        }
        break;
    }
  }

  /*
    Gets the correct data for MBI charts depending on gender
  */
  getWeightAgeChart(childGender: Gender) {
    switch (this.weightUnitOptions) {
      case UnitsOfMeasurement.kg:
        if (childGender === Gender.Male) {
          this.currentGrowthChartData =
            GrowthChartData.BOYS_WEIGHT_FOR_AGE_BIRTH_TO_TWO_YEARS_METRIC_SYSTEM;
        } else if (childGender === Gender.Female) {
          this.currentGrowthChartData =
            GrowthChartData.GIRLS_WEIGHT_FOR_AGE_BIRTH_TO_TWO_YEARS_METRIC_SYSTEM;
        }
        break;
      case UnitsOfMeasurement.lb:
        if (childGender === Gender.Male) {
          this.currentGrowthChartData =
            GrowthChartData.BOYS_WEIGHT_FOR_AGE_BIRTH_TO_TWO_YEARS_US_CUSTOMARY_SYSTEM;
        } else if (childGender === Gender.Female) {
          this.currentGrowthChartData =
            GrowthChartData.GIRLS_WEIGHT_FOR_AGE_BIRTH_TO_TWO_YEARS_US_CUSTOMARY_SYSTEM;
        }
        break;
    }
  }

  /*
  Gets the correct data for Weight_vs_Height charts depending on gender and units of measurements.
  The data for WEIGHT_FOR_LENGTH_BIRTH_TO_TWO_YEARS for male and female has to many points to plot.
  So, to obtain more pleasant visual effects will be trimmed to a maximum 24 points (MAX_RANGE_MONTHS) when
  there is no point or at least one where the avg of the values of the child will be the media of the graph
   */
  getWeightHeightChart(childGender: Gender) {
    switch (this.weightUnitOptions) {
      case UnitsOfMeasurement.kg:
        if (this.heightUnitOptions === UnitsOfMeasurement.cm) {
          if (childGender === Gender.Male) {
            this.currentGrowthChartData =
              GrowthChartData.BOYS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_METRIC_SYSTEM;
          } else if (childGender === Gender.Female) {
            this.currentGrowthChartData =
              GrowthChartData.GIRLS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_METRIC_SYSTEM;
          }
        } else if (this.heightUnitOptions === UnitsOfMeasurement.in) {
          if (childGender === Gender.Male) {
            this.currentGrowthChartData =
              GrowthChartData.BOYS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_MIXED_SYSTEM_KG_VS_IN;
          } else if (childGender === Gender.Female) {
            this.currentGrowthChartData =
              GrowthChartData.GIRLS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_MIXED_SYSTEM_KG_VS_IN;
          }
        }
        break;
      case UnitsOfMeasurement.lb:
        if (this.heightUnitOptions === UnitsOfMeasurement.cm) {
          if (childGender === Gender.Male) {
            this.currentGrowthChartData =
              GrowthChartData.BOYS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_MIXED_SYSTEM_LB_VS_CM;
          } else if (childGender === Gender.Female) {
            this.currentGrowthChartData =
              GrowthChartData.GIRLS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_MIXED_SYSTEM_LB_VS_CM;
          }
        } else if (this.heightUnitOptions === UnitsOfMeasurement.in) {
          if (childGender === Gender.Male) {
            this.currentGrowthChartData =
              GrowthChartData.BOYS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_US_CUSTOMARY_SYSTEM;
          } else if (childGender === Gender.Female) {
            this.currentGrowthChartData =
              GrowthChartData.GIRLS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_US_CUSTOMARY_SYSTEM;
          }
        }
        break;
    }
  }

  /*
    Finds an optimal interval where pointX is centered and the range is total number of point in the interval
  */
  trimChartData(pointX: string, range: number, chartData: any[]) {
    let index = this.getIndex(
      pointX,
      chartData[0].series,
      0,
      chartData[0].series.length - 1
    );

    let suitableIndexLeft = index - range;
    let suitableIndexRight = index + range;

    while (suitableIndexLeft < 0) {
      suitableIndexLeft++;
    }

    while (suitableIndexRight >= chartData[0].series.length) {
      suitableIndexRight--;
    }

    let left = suitableIndexLeft;
    let min = Number.MAX_VALUE;

    do {
      if (
        Math.abs(index - suitableIndexLeft - (suitableIndexRight - index)) < min
      ) {
        left = suitableIndexLeft;
        suitableIndexRight = index + range - (index - left);
        min = Math.abs(
          index - suitableIndexLeft - (suitableIndexRight - index)
        );
      }
      suitableIndexLeft++;
    } while (
      suitableIndexLeft < index &&
      suitableIndexLeft + range - 1 < chartData[0].series.length
    );

    let startIndex = left;
    let ChartDataInRange: any[] = [];

    for (let percentile of chartData) {
      let chartDataSeries: any[] = [];
      for (let j = startIndex; j < startIndex + range; j++) {
        chartDataSeries.push(percentile.series[j]);
      }
      ChartDataInRange.push({ name: percentile.name, series: chartDataSeries });
    }
    return ChartDataInRange;
  }

  getIndex(
    pointX: string,
    dataChart: any[],
    startIndex: number,
    endIndex: number
  ) {
    if (endIndex >= startIndex) {
      let middleIndex = Math.floor((startIndex + endIndex) / 2);
      if (
        parseFloat(dataChart[middleIndex].name) === parseFloat(pointX) ||
        endIndex == startIndex
      )
        return middleIndex;

      if (parseFloat(dataChart[middleIndex].name) > parseFloat(pointX))
        return this.getIndex(pointX, dataChart, startIndex, middleIndex - 1);

      return this.getIndex(pointX, dataChart, middleIndex + 1, endIndex);
    }
    if (parseFloat(pointX) < parseFloat(dataChart[0].name)) return 0;
    if (parseFloat(pointX) > parseFloat(dataChart[dataChart.length - 1].name))
      return dataChart.length-1;
  }

  myDataExt(ffqparentList:FFQParent[]): any {

    // let returnableOne: [string];

    // let returnableTwo: [string];

    // for(let parent of ffqparentList) {

    //   for(let j = 0; j < this.ffqparentList.length; j++) {
    //     returnableOne.push(parent.children[parent.children.length-j-1].childData[0].weight);
    //     returnableOne.push(parent.children[parent.children.length-j-1].childData[0].height);
    //   }

    // }


    // let returnable = [returnableOne,returnableTwo];

    // return returnable;


    /*
    let bro = [];

    for(let i = 0; i < 10; i++) {
        bro[i] = i;
    }

    return bro;

    */

    let parents = [];

    let i = 0;

    const info = {
      name: 20,
      information: 20
    };

    for(let parent of ffqparentList) {

      for(let i = 0; i < parent.children.length; i++) {

      }


    }

    for(let parent of ffqparentList) {
      parents[i++] = parent;
    }

    return parents;

  }

  setDudeVariable(ffqparentList:FFQParent[]):void {

      this.dude = this.myDataExt(this.ffqparentList);

      console.log("Working!")

  }

  percentileCalculator(height:number,weight:number) : string {

    let percentileData = BOYS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_METRIC_SYSTEM;

    let percentileDataTwo = GIRLS_WEIGHT_FOR_HEIGHT_BIRTH_TO_TWO_YEARS_METRIC_SYSTEM;

    let minimumDifference = 1000000;

    let percentileToReturn = "";

    if(this.currentChildGender != Gender.NotAssigned) {

      // console.log("this.currentChildGender: "+this.currentChildGender);

      switch(this.currentChildGender) {

        case "male":

          for(let i = 0; i < 11; i++) {

            // console.log("Another time?");
            // console.log("percentileData[i].data: "+percentileData[i].data);

            for(let j = 0; j < percentileData[i].data.length; j++) {

            //   console.log("percentileData[i].data[j][0]: ",percentileData[i].data[j][0]);
            // console.log("height: "+height);
            // console.log("weight: "+weight);
            // console.log("percentileData[i].data[j][1]: "+percentileData[i].data[j][1]);


              if(percentileData[i].data[j][0] == height) {
                  if(Math.abs(weight-percentileData[i].data[j][1]) < minimumDifference) {
                    minimumDifference = Math.abs(weight-percentileData[i].data[j][1]);
                    percentileToReturn = percentileData[i].name;
                  }
              }

            }

        }

          break;

        case "female":

          for(let i = 0; i < 11; i++) {

              for(let j = 0; j < percentileDataTwo[i].data.length; j++) {

                if(percentileData[i].data[j][0] == height) {
                    if(Math.abs(weight-percentileDataTwo[i].data[j][1]) < minimumDifference) {
                    minimumDifference = Math.abs(weight-percentileData[i].data[j][1]);
                    percentileToReturn = percentileData[i].name;
                    }
                }

              }

          }

          break;

    }

    }

      return percentileToReturn;
  }

  setChildGender(setable):void {

    if(this.currentChildGender != Gender.NotAssigned) {

      switch(setable) {

        case "male":
          this.currentChildGender = setable;
          break;

        case "female":
          this.currentChildGender = setable;
          break;

        default:
          console.log("No appropriate gender selected");

      }

    }

    // console.log("This went here");
  }

  floorMethod(a:number) {
    return Math.floor(a);
  }

  important(ffqparentList:FFQParent[]) : any{
      let parentArray = [];

      for(let i = 0; i < ffqparentList.length; i++) {
        parentArray[i] = ffqparentList[i].children.length;
      }

      console.log("parentArray: "+ffqparentList[0].children.length);
      console.log("This went there");

      return parentArray;

  }

  importanttwo(ffqparent:FFQParent, k:number) : number {

    let toReturn = 0;

    console.log("k: "+k);
    for(let i = 0; i < this.childrenPerParentList.length; i++) {
      if(k >= 0 && k < this.childrenPerParentList.length) {
        toReturn = this.childrenPerParentList[k];
      }

    }

    return toReturn;

  }

  setChildPerParentList():void {
    this.childrenPerParentList = this.important(this.ffqparentList);
  }

  create(ffqparentList:FFQParent[],j:number):any {
    return [ffqparentList[j].children];
  }

  createArray(a:any):any {
    let dude = new Array(a.length);
    return dude;
  }

  checker(patientName:string, age:number,results:FFQResultsResponse[]):string {
    let date1 = "";

    results.forEach(result => {

      // console.log("result.ageInMonths: "+result.ageInMonths);
      // console.log("result.patientName: "+result.patientName);
      // console.log("patientName: "+patientName);
      // console.log("age: "+age);

      if(result.ageInMonths == age && result.patientName == patientName) {
        date1 = result.date;
        this.setChildGender(result.gender);
        return date1;
      }

    })

    return date1;

  }






}
