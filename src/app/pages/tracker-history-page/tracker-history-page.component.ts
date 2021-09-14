import { Component, OnInit } from '@angular/core';
import { TrackerResultsResponse } from 'src/app/models/trackerresultsresponse';
import { TrackerResultsService } from 'src/app/services/tracker-results/tracker-results.service';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { TrackerItems } from 'src/app/models/trackeritems';

import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-tracker-history-page',
  templateUrl: './tracker-history-page.component.html',
  styleUrls: ['./tracker-history-page.component.css']
})
export class TrackerHistoryPageComponent implements OnInit {

  results: TrackerResultsResponse[] = [];
  goal: string;
  trackerForm: FormGroup;
  
  constructor(private formBuilder: FormBuilder,
              private trackerResultsService: TrackerResultsService,
              private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.getResultsByUser(this.authenticationService.currentUserId);

    this.trackerForm = this.formBuilder.group({
      userId: [this.authenticationService.currentUserId],
      goal: ['', Validators.required]
    });
    // test items
    // for(let i = 0; i < 10; i++) {
    //   this.results[i] = new TrackerResultsResponse("1", i, "4/"+i+"/20", [new TrackerItems("food1", "Above"),
    //                                                                       new TrackerItems("food2", "Equal"),
    //                                                                       new TrackerItems("food3", "Below")]);
    // }
  }

  private getResultsByUser(userId: string) {
    this.trackerResultsService.getResultsByUser(userId).subscribe(res => {
      this.results = res.reverse();
    });
  };

  public submitGoal() {
    console.log(this.trackerForm.value.goal)
  }
}
