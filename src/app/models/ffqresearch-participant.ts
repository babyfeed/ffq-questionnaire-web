//Classed to store admin user data in components

export class FFQResearchParticipant {
  id: string;
  userId: string;
  username: string;
  userpassword: string;
  usertype: string;
  usercount: string;
  assignedResearcherInst: string;
  assignedResearcherUsers: string[];
  childrennames: string[];
  isactive: boolean;


  constructor(userId: string, username: string, userpassword: string, usertype: string, usercount: string, assignedResearcherInst: string, assignedResearcherUsers: string[], childrennames: string[], isactive: boolean){
    this.userId = userId;
    this.username = username;
    this.userpassword = userpassword;
    this.usertype = usertype;
    this.usercount = usercount;
    this.assignedResearcherInst = assignedResearcherInst;
    this.assignedResearcherUsers = assignedResearcherUsers;
    this.childrennames = childrennames;
    this.isactive = isactive;
  }

}
