import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {ErrorDialogPopupComponent} from 'src/app/components/error-dialog-popup/error-dialog-popup.component';
import {Subscription} from 'rxjs/internal/Subscription';
import {combineLatest, Observable} from 'rxjs';
import {ParentService} from 'src/app/services/parent/parent-service';
import {ClinicianService} from 'src/app/services/clinician/clinician-service';
import {FFQParent} from 'src/app/models/ffqparent';
import {FFQClinician} from 'src/app/models/ffqclinician';
import {ClinicService} from 'src/app/services/clinic/clinic-service';
import {FFQClinic} from 'src/app/models/ffqclinic';
import {Usertype} from '../../models/usertype.enum';
import {AuthenticationService} from '../../services/authentication/authentication.service';
import {User} from '../../models/user';
import {skipWhile, take} from 'rxjs/operators';
import {FFQParentResponse} from "../../models/ffqparent-response";

@Component({
  selector: 'app-clinic-new-user',
  templateUrl: './clinic-new-user.component.html',
  styleUrls: ['./clinic-new-user.component.css']
})
export class ClinicNewUserComponent implements OnInit {

  selectedClinic: FFQClinic;
  userType = Usertype.Parent;
  userTypes = Usertype;
  ffqParent: FFQParent;
  ffqclinicList$: Observable<FFQClinic[]>;
  usersQuantity = 1;
  currentUser$: Observable<FFQClinician[]>;
  private parentLimitForClinician: number;
  currentUser: Observable<FFQClinician[]>;
  loggedInUser = this.authenticationService.currentUserValue;
  clicked = false;
  noMoreRoom = false;
  limit = this.loggedInUser[0].parentLimitForClinician;
  numParents = 0;
  prefix = this.loggedInUser[0].prefix;
  lastUserId;
  suffix;
  userPassword;

  constructor(
    public parentService: ParentService,
    public clinicianService: ClinicianService,
    private errorDialog: MatDialog,
    private router: Router,
    public clinicService: ClinicService,
    private authenticationService: AuthenticationService
  ) {
    this.ffqclinicList$ = this.clinicService.getAllClinics();
    this.currentUser$ = this.authenticationService.currentUser as unknown as Observable<FFQClinician[]>;
    this.currentUser = this.currentUser$;
  }

  numberOfPatients: number[] = [];

  ffqparentList: FFQParent[] = [];


  ngOnInit() {
    combineLatest([this.currentUser$, this.ffqclinicList$]).pipe(
      skipWhile(([users, clinics]) => users.length === 0 || clinics.length === 0),
      take(1))
      .subscribe(([user, clinics]) => {
        this.selectedClinic = clinics.find(c => c.clinicId === user[0].assignedclinic);


      });

    const parentList: Observable<FFQParentResponse[]> = this.parentService.getAllParents();
    parentList.subscribe(a => {
      this.ffqparentList = a;
    });
  }
  countParents(){
    for (let i = 0; i < this.ffqparentList.length; i++){
    if (this.loggedInUser[0].userId === this.ffqparentList[i].assignedclinician){
      this.limit --;
      this.numParents ++;
  }
    if (this.limit <= 0){
      this.limit = 0;
      this.noMoreRoom = true;
    }
  }}
  addUser() {
    switch (this.userType) {
      case Usertype.Clinician: {
        if (this.usersQuantity === 1) {
          this.addClinician();
        } else {
          this.addMultipleClinicians();
        }
        break;
      }
      case Usertype.Parent: {
        if (this.usersQuantity === 1) {
          this.addParent();
        } else {
          this.addMultipleParents();
        }
        break;
      }
    }
  }

  addClinician() {
    const ffqclinician = new FFQClinician('', '', '', '', '', '', this.selectedClinic.clinicId, [], true, this.parentLimitForClinician, this.prefix);

    this.clinicianService.addClinician(ffqclinician).subscribe(clinician => {
        const dialogRef = this.errorDialog.open(ErrorDialogPopupComponent);
        dialogRef.componentInstance.title = clinician.username + ' was added!';
      },
      error => {
        const dialogRef = this.errorDialog.open(ErrorDialogPopupComponent);
        dialogRef.componentInstance.title = error.error.message;
      });
  }

  addMultipleClinicians() {
    const newClinicians = [];
    for (let i = 0; i < this.usersQuantity; i++) {
      newClinicians.push(new FFQClinician('', '', '', '', '', '', this.selectedClinic.clinicId, [], true, this.parentLimitForClinician, this.prefix));
    }

    this.clinicianService.addMultipleClinicians(newClinicians).subscribe(clinicians => {
        const dialogRef = this.errorDialog.open(ErrorDialogPopupComponent);
        dialogRef.componentInstance.title = 'Users<br/>' + clinicians.map(clinician => clinician.username).join('<br/>') + '<br/>were added!';
      },
      error => {
        const dialogRef = this.errorDialog.open(ErrorDialogPopupComponent);
        dialogRef.componentInstance.title = error.error.message;
      });
  }
  getSuffix(){
    if (this.ffqparentList.length === 0){
      this.suffix = 1;
    } else {
    this.lastUserId = this.ffqparentList[this.ffqparentList.length - 1].userId;
    this.suffix = parseInt(this.lastUserId, 10) + 1;
  }}
  addParent() {
    this.getSuffix();
    if (this.prefix !== '' || this.prefix === "") {
      this.ffqParent = new FFQParent('', '', '', 'parent', '',
        '', this.selectedClinic.clinicId, this.loggedInUser[0].userId, [''], true);
    }
    else {                                                              //leaving password like this for now until file download is possible
      this.ffqParent = new FFQParent('', this.prefix + this.suffix, this.prefix + this.suffix.toString(), 'parent', '', '', this.selectedClinic.clinicId, this.loggedInUser[0].userId, [''], true);
    }
    this.parentService.addParent(this.ffqParent).subscribe(parent  => {
        this.router.navigateByUrl('/clinic/home');
        const dialogRef = this.errorDialog.open(ErrorDialogPopupComponent);
        dialogRef.componentInstance.title = parent.username + ' was added!';
      },
      error => {
        const dialogRef = this.errorDialog.open(ErrorDialogPopupComponent);
        dialogRef.componentInstance.title = error.error.message;
      });
  }

  addMultipleParents() {
    const newParents = [];
    this.getSuffix();
    if (this.prefix !== '' || this.prefix === "") {
      for (let i = 0; i < this.usersQuantity; i++) {
        newParents.push(new FFQParent('', '', '', 'parent', '', '', this.selectedClinic.clinicId, this.loggedInUser[0].userId, [''], true));
        this.suffix++;
      }
    }
    else {
    for (let i = 0; i < this.usersQuantity; i++) {                        //leaving password like this for now until file download is possible
      newParents.push(new FFQParent('', this.prefix + this.suffix.toString(), this.prefix + this.suffix.toString(), 'parent', '', '', this.selectedClinic.clinicId, this.loggedInUser[0].userId, [''], true));
      this.suffix++;
    }}

    this.parentService.addMultipleParents(newParents).subscribe(clinicians => {
        this.router.navigateByUrl('/clinic/home');
        const dialogRef = this.errorDialog.open(ErrorDialogPopupComponent);
        dialogRef.componentInstance.title = 'Users<br/>' + clinicians.map(clinician => clinician.username).join('<br/>') + '<br/>were added!';
      },
      error => {
        const dialogRef = this.errorDialog.open(ErrorDialogPopupComponent);
        dialogRef.componentInstance.title = error.error.message;
      });
  }
  generatePassword() {
    this.userPassword = Math.random().toString(36).slice(-10);
  }
}

