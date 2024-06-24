import { Component, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { GrowthService } from "src/app/services/growth/growth-service";

@Component({
  selector: "app-growth-page",
  templateUrl: "./growth-page.component.html",
  styleUrls: ["./growth-page.component.css"],
})
export class GrowthPageComponent implements OnInit {
  constructor(private growthService: GrowthService, private translate: TranslateService) {}
  ngOnInit(): void {
    this.growthService.loadRecords();
  }
  toggleLanguage(): void {
    this.growthService.toggleLanguage();
  }
  async exportRecords() {
    try {
      const result = await this.growthService.exportRecords("parent");
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
