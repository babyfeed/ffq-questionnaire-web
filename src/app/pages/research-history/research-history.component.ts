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
import { FoodItemService } from "../../services/food-item/food-item.service";
import { HttpErrorResponse } from "@angular/common/http";
import { ErrorDialogPopupComponent } from "src/app/components/error-dialog-popup/error-dialog-popup.component";
import { FFQFoodNutrientsResponse } from "src/app/models/ffqfoodnutrients-response";
import { PopupComponent } from "src/app/components/popup/popup.component";
import { FlashMessagesService } from "angular2-flash-messages";
import { FFQFoodItemResponse } from "src/app/models/ffqfooditem-response";
import { moveItemInArray } from "@angular/cdk/drag-drop";
import { CdkDragDrop } from "@angular/cdk/drag-drop";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Component({
  selector: "research-history",
  templateUrl: "./research-history.component.html",
  styleUrls: ["./research-history.component.css"],
})
export class ResearchHistoryComponent implements OnInit {
  TITLE = "FFQR Research Portal";

  endpoint = environment.foodServiceUrl + "/ffq";

  constructor(
    public foodService: FoodItemService,
    private activatedRoute: ActivatedRoute,
    private errorDialog: MatDialog,
    private submissionErrorDialog: MatDialog,
    private httpErrorDialog: MatDialog,
    private successDialog: MatDialog,
    private router: Router,
    private modalService: NgbModal,
    private flashMessage: FlashMessagesService,
    private http: HttpClient
  ) {}



  ngOnInit() {
    
  }

 
}
