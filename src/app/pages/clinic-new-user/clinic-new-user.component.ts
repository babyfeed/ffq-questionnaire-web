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
  }

  ngOnInit() {
    combineLatest([this.currentUser$, this.ffqclinicList$]).pipe(
      skipWhile(([users, clinics]) => users.length === 0 || clinics.length === 0),
      take(1))
      .subscribe(([user, clinics]) => {
        this.selectedClinic = clinics.find(c => c.clinicId === user[0].assignedclinic);
      });
  }

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
    const ffqclinician = new FFQClinician('', '', '', '', '', '', this.selectedClinic.clinicId, [], true, this.parentLimitForClinician);

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
      newClinicians.push(new FFQClinician('', '', '', '', '', '', this.selectedClinic.clinicId, [], true, this.parentLimitForClinician));
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

  addParent() {
    this.ffqParent = new FFQParent('', '', '', 'parent', '', '', this.selectedClinic.clinicId, '', [''], true);
    this.parentService.addParent(this.ffqParent).subscribe(parent => {
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
    for (let i = 0; i < this.usersQuantity; i++) {
      newParents.push(new FFQParent('', '', '', 'parent', '', '', this.selectedClinic.clinicId, '', [''], true));
    }

    this.parentService.addMultipleParents(newParents).subscribe(clinicians => {
        const dialogRef = this.errorDialog.open(ErrorDialogPopupComponent);
        dialogRef.componentInstance.title = 'Users<br/>' + clinicians.map(clinician => clinician.username).join('<br/>') + '<br/>were added!';
      },
      error => {
        const dialogRef = this.errorDialog.open(ErrorDialogPopupComponent);
        dialogRef.componentInstance.title = error.error.message;
      });
  }
}

