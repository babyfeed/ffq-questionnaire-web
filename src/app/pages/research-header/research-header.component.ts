
import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Component({
  selector: 'research-header',
  templateUrl: './research-header.component.html',
  styleUrls: ['./research-header.component.css']
})
export class ResearchHeaderComponent {
  currentUser: User;
  viewConfiguration: any = null;

  constructor(private router: Router, private authenticationService: AuthenticationService) {
      this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
      this.authenticationService.viewConfigurationObservable.subscribe((viewConfiguration) => {
        if(viewConfiguration) {
          this.viewConfiguration = viewConfiguration;
        }
      })
  }

  logout() {
      this.authenticationService.logout();
      this.router.navigate(['/login']);
  }

}

