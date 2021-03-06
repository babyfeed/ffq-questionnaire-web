import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {FFQParticipant} from 'src/app/models/ffqresearch-participant-response';
import {environment} from 'src/environments/environment';
import {FFQResearchParticipant} from "../../models/ffqresearch-participant";
import { Console } from 'console';
import { stringify } from 'querystring';

@Injectable({
  providedIn: 'root'
})

export class ParticipantService {

  endpoint = environment.userServiceUrl + '/ffq/participant';

  constructor(private http: HttpClient) {
  }

  addParticipant(user: FFQParticipant): Observable<FFQResearchParticipant> {

    return this.http.post<FFQResearchParticipant>(this.endpoint + '/createparticipant', user,
      {headers: new HttpHeaders({'Content-Type': 'application/json'})});
  }

  //Not required at the time
  updateParticipant(user: FFQParticipant): Observable<any> {
    throw new Error("Not implemented");

    // return this.http.put(this.endpoint + '/updateparticipant', user,
    //   {headers: new HttpHeaders({'Content-Type': 'application/json'})});
  }

  getParticipant(userId: string): Observable<FFQParticipant> {
    return this.http.get(this.endpoint + '/' + userId).pipe(
      map((item: any) => {
        return new FFQParticipant(
          item.userId,
          item.username,
          item.usertype,
          item.firstname,
          item.lastname,
          item.assignedResearcherInst,
          item.assignedResearcherUsers,
          item.childrennames,
          item.isactive,
          item.userpassword,
		  item.prefix
        );
      })
    );
  }

  getAllParticipants(): Observable<FFQParticipant[]> {
    return this.http.get(this.endpoint + '/all').pipe(
      map((res: any) => {
        return res.map(item => {
          return new FFQParticipant(
            item.userId,
            item.username,
            item.userpassword,
            item.usertype,
            item.firstname,
            item.lastname,
            item.assignedResearcherInst,
            item.assignedResearcherUsers,
            item.childrennames,
            item.isactive,
			item.prefix
          );
        });
      })
    );
  }

  //Not required at the time
  deleteItem(userId: string): Observable<any> {
    return this.http.delete(this.endpoint + "/delete?userId=" + userId, {responseType: 'text'})
  }


  addMultipleParticipants(participants: FFQResearchParticipant[]): Observable<FFQResearchParticipant[]> {
    const foo = this.http.post<FFQResearchParticipant[]>(this.endpoint + '/createManyParticipants', participants,
      {headers: new HttpHeaders({'Content-Type': 'application/json'})});

    return foo;

  }
}
