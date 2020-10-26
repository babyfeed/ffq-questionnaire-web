/*

  Added by Javier Romero
  This is the create/edit user page for the admin portal
  (admin/user, which differs from admin/users, which is the list all users page).
  From here, the admin will create users or edit existing ones.
  Users can also be deleted from the databases from here.

*/

import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {ErrorDialogPopupComponent} from 'src/app/components/error-dialog-popup/error-dialog-popup.component';
import {Subscription} from 'rxjs/internal/Subscription';
import {Observable} from 'rxjs';
import {ParentService} from 'src/app/services/parent/parent-service';
import {ClinicianService} from 'src/app/services/clinician/clinician-service';
import {FFQParent} from 'src/app/models/ffqparent';
import {FFQClinician} from 'src/app/models/ffqclinician';
import {ClinicService} from 'src/app/services/clinic/clinic-service';
import {FFQClinic} from 'src/app/models/ffqclinic';
import {Usertype} from "../../models/usertype.enum";

@Component({
  selector: 'app-clinic-new-user',
  templateUrl: './clinic-new-user.component.html',
  styleUrls: ['./clinic-new-user.component.css']
})
export class ClinicNewUserComponent implements OnInit {

  private routeSub: Subscription;
  selectedClinic: string;
  userType: Usertype;
  userTypes = Usertype;
  ffqParent: FFQParent;
  public ffqclinicList$: Observable<FFQClinic[]>;
  usersQuantity = 1;

  constructor(
    public parentService: ParentService,
    public clinicianService: ClinicianService,
    private errorDialog: MatDialog,
    private router: Router,
    public clinicService: ClinicService,
  ) {
    this.ffqclinicList$ = this.clinicService.getAllClinics();
  }

  ngOnInit() {
  }

  addUser() {

    switch (this.userType) {
      case Usertype.Clinician: {
        if (this.usersQuantity === 1) {
          this.addClinician();
        } else {
          console.log("adding multiple clinicians")
          this.addMultipleClinicians();
        }
        break;
      }
      case Usertype.Parent: {
        if (this.usersQuantity === 1) {
          this.addParent();
        } else {
          console.log("adding multiple clinicians")
          this.addMultipleParents();
        }
        break;
      }
    }
  }

  addClinician() {
    const ffqclinician = new FFQClinician("", "", "", "", "", "", this.selectedClinic, [], true);

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
      newClinicians.push(new FFQClinician("", "", "", "", "", "", this.selectedClinic, [], true));
    }

    this.clinicianService.addMultipleClinicians(newClinicians).subscribe(clinicians => {
        const dialogRef = this.errorDialog.open(ErrorDialogPopupComponent);
        dialogRef.componentInstance.title = clinicians.map(clinician => clinician.username).join("<br/>") + '<br/>were added!';
      },
      error => {
        const dialogRef = this.errorDialog.open(ErrorDialogPopupComponent);
        dialogRef.componentInstance.title = error.error.message;
      });
  }

  addParent() {
    this.ffqParent = new FFQParent("", "", "", "parent", "", "", this.selectedClinic, "", [""], true);
    console.log(this.ffqParent);

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
      newParents.push(new FFQParent("", "", "", "parent", "", "", this.selectedClinic, "", [""], true));
    }

    this.parentService.addMultipleParents(newParents).subscribe(clinicians => {
        const dialogRef = this.errorDialog.open(ErrorDialogPopupComponent);
        dialogRef.componentInstance.title = clinicians.map(clinician => clinician.username).join("<br/>") + '<br/>were added!';
      },
      error => {
        const dialogRef = this.errorDialog.open(ErrorDialogPopupComponent);
        dialogRef.componentInstance.title = error.error.message;
      });
  }
}

