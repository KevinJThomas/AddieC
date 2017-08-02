import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import * as firebase from 'firebase';
import { Post } from '../user/userShared/post';

@Component({
    templateUrl: './post-detail.component.html',
    styleUrls: ['./post-detail.component.css']
})

export class PostDetailComponent implements OnInit {
    singlePost: Post;
    backDestination: string;

    constructor(private route: ActivatedRoute, private router: Router) {}

    ngOnInit() {
        const postId = this.route.snapshot.params['id'];
        this.backDestination = this.route.snapshot.params['home'];
        this.getSingle(postId);
    }

    getSingle(id: string) {
        const dbRef = firebase.database().ref('/posts');
        dbRef.orderByChild('id')
            .equalTo(id) // equalTo needs an orderBy() to work properly
            .once('value')
            .then((snapshot) => {
                const tmp = snapshot.val();
                const transform = Object.keys(tmp).map(key => tmp[key]);
                const title = transform[0].title;
                const content = transform[0].content;
                const uid = transform[0].uid;
                const imgTitle = transform[0].imgTitle;
                const img = transform[0].img;
                this.singlePost = new Post(title, content, uid, imgTitle, img)
            })
    }

    back() {
        if (this.backDestination === 'Profile') {
            this.router.navigate(['/user']);
        } 
        else {
            this.router.navigate(['']);
        }
    }
}
