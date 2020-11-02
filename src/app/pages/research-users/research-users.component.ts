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
import { ResearcherParentService } from "../../services/researcher-parent/researcher-parent-service";
import { HttpErrorResponse } from "@angular/common/http";
import { ErrorDialogPopupComponent } from "src/app/components/error-dialog-popup/error-dialog-popup.component";
import { FFQFoodNutrientsResponse } from "src/app/models/ffqfoodnutrients-response";
import { PopupComponent } from "src/app/components/popup/popup.component";
import { FlashMessagesService } from "angular2-flash-messages";
import { moveItemInArray } from "@angular/cdk/drag-drop";
import { CdkDragDrop } from "@angular/cdk/drag-drop";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { CreateParentModalComponent} from "src/app/components/create-parent-modal/create-parent-modal.component"
import { FFQResearcherParentResponse } from 'src/app/models/ffqresearcherparent-response';

@Component({
  selector: "app-questionnaire-page",
  templateUrl: "./research-users.component.html",
  styleUrls: ["./research-users.component.css"],
})
export class ResearchUsersComponent implements OnInit {
  TITLE = "FFQR Research Portal";

  endpoint = environment.foodServiceUrl + "/ffq";

  constructor(
    public researchParentService: ResearcherParentService,
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

  dataLoaded: Promise<boolean>;

  participants: FFQResearcherParentResponse[] = [];

  ngOnInit() {
    this.findAllParticipants();

    /*let i: any;

        for(i in this.foodItems){
          this.foodItems[i].itemPosition = ++i;
        }*/
  }

  private handleFoodServiceError(error: HttpErrorResponse) {
    console.error("Error occurred.\n" + error.message);
    const dialogRef = this.errorDialog.open(ErrorDialogPopupComponent);
    dialogRef.componentInstance.title = "Error Fetching Food Items";
    dialogRef.componentInstance.message = error.message;
    dialogRef.componentInstance.router = this.router;
    dialogRef.afterClosed().subscribe(() => {
      this.router.navigateByUrl("/");
    });
  }

    private findAllParticipants() {
      this.researchParentService.getAllParents().subscribe(
        (data) => {
          data.map((response) => {
            this.participants.push(response);
            // this.foodNutrients.push(response);
          });
          console.log(this.participants);
          this.dataLoaded = Promise.resolve(true);
        },
        (error: HttpErrorResponse) => this.handleFoodServiceError(error)
      );
    }

  // private loadFoodsAndNutrients() {
  //   this.foodService.getAllFoods().subscribe(
  //     (data) => {
  //       data.map((response) => {
  //         this.foodItems.push(response);
  //         // this.foodNutrients.push(response);
  //       });
  //       console.log(this.foodItems);
  //       console.log(
  //         this.foodNutrients.length +
  //           " foods and its nutrients were returned from server."
  //       );
  //       this.foodItems = this.orderFoodItems(this.foodItems);
  //       this.dataLoaded = Promise.resolve(true);
  //     },
  //     (error: HttpErrorResponse) => this.handleFoodServiceError(error)
  //   );
  // }

  // Order participants
  // private orderFoodItems(items: FFQFoodItemResponse[]) {
  //   var orderedItems = items.sort(function (a, b) {
  //     return a.itemPosition - b.itemPosition;
  //   });
  //   return orderedItems;
  // }

  onOpenCreateParentModal(): void {
    const modalRef = this.modalService.open(CreateParentModalComponent);
  }

  // //added by teriq douglas
  // onDrop(event: CdkDragDrop<string[]>) {
  //   moveItemInArray(this.foodItems, event.previousIndex, event.currentIndex);
  //   let i: any;

  //   //update each food item with a new itemPosition
  //   for (i in this.foodItems) {
  //     this.foodItems[i].itemPosition = ++i;
  //   }
  //   //for loop with put calls for each element
  //   for (let i = 0; i < this.foodItems.length; i++) {
  //     this.update(i);
  //   }

  //   //or swap only 2 elements
  //   /*var temp = this.foodItems[event.previousIndex].itemPosition;
  //           this.foodItems[event.previousIndex].itemPosition = this.foodItems[event.currentIndex].itemPosition
  //           this.foodItems[event.currentIndex].itemPosition = temp;*/

  //   /*this.http.put(this.endpoint + '/update/' + this.foodItems[event.currentIndex].id, this.foodItems[event.currentIndex],
  //                     {headers : new HttpHeaders({ 'Content-Type': 'application/json' })}).subscribe((data) => {
  //                                   console.log(data);
  //                                 }, (error) => {console.log(error)});

  //   this.http.put(this.endpoint + '/update/' + this.foodItems[event.previousIndex].id, this.foodItems[event.previousIndex],
  //                          {headers : new HttpHeaders({ 'Content-Type': 'application/json' })}).subscribe((data) => {
  //                                        console.log(data);
  //                                      }, (error) => {console.log(error)});*/

  //   console.log(this.foodItems);
  // }

  // //added by teriq douglas
  // update(i: any) {
  //   this.http
  //     .put(
  //       this.endpoint + "/update/" + this.foodItems[i].id,
  //       this.foodItems[i],
  //       { headers: new HttpHeaders({ "Content-Type": "application/json" }) }
  //     )
  //     .subscribe(
  //       (data) => {
  //         console.log(data);
  //       },
  //       (error) => {
  //         console.log(error);
  //       }
  //     );
  //   //console.log(this.foodItems[i].id);
  // }
  // /* private updateArray(){
  //   this.foodService.getAllFoods().subscribe(data => {
  //         data.map(response => {
  //           this.foodItems.push(response);
  //         });*/
}
