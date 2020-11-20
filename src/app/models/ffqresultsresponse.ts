export class FFQResultsResponse {
    questionnaireId: string;
    userId: string;
    userType: string;
    feedback: string;
    ageInMonths: number;
    userChoices: any;
    weeklyTotals: any;
    dailyAverages: any;
    show: boolean;
    showFeedback: boolean;
    gender: string;

    constructor(id: string, userId: string, userType: string, age: number, userChoices:any, weeklyTotals: Map<string, number>, dailyAverages: any, feedback: string, gender: string) {
      this.questionnaireId = id;
      this.userId = userId;
      this.userType = userType;

      this.ageInMonths = age;
      this.userChoices = userChoices;
      this.weeklyTotals = weeklyTotals;
      this.dailyAverages = dailyAverages;
      this.feedback = feedback;
      this.gender = gender;
    }
  }
