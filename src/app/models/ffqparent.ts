//Classed to store parent user data in components

export class FFQParent {
  id: string;
  userId: string;
  username: string;
  userpassword: string;
  usertype: string;
  firstname: string;
  lastname: string;
  assignedclinic: string;
  assignedclinician: string;
  childrennames: any;
  isactive: boolean;
  prefix: string;
  assignedClinicOrSiteId: string;
  // Used to keep track of when parent last read recommend
  lastReadRecommend: string;
  timesOfReading: number;


  constructor(userId: string, username: string, userpassword: string, usertype: string, firstname: string,
              lastname: string, assignedclinic: string, assignedclinician: string, childrennames: any, isactive: boolean, prefix: string,
              lastReadRecommend: string,   timesOfReading: number) {
    this.userId = userId;
    this.username = username;
    this.userpassword = userpassword;
    this.usertype = usertype;
    this.firstname = firstname;
    this.lastname = lastname;
    this.assignedclinic = assignedclinic;
    this.assignedclinician = assignedclinician;
    this.childrennames = childrennames;
    this.isactive = isactive;
    this.prefix = prefix;
    // Upon parent creation lastReadRecommend is set to empty
    this.lastReadRecommend = '';
    this.timesOfReading = 0;

  }

}
