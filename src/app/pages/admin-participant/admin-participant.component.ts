import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { combineLatest, Observable } from 'rxjs';
import { ParticipantService } from 'src/app/services/participant/participant-service';
import { ResearchService } from 'src/app/services/research/research-service';
import { FfqParticipant } from 'src/app/models/ffq-participant';
import { FFQResearcher } from 'src/app/models/ffqresearcher';
import { ResearchInstitutionService } from 'src/app/services/research-institution-service/research-institution-service';
import { FFQInstitution } from 'src/app/models/ffqinstitution';
import { AuthenticationService } from '../../services/authentication/authentication.service';

import { FFQResearchInstitution } from 'src/app/models/ffq-research-institution';
import { ClinicianService } from '../../services/clinician/clinician-service';


@Component({
  selector: 'app-admin-participant',
  templateUrl: './admin-participant.component.html',
  styleUrls: ['./admin-participant.component.css']
})
export class ParticipantUserComponent implements OnInit {
  loggedInUser = this.authenticationService.currentUserValue;
  currentUser$: Observable<FFQResearcher[]>;
  currentUser: Observable<FFQResearcher[]>;

  // Used to make sure institutions do not go over participant cap
  numParticipants = 0;
  noMoreRoom = false;
  limit = 0;

  // Password for new participant user
  userPassword;

  // List for ALL institutions and ALL participants
  ffqinstitutionList: FFQInstitution[] = [];
  ffqparticipantList: FfqParticipant[] = [];

  // The institution's ID selected from dropdown
  selectedId: string;

  numToAdd: number;

  constructor(
    public participantService: ParticipantService,
    public researchService: ResearchService,
    private errorDialog: MatDialog,
    private router: Router,
    public institutionService: ResearchInstitutionService,
    private authenticationService: AuthenticationService,
    public clinicianService: ClinicianService
  ) {
    this.currentUser$ = this.authenticationService.currentUser as unknown as Observable<FFQResearcher[]>;
    this.currentUser = this.currentUser$;
  }




  ngOnInit() {
    // On init get list of ALL institutions for drop down selection
    const institutionList: Observable<FFQResearchInstitution[]> = this.institutionService.getAllResearchInstitutions();
    institutionList.subscribe(a => {
      this.ffqinstitutionList = a;
    });

    // Get all participants too
    const participantList: Observable<FfqParticipant[]> = this.participantService.getAllParticipants();
    participantList.subscribe(a => {
      this.ffqparticipantList = a;
    });
  }

  handleChange() {
    this.numParticipants = 0;

    for (let i = 0; i < this.ffqinstitutionList.length; i++) {
      if (this.selectedId === this.ffqinstitutionList[i].researchInstitutionId) {
        this.limit = this.ffqinstitutionList[i].participantsLimit;
        break;
      }
    }

    for (let i = 0; i < this.ffqparticipantList.length; i++) {
      if (this.selectedId === this.ffqparticipantList[i].assignedResearcherInst) {
        this.numParticipants++;
      }
    }

  }

  verifyLimit() {
    if (this.numParticipants + this.numToAdd > this.limit) {
      this.noMoreRoom = true;
    }
    else {
      this.noMoreRoom = false;
    }
  }

  addParticipant() {
    console.log(this.ffqinstitutionList)
    console.log(this.ffqparticipantList)
    console.log(this.selectedId)
    this.verifyLimit()
    console.log(this.numParticipants)
    console.log(this.numToAdd)
    console.log(this.limit)
    console.log(this.noMoreRoom)
    
  }

  generatePassword() {
    this.userPassword = Math.random().toString(36).slice(-10);
  }
}

