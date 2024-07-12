import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Gender } from "src/app/models/Enums";
import { environment } from "src/environments/environment";
import BOYS_YELLOW_RANGE from "src/assets/ranges/boys/yellow_range";
import BOYS_GREEN_RANGE from "src/assets/ranges/boys/green_range";
import GIRLS_YELLOW_RANGE from "src/assets/ranges/girls/yellow_range";
import GIRLS_GREEN_RANGE from "src/assets/ranges/girls/green_range";
import { TranslateService } from "@ngx-translate/core";

export interface GrowthRecord {
  height: number; // cm
  weight: number; // kg
  age: number; // months
  timestamp: Date;
  gender: Gender;
  clinicName?: string;
  parentUsername?: string;
  percentile?: {
    percentile: string;
    color: string;
  };
}

@Injectable({
  providedIn: "root",
})
export class GrowthService {
  private endpoint = environment.apiUrl + "/growth-records";
  private recordsSource = new BehaviorSubject<GrowthRecord[]>([]);
  private genderSource = new BehaviorSubject<Gender>(Gender.NotAssigned);
  private languageSource = new BehaviorSubject<string>(
    this.translate.currentLang
  );
  private messageSource = new BehaviorSubject<{
    color: string;
    message: string;
  } | null>(null);

  message = this.messageSource.asObservable();
  records = this.recordsSource.asObservable();
  currentGender = this.genderSource.asObservable();
  currentLanguage = this.languageSource.asObservable();
  private token;

  constructor(private http: HttpClient, private translate: TranslateService) {}

  changeGender(gender: Gender) {
    this.genderSource.next(gender);
  }

  toggleLanguage(): void {
    if (this.translate.currentLang == "es") {
      this.translate.use("en-US");
      this.languageSource.next("en-US");
    } else {
      this.translate.use("es");
      this.languageSource.next("es");
    }
  }

  async loadRecords(isParticipant = false) {
    const [user] = JSON.parse(localStorage.getItem("currentUser"));
    this.token = user.token;
    const url = this.endpoint + (isParticipant ? "/participant" : "");
    this.http
      .get<any>(url, {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      })
      .subscribe(({ data }) => this.recordsSource.next(data));
  }
  async getClinicRecords() {
    const [user] = JSON.parse(localStorage.getItem("currentUser"));
    this.token = user.token;
    return this.http
      .get<any>(`${this.endpoint}/clinic`, {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      })
      .toPromise();
  }
  async exportRecords(type) {
    const [user] = JSON.parse(localStorage.getItem("currentUser"));
    this.token = user.token;
    return this.http
      .get<any>(this.endpoint + "/export/" + type, {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
        responseType: "blob" as "json",
      })
      .toPromise();
  }
  downloadFile(data: Blob, filename: string) {
    const blob = new Blob([data], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }
  async getAdminRecords() {
    const [user] = JSON.parse(localStorage.getItem("currentUser"));
    this.token = user.token;
    return this.http
      .get<any>(`${this.endpoint}/admin`, {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      })
      .toPromise();
  }
  addRecord(record: GrowthRecord, isParticipant = false) {
    const [user] = JSON.parse(localStorage.getItem("currentUser"));
    this.token = user.token;
    const message =
      record.gender === "Male"
        ? this.getGrowthMessage(
            record.height,
            record.weight,
            BOYS_GREEN_RANGE.data,
            BOYS_YELLOW_RANGE.data
          )
        : this.getGrowthMessage(
            record.height,
            record.weight,
            GIRLS_GREEN_RANGE.data,
            GIRLS_YELLOW_RANGE.data
          );
    record["percentile"] = {
      percentile: message.percentile,
      color: message.color,
    };
    const url = this.endpoint + (isParticipant ? "/participant" : "");
    this.http
      .post<any>(url, record, {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      })
      .subscribe((data) => {
        this.messageSource.next(message);

        const currentRecords = this.recordsSource.value;
        this.recordsSource.next([...currentRecords, record]);
      });
  }

  getGrowthMessage(length, weight, greenRange, yellowRange) {
    let color = "red";
    let message = "";
    let percentile = "";

    function isInRange(range, length, weight) {
      for (let i = 0; i < range.length; i++) {
        let dataPoint = range[i];
        if (dataPoint.x === length) {
          return weight >= dataPoint.y[0] && weight <= dataPoint.y[1];
        }
      }
      return false;
    }

    function isAboveRange(range, length, weight) {
      for (let i = 0; i < range.length; i++) {
        let dataPoint = range[i];
        if (dataPoint.x === length) {
          return weight > dataPoint.y[1];
        }
      }
      return false;
    }

    function isBelowRange(range, length, weight) {
      for (let i = 0; i < range.length; i++) {
        let dataPoint = range[i];
        if (dataPoint.x === length) {
          return weight < dataPoint.y[0];
        }
      }
      return false;
    }

    if (isInRange(greenRange, length, weight)) {
      color = "green";
      message =
        "Great job! This growth chart provides standards on typical growth patterns among infants. Your baby is following a healthy growth pattern.";
      percentile = "10% - 90%";
    } else if (isInRange(yellowRange, length, weight)) {
      color = "yellow";
      if (isAboveRange(greenRange, length, weight)) {
        message =
          "This growth chart provides standards on typical growth patterns among infants. Your baby may be trending above optimal growth. Please discuss with your pediatrician.";
        percentile = ">90%";
      } else if (isBelowRange(greenRange, length, weight)) {
        message =
          "This growth chart provides standards on typical growth patterns among infants. Your baby may be trending below optimal growth. Please discuss with your pediatrician.";
        percentile = "<10%";
      }
    } else {
      color = "red";
      if (isAboveRange(yellowRange, length, weight)) {
        message =
          "This growth chart provides standards on typical growth patterns among infants. Your baby is above optimal growth. Please discuss with your pediatrician as soon as possible.";
        percentile = ">98%";
      } else if (isBelowRange(yellowRange, length, weight)) {
        message =
          "This growth chart provides standards on typical growth patterns among infants. Your baby is below optimal growth. Please discuss with your pediatrician as soon as possible.";
        percentile = "<2%";
      }
    }

    return { color, message, percentile };
  }
}
