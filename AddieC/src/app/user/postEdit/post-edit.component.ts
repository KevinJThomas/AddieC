import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PostService } from '../userShared/post.service';
import { UserService } from '../userShared/user.service';
import { Post } from '../userShared/post';
import * as firebase from 'firebase';

@Component({
    templateUrl: './post-edit.component.html',
    styleUrls: ['./post-edit.component.css']
})

export class PostEditComponent implements OnInit, OnDestroy {
    id: string;
    sub: any;
    thePost: Post;
    title: string;
    description: string;
    isDataAvailable = false;

    constructor(private postSVC: PostService, private userSVC: UserService, private router: Router, private route: ActivatedRoute) {}

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.id = params['id'];
        });

        const dbRef = firebase.database().ref('posts/');
        dbRef.once('value')
        .then((snapshot) => {
            const tmp: string[] = snapshot.val();
            let tmpPost: Post[];
            tmpPost = Object.keys(tmp).map(key => tmp[key]).filter(item => item.id === this.id);
            console.log(tmpPost);
            this.thePost = tmpPost[0];
            this.title = this.thePost.title;
            this.description = this.thePost.content;
        }).then(() =>
        this.isDataAvailable = true);
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    updatePost() {
        const newPost = this.thePost
        newPost.title = this.title,
        newPost.content = this.description
        this.postSVC.editPost(newPost);
        this.router.navigate(['/user/posts']);
    }

    cancel() {
        this.router.navigate(['/user/posts']);
    }
}
