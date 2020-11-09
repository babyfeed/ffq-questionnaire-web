//Class used to store admin user data from response

export class FFQResearchtResponse {
  id: string;
  userId: string;
  username: string;
  userpassword: string;
  usertype: string;
  firstname: string;
  lastname: string;
  AssignedResearchInstitutionId: string;
  limitNumberOfParticipants: string;
  isactive: boolean;


  constructor(userId: string, username: string, userpassword: string, usertype:string, firstname: string, 
  lastname: string, AssignedResearchInstitutionId: string, limitNumberOfParticipants: string, isactive: boolean) {
    this.userId = userId;
    this.username = username;
    this.userpassword = userpassword;
    this.usertype = usertype;
    this.firstname = firstname;
    this.lastname = lastname;
     this.AssignedResearchInstitutionId = AssignedResearchInstitutionId;
    this.limitNumberOfParticipants = limitNumberOfParticipants;
    this.isactive = isactive;
  }
}
