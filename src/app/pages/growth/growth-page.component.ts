import { Component, OnInit, ViewChild } from "@angular/core";
import { GrowthService } from "src/app/services/growth/growth-service";

@Component({
  selector: "app-growth-page",
  templateUrl: "./growth-page.component.html",
  styleUrls: ["./growth-page.component.css"],
})
export class GrowthPageComponent implements OnInit {
  constructor(private growthService: GrowthService) {}
  ngOnInit(): void {
    this.growthService.loadRecords();
  }
  toggleLanguage(): void {
    this.growthService.toggleLanguage();
  }
}
