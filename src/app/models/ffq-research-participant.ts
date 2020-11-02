//Participants model. Maps the participant collection
export class FFQResearchParticipant {
  id: string;
  userId: string;
  username: string;
  usertype: string;
  firstname: string;
  lastname: string;
  assignedResearcherInst: string;
  assignedResearcherUsers: string[];
  childrennames: string[]; //maybe leave it in any
  isactive: boolean;
  userpassword: string;


  constructor(userId: string, username: string, userpassword: string, usertype:string, firstname: string,
              lastname: string, assignedResearcherOrg: string, assignedResearcherUsers: string[], childrennames: string[], isactive: boolean) {
    this.userId = userId;
    this.username = username;
    this.usertype = usertype;
    this.firstname = firstname;
    this.lastname = lastname;
    this.assignedResearcherInst = assignedResearcherOrg;
    this.assignedResearcherUsers = assignedResearcherUsers;
    this.childrennames = childrennames;
    this.isactive = isactive;
    this.userpassword = userpassword;
  }

}
