import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TrackerResultsResponse } from 'src/app/models/trackerresultsresponse';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TrackerResponseService {

  endpoint = environment.foodServiceUrl + '/ffq';

  constructor(private http: HttpClient) { }

  submitTracker(results: TrackerResultsResponse): Observable<any> {
    return this.http.post(this.endpoint + '/tracker', results);
  }

  //submitGoal(goal: String, id: String) {
  //  return this.http.put(this.endpoint + '/tracker/update/' + id, goal,
  //    { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) });
  //}
  submitGoal(_id: string, goal: string): Observable<any> {
    return this.http.put(this.endpoint + '/update', {
      _id: _id,
      goal: goal
    },{ headers: new HttpHeaders({ 'Content-Type': 'application/json' }) });
  }

}
