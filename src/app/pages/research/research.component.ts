/*

  Added by Javier Romero
  This is the create/edit clinics page from the admin portal (admin/clinic).
  From here, the admin will create a clinic and define its attributes or edit an existing one.
  Existing clinics can also be deleted here.

*/

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogPopupComponent } from 'src/app/components/error-dialog-popup/error-dialog-popup.component';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/internal/Subscription';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { FFQInstitution } from 'src/app/models/ffqinstitution';
import { FFQInstitutionResponse } from 'src/app/models/ffqinstitution-response';
import { InstitutionService } from 'src/app/services/institution/institution-service';
import { FFQResearch } from 'src/app/models/ffqresearch';
import { FFQResearchtResponse} from 'src/app/models/ffqresearch-response';
import { ResearchService } from 'src/app/services/research/research-service';
import { ParentService } from 'src/app/services/parent/parent-service';
import { FFQParentResponse } from 'src/app/models/ffqparent-response';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeletePopupComponent } from "src/app/components/delete-popup/delete-popup.component";



@Component({
  selector: 'app-fooditem',
  templateUrl: './clinic.component.html',
  styleUrls: ['./clinic.component.css']
})
export class ResearchComponent implements OnInit {

  private routeSub: Subscription;
  private isNew: boolean;
  private isUpdate: boolean;
  showMsg: boolean = false;
  name_of_institution: string;
  usersLimit: number;
  location: string;
  allResearchers: FFQResearch[] = [];
  resultObjectList: Object[] = [];

  constructor(
    public parentService: ParentService,
    public researchService: ResearchService,
    public institutionService: InstitutionService,
    private errorDialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: NgbModal

    ) { }


  clinicians: FFQResearchtResponse[] = [];
  parents: FFQParentResponse[] = [];

  institutionAttributes: object;
  dataLoaded: Promise<boolean>;

  ffqinstitution: FFQInstitution;
  institutionnumber: number;
  institution: number;

  public ffqresearcherList: FFQResearch[] = [];
  researcherNames: string[] = [];


  ngOnInit() {

    this.researcherNames.push("");

    const UserID = this.route.snapshot.paramMap.get('id');
    if (UserID == "new"){

      this.isNew = true;
      this.institutionnumber = this.institution;
      this.dataLoaded = Promise.resolve(true);
    }
    else
    {
      this.isUpdate = true;
      this.getInstitutionById(UserID);
    }


    var clinicianList: Observable<FFQResearchtResponse[]> = this.researchService.getAllUsers();
      clinicianList.subscribe(a => {
      this.ffqresearcherList = a;
      for (let i = 0; i < a.length; i++) {
        this.researcherNames.push(a[i].firstname + " " + a[i].lastname); // removed abreviation because researcher does not contain it
      }
    });

  }

  addClinic(form:NgForm){

    var clinicList: Observable<FFQResearchtResponse[]> = this.researchService.getAllUsers();

    clinicList.subscribe(data => {
      var newInstitutionId = (data.length+1).toString();
      this.ffqinstitution = new FFQInstitution(newInstitutionId, this.location, "", this.name_of_institution, "", false, this.usersLimit);
      console.log(this.ffqinstitution);

      this.institutionService.addInstitution(this.ffqinstitution).subscribe(data => {
          console.log("data: " + data);
          this.router.navigateByUrl('/admin/clinics');
          const dialogRef = this.errorDialog.open(ErrorDialogPopupComponent);
          dialogRef.componentInstance.title = 'Institution with id ' +  newInstitutionId + ' was added!';
      },
      error =>{
          const dialogRef = this.errorDialog.open(ErrorDialogPopupComponent);
          dialogRef.componentInstance.title = error.error.message;
      });

    });
}

  private getInstitutionById(id: string)
  {
      this.institutionService.getInstitution(id).subscribe(data => {
       this.institutionAttributes = data;
      });
      this.dataLoaded = Promise.resolve(true);
  }



  updateInstitution()
  {
    this.institutionService.updateInstitution(<FFQInstitutionResponse>this.institutionAttributes).subscribe(
     data => {this.router.navigateByUrl('/admin/clinics');
     const dialogRef = this.errorDialog.open(ErrorDialogPopupComponent);
     dialogRef.componentInstance.title = 'Clinic successfully updated!';}

    );
  }

  deleteInstitution(){
    const confirmDelete = this.modalService.open(DeletePopupComponent);
    confirmDelete.componentInstance.service = "Clinic";
    confirmDelete.componentInstance.attributes = this.institutionAttributes;
  }
}




