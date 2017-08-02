import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HomeComponent } from '../home/home.component';
import { ErrorComponent } from '../error/error.component';
import { AboutComponent } from '../about/about.component';
import { PostDetailComponent } from '../postDetail/post-detail.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
            { path: '' , component: HomeComponent},
            { path: 'about', component: AboutComponent},
            { path: 'post/:id/:home', component: PostDetailComponent},
            { path: '**' , component: ErrorComponent }
        ])
    ],
    exports: [
        RouterModule
    ],
    declarations: [
        PostDetailComponent
    ]
})
export class AppRoutingModule {}
