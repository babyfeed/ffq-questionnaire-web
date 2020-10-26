//Class used to store clinician user data from response

import {Usertype} from "./usertype.enum";

export class FFQClinicianResponse {
  id: string;
  userId: string;
  username: string;
  userpassword: string;
  usertype: Usertype;
  abbreviation: string;
  firstname: string;
  lastname: string;
  assignedclinic: string;
  previousclinics: any;
  isactive: boolean;


  constructor(userId: string, username: string, userpassword: string, usertype:string, abbreviation: string, firstname: string,
               lastname: string, assignedclinic: string, previousclinics: any, isactive: boolean) {
    this.userId = userId;
    this.username = username;
    this.userpassword = userpassword;
    this.abbreviation = abbreviation;
    this.firstname = firstname;
    this.lastname = lastname;
    this.assignedclinic = assignedclinic;
    this.previousclinics = previousclinics;
    this.isactive = isactive;
  }

}
