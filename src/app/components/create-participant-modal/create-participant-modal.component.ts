import { Component,Input } from "@angular/core";
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ResearcherParentService } from 'src/app/services/researcher-parent/researcher-parent-service';

@Component({
  selector: 'app-create-participant-modal',
  templateUrl: './create-participant-modal.component.html',
  styleUrls: ['./create-participant-modal.component.css']
})
export class CreateParticipantModalComponent{
  @Input() id;
  @Input() service;
  data: any;

  constructor(
    public activeModal: NgbActiveModal,
    public participants: ResearcherParentService,
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
