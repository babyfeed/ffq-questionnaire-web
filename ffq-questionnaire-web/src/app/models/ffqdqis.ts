export class FFQDQIS {
    questionnaireId: string;
    patientAge: number;
    foodCategoryRecList: Recommendation[];
  
  
    constructor(questionnaireId: string, patientAge: number, foodCategoryRecList: Recommendation[]) {
      this.questionnaireId = questionnaireId;
      this.patientAge = patientAge;
      this.foodCategoryRecList = foodCategoryRecList;
    }
  }
  
  export class Recommendation {
    categoryName: string;
    calculatedPoints: number;
  
    constructor(categoryName: string, calculatedPoints: number) {
      this.categoryName = categoryName;
     
      this.calculatedPoints = calculatedPoints;
    }
  }
  