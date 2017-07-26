import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../userShared/user.service';
// import * as nodemailer from 'nodemailer';

@Component({
    templateUrl: './report-abuse.component.html',
    styleUrls: ['./report-abuse.component.css']
})
export class ReportAbuseComponent {
    message: string;
    // transporter = nodemailer.createTransport({
    //     host: 'smtp.example.com',
    //     port: 465,
    //     secure: true, // secure:true for port 465, secure:false for port 587
    //     auth: {
    //         user: 'username@example.com',
    //         pass: 'userpass'
    //     }
    // });

    constructor(private userSVC: UserService, private router: Router) {}

    // We need to set up a server to be able to send emails. The commented out example is for node.js if we go with that.
    submit() {
        // let mailOptions = {
        //     from: this.userSVC.loggedInUser,
        //     to: 'addiecsite@gmail.com',
        //     subject: 'Abuse Report',
        //     text: this.message
        // };

        // this.transporter.sendMail(mailOptions, (error, info) => {
        //     if (error) {
        //         return console.log(error);
        //     }
        //     console.log('Message %s sent: %s', info.messageId, info.response);
        // });
        this.router.navigate(['/user/settings']);
    }

    cancel() {
        this.router.navigate(['/user/settings']);
    }
}
