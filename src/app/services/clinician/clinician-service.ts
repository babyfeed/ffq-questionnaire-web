import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import { FFQClinicianResponse } from 'src/app/models/ffqclinician-response';
import { environment } from 'src/environments/environment';
import {FFQClinician} from "../../models/ffqclinician";

@Injectable({
  providedIn: 'root'
})

export class ClinicianService {

  endpoint = environment.userServiceUrl + '/ffq/clinicians';

  constructor(private http: HttpClient) { }

  addClinician(user : FFQClinician): Observable<FFQClinician> {

    return this.http.post<FFQClinician>(this.endpoint + '/createclinician', user,
      {headers : new HttpHeaders({ 'Content-Type': 'application/json' })});
  }

  addMultipleClinicians(clinicians : FFQClinician[]): Observable<FFQClinician[]> {

    return this.http.post<FFQClinician[]>(this.endpoint + '/createManyClinicians', clinicians,
      {headers : new HttpHeaders({ 'Content-Type': 'application/json' })});
  }

  updateClinician(user : FFQClinicianResponse): Observable<any> {

    return this.http.put(this.endpoint + '/updateclinician', user,
      {headers : new HttpHeaders({ 'Content-Type': 'application/json' })});
  }

  getClinician(userId: string): Observable<FFQClinicianResponse> {
    return this.http.get(this.endpoint + '/' + userId).pipe(
      map((item: any) => {
          return new FFQClinicianResponse(
            item.userId,
            item.username,
            item.userpassword,
            item.usertype,
            item.abbreviation,
            item.firstname,
            item.lastname,
            item.assignedclinic,
            item.previousclinics,
            item.isactive
          );
      })
    );
  }


  getAllClinicians(): Observable<FFQClinicianResponse[]> {
    return this.http.get(this.endpoint + '/all').pipe(
      map((res: any) => {
        return res.map(item => {
          return new FFQClinicianResponse(
            item.userId,
            item.username,
            item.userpassword,
            item.usertype,
            item.abbreviation,
            item.firstname,
            item.lastname,
            item.assignedclinic,
            item.previousclinics,
            item.isactive
          );
        });
      })
    );
  }

  /*DELETE: delete food item from the database */
  deleteItem(userId: string): Observable <any>{
    return this.http.delete(this.endpoint + "/delete?userId=" + userId,  { responseType: 'text' })
  }
}





