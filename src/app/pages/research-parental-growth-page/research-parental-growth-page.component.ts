import { Component, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { GrowthService } from "src/app/services/growth/growth-service";

@Component({
  selector: "app-research-parental-growth-page",
  templateUrl: "./research-parental-growth-page.component.html",
  styleUrls: ["./research-parental-growth-page.component.css"],
})
export class ResearchParentalGrowthPageComponent implements OnInit {
  constructor(private growthService: GrowthService, private translate: TranslateService) {}
  ngOnInit(): void {
    this.growthService.loadRecords(true);
  }
  toggleLanguage(): void {
    this.growthService.toggleLanguage();
  }
  async exportRecords() {
    try {
      const result = await this.growthService.exportRecords("participant");
      const title =
        this.translate.currentLang === "es"
          ? "Resultados de gráficos de crecimiento.csv"
          : "Growth Chart Results.csv";
      this.growthService.downloadFile(result, title);
    } catch (error) {
      console.error("Error exporting events:", error);
    }
  }
}
