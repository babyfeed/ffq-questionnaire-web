import { Component } from "@angular/core";
import {
  GrowthRecord,
  GrowthService,
} from "src/app/services/growth/growth-service";

@Component({
  selector: "app-clinic-growth-page",
  templateUrl: "./clinic-growth-page.component.html",
  styleUrls: ["./clinic-growth-page.component.css"],
})
export class ClinicGrowthPage {
  records: GrowthRecord[] = [];
  constructor(private growthService: GrowthService) {}

  ngOnInit() {
    this.loadRecords();
  }

  async loadRecords() {
    const records = await this.growthService.getClinicRecords();
    this.records = records.data;
  }
  toggleLanguage(): void {
    this.growthService.toggleLanguage();
  }
}
