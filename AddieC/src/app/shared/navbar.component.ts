import { Component } from '@angular/core';

@Component({
    selector: 'nav-bar',
    template: `
                <ul>
                    <li><a [routerLink]="['/']"><img src="http://placekitten.com/g/40/40" alt="CAT IMG"></a></li>
                    <li><a [routerLink]="['/about']">About</a></li>
                    <li style="float:right"><a [routerLink]="['/user']">Login</a></li>
                </ul>
    `,
    styleUrls: ['./navbar.component.css']
})
export class NavComponent {}