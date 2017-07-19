import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../userShared/user.service';

@Component({
    templateUrl: './report-abuse.component.html',
    styleUrls: ['./report-abuse.component.css']
})
export class ReportAbuseComponent {
    message: string;

    constructor(private userSVC: UserService, private router: Router) {}

    submit() {
        console.log('submit');
    }

    cancel() {
        this.router.navigate(['/user/settings']);
    }
}
