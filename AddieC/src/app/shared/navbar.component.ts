import { Component } from '@angular/core';

@Component({
    selector: 'nav-bar',
    template: `
                <ul>
                    <li><img src="http://placekitten.com/g/40/40" alt="CAT IMG"></li>
                    <li><a href="#">About</a></li>
                    <li style="float:right"><a href="#">Login</a></li>
                </ul>
    `,
    styleUrls: ['./navbar.component.css']
})
export class NavComponent {}