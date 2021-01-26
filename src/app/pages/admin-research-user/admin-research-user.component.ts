
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogPopupComponent } from 'src/app/components/error-dialog-popup/error-dialog-popup.component';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/internal/Subscription';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { ResearchInstitutionService } from 'src/app/services/research-institution-service/research-institution-service';
import { FFQResearchtResponse } from 'src/app/models/ffqresearch-response';
import { FFQResearchParticipant } from 'src/app/models/ffqresearch-participant';
import {FFQResearch} from 'src/app/models/ffqresearch';
import { FFQClinician } from 'src/app/models/ffqclinician';
import { FFQClinicResponse } from 'src/app/models/ffqclinic-response';
import { ClinicService } from 'src/app/services/clinic/clinic-service';
import { FFQInstitution } from 'src/app/models/ffqinstitution';
import { ResearchService } from 'src/app/services/research/research-service';
import { FFQParentResponse } from 'src/app/models/ffqparent-response';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeletePopupComponent } from 'src/app/components/delete-popup/delete-popup.component';
import { FFQResearchInstitutionResponse } from 'src/app/models/ffqresearch-institution-response';


@Component({
  selector: 'app-admin-researcher-user',
  templateUrl: './admin-research-user.component.html',
  styleUrls: ['./admin-research-user.component.css']
})
export class AdminResearcherUserComponent implements OnInit {

  private routeSub: Subscription;
  private isNew: boolean;
  private isUpdate: boolean;
  showMsg = false;
  dissabled = false;
  username: string;
  userpassword: string;
  firstname: string;
  lastname: string;
  limitNumberOfParticipants: number;
  AssignedResearchInstitutionName: string;
  AssignedResearchInstitutionId: string;
  prefix: string;
  clinicianName: string;
  data = [];
  options = {
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalseparator: '.',
    showLabels: false,
    headers: [],
    showTitle: true,
    title: 'Researcher Login',
    titles: 'User Info',
    useBom: false,
    removeNewLines: true,
    keys: ['userName', 'password' ]
  };



  resultObjectList: Object[] = [];

  constructor(
    public researcherService: ResearchService,
    public researchInstitutionService: ResearchInstitutionService,
    private errorDialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: NgbModal

    ) { }

  researchInstitutionList: FFQResearchInstitutionResponse[];
  researcher: FFQResearchtResponse[] = [];
  dataLoaded: Promise<boolean>;
  ffqresearcherUser: FFQResearchtResponse;
  public ffqresearcherList: FFQResearch[] = [];
  public ffqresearchInstitutionSelected: FFQResearchInstitutionResponse;
  researcherUserAttributes: FFQResearchtResponse;
  newUserId: string;

  ngOnInit() {

    const researchInstitutionList: Observable<FFQResearchInstitutionResponse[]> = this.researchInstitutionService.getAllResearchInstitutions();
    researchInstitutionList.subscribe(a => {
      this.researchInstitutionList = a;
    });



  }

  addResearcherUser(form: NgForm){

     const researcherList: Observable<FFQResearchtResponse[]> = this.researcherService.getAllUsers();

     researcherList.subscribe(data => {

      // getting last element in the list
      const lastItem = data[data.length - 1];
      this.generatePassword();
      this.newUserId = (parseInt(lastItem.userId) + 1).toString();
      // Check if user does not exist in the DB before saving
      // var researcherIdAlreadyExist = this.researcherService.getUser(this.newUserId);
      // console.log("user found: ", researcherIdAlreadyExist);


      const selectedResearchInst: Observable<FFQResearchInstitutionResponse> =
            this.researchInstitutionService.getResearchInstitutionByName(this.AssignedResearchInstitutionName);

      selectedResearchInst.subscribe(data => {
      console.log(data);
      this.AssignedResearchInstitutionId = data.researchInstitutionId;
      this.prefix = this.prefix.replace(/\s/g, '');
      this.ffqresearcherUser = new FFQResearchtResponse(this.newUserId, this.prefix + 'Researcher' + this.newUserId , this.userpassword, 'researcher',
                this.firstname, this.lastname, true, this.AssignedResearchInstitutionId, this.limitNumberOfParticipants, this.prefix);

      console.log('object to be sent', this.ffqresearcherUser);

      this.researcherService.addResearcher(this.ffqresearcherUser).subscribe(data => {
              console.log('object created', data);
              const dialogRef = this.errorDialog.open(ErrorDialogPopupComponent);
              dialogRef.componentInstance.title = 'Researcher User: "' + this.ffqresearcherUser.firstname +  ' ' +
          this.ffqresearcherUser.lastname + '" was added!';
              this.save2csvSingleResearcher();
              this.dissabled = true;
      },
      error => {
          const dialogRef = this.errorDialog.open(ErrorDialogPopupComponent);
          dialogRef.componentInstance.title = error.error.message;
      });
      });
      });
  }
  dataLoop(){
    for (let i = 0; i < 6; i++){
      this.data[i] = [
        {
          userName: '',
          password: ''
        },
      ];
    }
  }
  save2csvSingleResearcher() {
    this.dataLoop();
    this.data[0].userName = 'Assingned Research site: ';
    this.data[0].password = this.AssignedResearchInstitutionName;
    this.data[1].userName = 'Assingned Research site ID: ';
    this.data[1].password = this.AssignedResearchInstitutionId;
    this.data[2].userName = '';
    this.data[2].password = '';
    this.data[3].userName = 'User Name';
    this.data[3].password = 'Password';
    this.data[4].userName = '';
    this.data[4].password = '';
    this.data[5].userName = this.prefix + 'Researcher' + this.newUserId;
    this.data[5].password = this.userpassword;
  }
  private getResearcherUserById(id: string)
  {
      this.researcherService.getUser(id).subscribe(data => {
       this.researcherUserAttributes = data;
      });
      this.dataLoaded = Promise.resolve(true);
  }



  updateResearcherUser()
  {
    this.researcherService.updateUser(this.ffqresearcherUser as FFQResearchtResponse).subscribe(
     data => {this.router.navigateByUrl('admin/research/users');
              const dialogRef = this.errorDialog.open(ErrorDialogPopupComponent);
              dialogRef.componentInstance.title = 'Research User successfully updated!'; }

    );
  }

  deleteResearchInstitution(){
    const confirmDelete = this.modalService.open(DeletePopupComponent);
    confirmDelete.componentInstance.service = 'researchers';
    confirmDelete.componentInstance.attributes = this.researcherUserAttributes;
  }

  generatePassword() {
    this.userpassword = Math.random().toString(36).slice(-10);
  }
}




