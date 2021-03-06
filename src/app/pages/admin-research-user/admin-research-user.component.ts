
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
import {FFQClinicianResponse} from '../../models/ffqclinician-response';


@Component({
  selector: 'app-admin-researcher-user',
  templateUrl: './admin-research-user.component.html',
  styleUrls: ['./admin-research-user.component.css']
})
export class AdminResearcherUserComponent implements OnInit {
  showMsg = false;
  dissabled = false;
  username: string;
  userpassword: string;
  firstname: string;
  lastname: string;
  found: boolean;
  newPrefix: boolean;
  max = 0;
  newNumber: number;
  toStrip: string;
  limitNumberOfParticipants: number;
  AssignedResearchInstitutionName: string;
  assignedResearchInstitutionId: string;
  prefix: string;
  researcherName: string;
  noUsers: boolean;
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
  public ffqresearcList: FFQResearch[] = [];
  public ffqresearchInstitutionSelected: FFQResearchInstitutionResponse;
  researcherUserAttributes: FFQResearchtResponse;
  newUserId: string;
  institutionName: string[] = [];
  institutionIds: Map<string, string> = new Map<string, string>();
  researchInstitutionId: string;

  ngOnInit() {
    const researchInstitutionList: Observable<FFQResearchInstitutionResponse[]> = this.researchInstitutionService.getAllResearchInstitutions();
    researchInstitutionList.subscribe(institutionList => {
      this.researchInstitutionList = institutionList;
      institutionList.forEach(institution => {
        this.institutionIds.set(institution.researchInstitutionId, institution.institutionName);
        this.institutionName.push(institution.institutionName);
      });
    });

    const researchList: Observable<FFQResearchtResponse[]> = this.researcherService.getAllUsers();
    researchList.subscribe(a => {
      this.ffqresearcList = a;
    });
  }

  userNameCreator(){
    this.prefix = this.prefix.replace(/\s/g, '');
    for (let i = 0; i <= this.ffqresearcList.length - 1; i++){
      if (this.prefix === this.ffqresearcList[i].prefix && this.ffqresearcList[i].assignedResearchInstitutionId === this.assignedResearchInstitutionId){
        this.toStrip = this.prefix + '_Researcher';
        this.newNumber = parseInt(this.ffqresearcList[i].username.replace(this.toStrip, ''), 10);
        if (this.newNumber > this.max){
          this.max = this.newNumber;
        }
        this.newPrefix = false;
      }
      else if (this.ffqresearcList[i].assignedResearchInstitutionId !== this.assignedResearchInstitutionId && this.prefix === this.ffqresearcList[i].prefix) {
        this.found = true;
        break;
      }
      else if (this.ffqresearcList.length - 1 === i && this.newPrefix === undefined){
        this.newPrefix = true;
        this.researcherName = this.prefix + '_Researcher1';
        this.newNumber = 1;
        break;
      }
    }
  }
  addResearcherUser(form: NgForm) {
    if (this.ffqresearcList.length === 0){
      this.generatePassword();
      this.researcherName = this.prefix + '_Researcher1';
      this.ffqresearcherUser = new FFQResearchtResponse('1', this.researcherName, this.userpassword,
        'researcher', this.firstname, this.lastname, true, this.assignedResearchInstitutionId,
        this.limitNumberOfParticipants, this.prefix);
      this.noUsers = true;
    }
    const researcherList: Observable<FFQResearchtResponse[]> = this.researcherService.getAllUsers();
    researcherList.subscribe(data => {
      if (!this.noUsers) {
        const lastItem = data[data.length - 1];
        this.userNameCreator();

        if (!this.found) {
          this.generatePassword();
          this.newUserId = (parseInt(lastItem.userId, 10) + 1).toString();

          if (!this.newPrefix) {
            this.max++;
            this.researcherName = this.toStrip.replace(/\s/g, '') + (this.max).toString();
          }
          this.ffqresearcherUser = new FFQResearchtResponse(this.newUserId, this.researcherName, this.userpassword,
            'researcher', this.firstname, this.lastname, true, this.assignedResearchInstitutionId,
            this.limitNumberOfParticipants, this.prefix);
        }
      }
      if (!this.found || this.noUsers) {
        this.researcherService.addResearcher(this.ffqresearcherUser).subscribe(data => {
            const dialogRef = this.errorDialog.open(ErrorDialogPopupComponent);
            dialogRef.componentInstance.title = 'Researcher User: "' + this.ffqresearcherUser.firstname + ' ' +
              this.ffqresearcherUser.lastname + '" was added!';
            this.save2csvSingleResearcher();
            this.dissabled = true;
          },
          error => {
            const dialogRef = this.errorDialog.open(ErrorDialogPopupComponent);
            dialogRef.componentInstance.title = error.error.message;
          });
      }
      if (this.found) {
        const dialogRef = this.errorDialog.open(ErrorDialogPopupComponent);
        this.router.navigateByUrl('/admin/research/users');
        dialogRef.componentInstance.title = 'This prefix is already in use by another Research Institution';
      }
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
    this.researchInstitutionList.forEach(item => {
      if (this.assignedResearchInstitutionId === item.researchInstitutionId)
      {
        this.AssignedResearchInstitutionName = item.institutionName;
      }
    });
    this.data[0].userName = 'Assingned Research site: ';
    this.data[0].password = this.AssignedResearchInstitutionName;
    this.data[1].userName = 'Assingned Research site ID: ';
    this.data[1].password = this.assignedResearchInstitutionId;
    this.data[2].userName = '';
    this.data[2].password = '';
    this.data[3].userName = 'User Name';
    this.data[3].password = 'Password';
    this.data[4].userName = '';
    this.data[4].password = '';
    this.data[5].userName = this.researcherName;
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
