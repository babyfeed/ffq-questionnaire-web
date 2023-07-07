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
    rangeFrom: number;
    rangeTo: number;
    label: string;
    calculatedPoints: number;
  
    constructor(categoryName: string, rangeFrom: number, rangeTo: number, label: string, calculatedPoints: number) {
      this.categoryName = categoryName;
      this.rangeFrom = rangeFrom;
      this.rangeTo = rangeTo;
      this.label = label;
      this.calculatedPoints = calculatedPoints;
    }
  }
  