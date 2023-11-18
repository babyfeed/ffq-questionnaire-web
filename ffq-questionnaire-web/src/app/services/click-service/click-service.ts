import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClickService {

  // one:number = 0;

  // two:number = 0;

  // three:number = 0;

  // four:number = 0;

  // five:number = 0;

  // six:number = 0;

  // seven:number = 0;

  // eight:number = 0;

  // nine:number = 0;

  // ten:number = 0;

  // eleven:number = 0;

  // twelve:number = 0;

  // thirteen:number = 0;

  // fourteen:number = 0;

  // fifteen:number = 0;

  // constructor() { }

  // incrementOne() {
  //   this.one++;
  // }

  // incrementTwo() {
  //   this.two++;
  // }

  // incrementThree() {
  //   this.three++;
  // }


  // incrementFour() {
  //   this.four++;
  // }

  // incrementFive() {
  //   this.five++;
  // }

  // incrementSix() {
  //   this.six++;
  // }

  // incrementSeven() {
  //   this.seven++;
  // }

  // incrementEight() {
  //   this.eight++;
  // }

  // incrementNine() {
  //   this.nine++;
  // }

  // incrementTen() {
  //   this.ten++;
  // }

  // incrementEleven() {
  //   this.eleven++;
  // }

  // incrementTwelve() {
  //   this.twelve++;
  // }

  // incrementThirteen() {
  //   this.thirteen++;
  // }

  // incrementFourteen() {
  //   this.fourteen++;
  // }
  // updateFifteen() {
  //   this.fifteen++;
  // }

  myArray: Array<number> = [0,0,0,0,0,0,0,0,0,0,0,0];

  myEnglishArray: Array<number> = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

  

  incrementCorrespondingClickCount(index:number) {
    this.myArray[index]++;
  }

  incrementEnglishLinkCount(my_index:number) {
    this.myEnglishArray[my_index]++;
  }

}
