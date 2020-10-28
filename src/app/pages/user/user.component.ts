/*

  Added by Javier Romero
  This is the create/edit user page for the admin portal
  (admin/user, which differs from admin/users, which is the list all users page).
  From here, the admin will create users or edit existing ones.
  Users can also be deleted from the databases from here.

*/

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogPopupComponent } from 'src/app/components/error-dialog-popup/error-dialog-popup.component';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/internal/Subscription';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { ParentService } from 'src/app/services/parent/parent-service';
import { ClinicianService } from 'src/app/services/clinician/clinician-service';
import { FFQClinicianResponse } from 'src/app/models/ffqclinician-response';
import { FFQParent } from 'src/app/models/ffqparent';
import { FFQClinician } from 'src/app/models/ffqclinician';
import { FFQParentResponse } from 'src/app/models/ffqparent-response';
import { FFQClinicResponse } from 'src/app/models/ffqclinic-response';
import { ClinicService } from 'src/app/services/clinic/clinic-service';
// import { ClinicianService } from 'src/app/services/clinic/clinic-service';
import { FFQClinic } from 'src/app/models/ffqclinic';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeletePopupComponent } from 'src/app/components/delete-popup/delete-popup.component';
import {Usertype} from '../../models/usertype.enum';

@Component({
  selector: 'app-fooditem',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  TITLE = 'FFQR Food Item Portal';
  private routeSub: Subscription;
  public isNew: boolean;
  public isUpdate: boolean;
  private createParents: boolean;
  private createClinician: boolean;
  showMsg = false;
  selectedClinic: string;
  selectedClinician: string;
  cliniId: string;
  usersLimits: number;
  // testing: string;
  numClinician: number;
  numParent: number;
  able2Add: number;
  userType: Usertype;
  userTypes = Usertype;
  ffqParent: FFQParent;
  public ffqclinicList$: Observable<FFQClinic[]>;
  public ffqclinicianList$: Observable<FFQClinician[]>;
  usersQuantity = 1;
  userId: string;

  constructor(
    public parentService: ParentService,
    public clinicianService: ClinicianService,
    private errorDialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    public clinicService: ClinicService,

    private modalService: NgbModal


    ) {
    this.ffqclinicList$ = this.clinicService.getAllClinics();
    this.ffqclinicianList$ = this.clinicianService.getAllClinicians();

  }

  userAttributes: object;
  dataLoaded: Promise<boolean>;

  ffqclinician: FFQClinician;
  amountToAdd: number;
  isParent: boolean;
  isClinician: boolean;

  public ffqclinicList: FFQClinic[] = [];
  public ffqclinicianList: FFQClinician[] = [];
  public ffqparentList: FFQParent[] = [];
  clinicNames: string[] = [];
  clinicIds: Map<string, string> = new Map<string, string>();
  clinicId: string;

  ngOnInit() {

    this.createParents = false;
    this.createClinician = false;
    this.isParent = false;
    this.isClinician = false;
    this.clinicNames.push('');

    const UserType = this.route.snapshot.paramMap.get('type');
    const UserID = this.route.snapshot.paramMap.get('id');

    if (UserID === 'new')
    {
      this.isNew = true;
      this.dataLoaded = Promise.resolve(true);
    }
    else
    {
      this.isUpdate = true;
      if (UserType === 'p')
      {
        this.getParentByID(UserID);
      }
      else
      {
        this.getClinicianByID(UserID);
      }
    }

    const clinicListObservable: Observable<FFQClinicResponse[]> = this.clinicService.getAllClinics();
    clinicListObservable.subscribe(clinicList => {
      this.ffqclinicList = clinicList;
      clinicList.forEach(clinic => {
        this.clinicIds.set(clinic.clinicname, clinic.clinicId);
        this.clinicNames.push(clinic.clinicname);
      });
    });

    const parentList: Observable<FFQParentResponse[]> = this.parentService.getAllParents();
    parentList.subscribe(a => {
      this.ffqparentList = a;
    });

    const clinicianList: Observable<FFQClinicianResponse[]> = this.clinicianService.getAllClinicians();
    clinicianList.subscribe(a => {
      this.ffqclinicianList = a;
    });
  }

  selectChangeHandler(event: any)
  {
    this.numClinician = 0;
    this.numParent = 0;
    this.able2Add = 0;
    this.clinicId = event.value;
    for (const item of this.ffqclinicList) {
      if (this.clinicId === item.clinicId)
      {
        this.usersLimits = item.usersLimit;
        // this.testing = item.clinicname;
      }
    }

    for (let i = 0; i < this.ffqclinicianList.length; i++){
      if (this.clinicId === this.ffqclinicianList[i].assignedclinic){
        this.numClinician += 1;
      }
    }

    for (let i = 0; i < this.ffqparentList.length; i++){
      if (this.clinicId === this.ffqparentList[i].assignedclinic){
        this.numParent += 1;
      }
    }
    if ((this.usersLimits === 0) || (this.numParent + this.numClinician > this.usersLimits) ){
      this.able2Add = null;
    }
    else{
      this.able2Add = this.usersLimits - this.numClinician - this.numParent;
    }

    // console.log(this.usersLimits);
    // this.usersLimits = this.ffqclinicList.length;
  }

  changeToClinician($event)
  {
    this.createClinician = true;
    this.createParents = false;
  }

  // changeToParent($event)
  // {
  //   this.createParents = true;
  //   this.createClinician = false;
  // }

  // private addUser()
  // {
  //
  //   let input = document.getElementById('clinician_quantity') as HTMLInputElement;
  //   let amount: number = parseInt(input.value);
  //
  //   if (this.createClinician == true)
  //    {
  //      if (amount <= 1){
  //       this.addClinician();
  //      }else{
  //       console.log('adding multiple clinicians');
  //       this.addMultipleClinicians();
  //
  //      }
  //
  //    }
  //    else
  //    {
  //       // for(var count: number = 1; count <= this.amountToAdd; count++)
  //       // {
  //         this.addParent();
  //       // }
  //    }
  // }
  addUser() {

    switch (this.userType) {
      case Usertype.Clinician: {
        if (this.usersQuantity === 1) {
          this.addClinician();
        } else {
          console.log('adding multiple clinicians');
          this.addMultipleClinicians();
        }
        break;
      }
      case Usertype.Parent: {
        console.log(this.selectedClinician);
        if (this.usersQuantity === 1) {
          if (this.selectedClinician === undefined){
            this.addParent();
          }else{
            this.addParent2AssignCli();
          }

        } else {
          if (this.selectedClinician === undefined){
            this.addMultipleParents();
          }else{
            this.addMultipleParents2assign();
          }
          console.log('adding multiple clinicians');
        }
        break;
      }
    }
  }

  // async addClinician()
  // {
  //   let clinicianList: Observable<FFQClinicianResponse[]> = this.clinicianService.getAllClinicians();
  //
  //   clinicianList.subscribe(data => {
  //       let numberOfClinicians = (data.length + 1).toString();
  //       let newClincianId = (data.length + 1).toString();
  //       let newClincianUsername = 'clinician' + numberOfClinicians;
  //       this.ffqclinician = new FFQClinician(newClincianId, newClincianUsername, newClincianUsername, '', '', '', this.selectedClinic, [], true);
  //
  //       this.clinicianService.addClinician(this.ffqclinician).subscribe(data => {
  //           this.router.navigateByUrl('/admin/users');
  //           const dialogRef = this.errorDialog.open(ErrorDialogPopupComponent);
  //           dialogRef.componentInstance.title = newClincianUsername + ' was added!';
  //       },
  //       error => {
  //           const dialogRef = this.errorDialog.open(ErrorDialogPopupComponent);
  //           dialogRef.componentInstance.title = error.error.message;
  //       });
  //
  //     });
  // }
  addClinician() {
    const ffqclinician = new FFQClinician('', '', '', '', '', '', this.selectedClinic, [], true);

    this.clinicianService.addClinician(ffqclinician).subscribe(clinician => {
        const dialogRef = this.errorDialog.open(ErrorDialogPopupComponent);
        this.router.navigateByUrl('/admin/users');
        dialogRef.componentInstance.title = clinician.username + ' was added!';
      },
      error => {
        const dialogRef = this.errorDialog.open(ErrorDialogPopupComponent);
        dialogRef.componentInstance.title = error.error.message;
      });
  }

  // addMultipleClinicians()
  // {
  //   // Still work in progress
  //
  //   let clinicianList: Observable<FFQClinicianResponse[]> = this.clinicianService.getAllClinicians();
  //
  //   let input = document.getElementById('clinician_quantity') as HTMLInputElement;
  //   let amount: number = parseInt(input.value);
  //
  //   let new_clinicians = new Array();
  //
  //   for (let i = 0; i < amount; i++){
  //
  //       clinicianList.subscribe(data => {
  //         let numberOfClinicians = (data.length + 1 + i).toString();
  //         let newClincianId = (data.length + 1 + i).toString();
  //         let newClincianUsername = 'clinician' + numberOfClinicians;
  //         new_clinicians.push(new FFQClinician(newClincianId, newClincianUsername, newClincianUsername,  '', '', '', this.selectedClinic, [], true));
  //       });
  //
  //     }
  //
  //   for (let j = 0; j < amount; j++){
  //
  //       this.clinicianService.addClinician(new_clinicians[j]).subscribe(data => {
  //         this.router.navigateByUrl('/admin/users');
  //       },
  //       error => {
  //         const dialogRef = this.errorDialog.open(ErrorDialogPopupComponent);
  //         dialogRef.componentInstance.title = error.error.message;
  //       });
  //
  //     }
  //
  //   const dialogRef = this.errorDialog.open(ErrorDialogPopupComponent);
  //   dialogRef.componentInstance.title = amount + ' new clinicians have been added';
  // }

  addMultipleClinicians() {
    const newClinicians = [];
    for (let i = 0; i < this.usersQuantity; i++) {
      newClinicians.push(new FFQClinician('', '', '', '', '', '', this.selectedClinic, [], true));
    }

    this.clinicianService.addMultipleClinicians(newClinicians).subscribe(clinicians => {
        this.router.navigateByUrl('/admin/users');
        const dialogRef = this.errorDialog.open(ErrorDialogPopupComponent);
        // this.router.navigateByUrl('/admin/user/new');
        dialogRef.componentInstance.title = clinicians.map(clinician => clinician.username).join('<br/>') + '<br/>were added!';
      },
      error => {
        const dialogRef = this.errorDialog.open(ErrorDialogPopupComponent);
        dialogRef.componentInstance.title = error.error.message;
      });
  }

  // addParent()
  // {
  //   let parentList: Observable<FFQParentResponse[]> = this.parentService.getAllParents();
  //
  //   parentList.subscribe(data => {
  //       let numberOfParents = (data.length + 1).toString();
  //       let newParentId = (data.length + 1).toString();
  //       let newParentUsername = 'parent' + numberOfParents;
  //       this.ffqParent = new FFQParent(newParentId, newParentUsername, newParentUsername, 'parent', '', '',  this.selectedClinic, '', [''], true);
  //       console.log(this.ffqParent);
  //
  //       this.parentService.addParent(this.ffqParent).subscribe(data => {
  //           this.router.navigateByUrl('/admin/users');
  //           const dialogRef = this.errorDialog.open(ErrorDialogPopupComponent);
  //           dialogRef.componentInstance.title = newParentUsername + ' was added!';
  //       },
  //       error => {
  //           const dialogRef = this.errorDialog.open(ErrorDialogPopupComponent);
  //           dialogRef.componentInstance.title = error.error.message;
  //       });
  //
  //     });
  // }
  addParent() {
    this.ffqParent = new FFQParent('', '', '', 'parent', '', '', this.selectedClinic, '', [''], true);
    console.log(this.ffqParent);

    this.parentService.addParent(this.ffqParent).subscribe(parent => {
        this.router.navigateByUrl('/admin/users');
        const dialogRef = this.errorDialog.open(ErrorDialogPopupComponent);
        // this.router.navigateByUrl('/admin/user/new');
        dialogRef.componentInstance.title = parent.username + ' was added!';
      },
      error => {
        const dialogRef = this.errorDialog.open(ErrorDialogPopupComponent);
        dialogRef.componentInstance.title = error.error.message;
      });
  }

  addParent2AssignCli() {
    this.ffqParent = new FFQParent('', '', '', 'parent', '', '', this.selectedClinic, this.selectedClinician, [''], true);
    console.log(this.ffqParent);

    this.parentService.addParent(this.ffqParent).subscribe(parent => {
        this.router.navigateByUrl('/admin/users');
        const dialogRef = this.errorDialog.open(ErrorDialogPopupComponent);
        // this.router.navigateByUrl('/admin/user/new');
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
      newParents.push(new FFQParent('', '', '', 'parent', '', '', this.selectedClinic, '', [''], true));
    }

    this.parentService.addMultipleParents(newParents).subscribe(clinicians => {
        this.router.navigateByUrl('/admin/users');
        const dialogRef = this.errorDialog.open(ErrorDialogPopupComponent);
        dialogRef.componentInstance.title = clinicians.map(clinician => clinician.username).join('<br/>') + '<br/>were added!';
      },
      error => {
        const dialogRef = this.errorDialog.open(ErrorDialogPopupComponent);
        dialogRef.componentInstance.title = error.error.message;
      });
  }

  addMultipleParents2assign() {
    const newParents = [];
    for (let i = 0; i < this.usersQuantity; i++) {
      newParents.push(new FFQParent('', '', '', 'parent', '', '', this.selectedClinic, this.selectedClinician, [''], true));
    }

    this.parentService.addMultipleParents(newParents).subscribe(clinicians => {
        this.router.navigateByUrl('/admin/users');
        const dialogRef = this.errorDialog.open(ErrorDialogPopupComponent);
        dialogRef.componentInstance.title = clinicians.map(clinician => clinician.username).join('<br/>') + '<br/>were added!';
      },
      error => {
        const dialogRef = this.errorDialog.open(ErrorDialogPopupComponent);
        dialogRef.componentInstance.title = error.error.message;
      });
  }

  getParentByID(id: string)
  {
    this.isParent = true;
    this.parentService.getParent(id).subscribe(data => {
       this.userAttributes = data;
       // this.newParent = data;

    });
    this.dataLoaded = Promise.resolve(true);
  }

  getClinicianByID(id: string)
  {
    this.isClinician = true;
    this.clinicianService.getClinician(id).subscribe(data => {
      this.userAttributes = data;
      // this.newClinician = data;
      // console.log(this.userAttributes);
    });
    this.dataLoaded = Promise.resolve(true);
  }

  updateUser()
  {
    if (this.isParent)
    {
      this.updateParent();
    }
    else
    {
      this.updateClinician();
    }
  }

  updateParent()
  {


    this.parentService.updateParent(this.userAttributes as FFQParentResponse).subscribe(
     data => {this.router.navigateByUrl('/admin/users');
              const dialogRef = this.errorDialog.open(ErrorDialogPopupComponent);
              dialogRef.componentInstance.title = 'Parent successfully updated!'; }

    );
  }

  updateClinician()
  {


    this.clinicianService.updateClinician(this.userAttributes as FFQClinicianResponse)
      .subscribe( data => {
        console.log('data is');
        console.log(data);
        this.router.navigateByUrl('/admin/users');
        const dialogRef = this.errorDialog.open(ErrorDialogPopupComponent);
        dialogRef.componentInstance.title = 'Clinician successfully updated!';
      });
  }


  deleteUser(){
    if (this.isParent)
    {
      this.deleteParent();
    }
    else
    {
      this.deleteClinician();
    }
  }

  deleteParent(){
    const confirmDelete = this.modalService.open(DeletePopupComponent);
    confirmDelete.componentInstance.service = 'Parent';
    confirmDelete.componentInstance.attributes = this.userAttributes;
  }

  deleteClinician(){
    const confirmDelete = this.modalService.open(DeletePopupComponent);
    confirmDelete.componentInstance.service = 'Clinician';
    confirmDelete.componentInstance.attributes = this.userAttributes;
  }
}

