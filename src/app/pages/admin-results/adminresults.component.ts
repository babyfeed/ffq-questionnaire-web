import { Component } from "@angular/core";
import {
  GrowthRecord,
  GrowthService,
} from "src/app/services/growth/growth-service";

@Component({
  selector: "app-growth",
  templateUrl: "./adminresults.component.html",
  styleUrls: ["./adminresults.component.css"],
})
export class AdminresultsComponent {
  records: GrowthRecord[] = [];
  constructor(private growthService: GrowthService) {}

  ngOnInit() {
    this.loadRecords();
  }

  async loadRecords() {
    const records = await this.growthService.getAdminRecords();
    this.records = records.data;
  }
  toggleLanguage(): void {
    this.growthService.toggleLanguage();
  }
}
