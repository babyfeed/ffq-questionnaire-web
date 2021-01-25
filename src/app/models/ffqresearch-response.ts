//Class used to store admin user data from response

export class FFQResearchtResponse {
  id: string;
  userId: string;
  username: string;
  userpassword: string;
  usertype: string;
  firstname: string;
  lastname: string;
  isactive: boolean;
  AssignedResearchInstitutionId: string;
  limitNumberOfParticipants: number;
  prefix: string;


  constructor(userId: string, username: string, userpassword: string, usertype: string, firstname: string, lastname: string, isactive: boolean, AssignedResearchInstitutionId: string, limitNumberOfParticipants: number, prefix: string) {
    this.userId = userId;
    this.username = username;
    this.userpassword = userpassword;
    this.usertype = usertype;
    this.firstname = firstname;
    this.lastname = lastname;
    this.AssignedResearchInstitutionId = AssignedResearchInstitutionId;
    this.limitNumberOfParticipants = limitNumberOfParticipants;
    this.isactive = isactive;
    this.prefix = prefix;

  }

}

