import { Component,Input } from "@angular/core";
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FoodItemService } from 'src/app/services/food-item/food-item.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-create-parent-modal',
  templateUrl: './create-parent-modal.component.html',
  styleUrls: ['./create-parent-modal.component.css']
})
export class CreateParentModalComponent{
  @Input() id;
  @Input() service;
  data: any;

  constructor(public activeModal: NgbActiveModal,
    public foodService: FoodItemService,
    private router: Router,
    private errorDialog: MatDialog, ) {
  }

  onClose(): void {
      this.service.deleteItem(this.id).subscribe(newData => {
          this.data = newData;
          window.location.reload();
      });
      this.activeModal.close('closed');
  }

  onDismiss(reason: String): void {
    this.activeModal.dismiss(reason);
  }
}
