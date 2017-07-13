import { Injectable } from '@angular/core';
import { Post } from './post';
import * as firebase from 'firebase';

@Injectable()
export class PostService {
    
    createPost(post: Post) {
        let storageRef = firebase.storage().ref();
        storageRef.child(`images/${post.imgTitle}`).putString(post.img, 'base64')
            .then((snapshot) => {
                let url = snapshot.metadata.downloadURLs[0];
                let dbRef = firebase.database().ref('posts/');
                let newPost = dbRef.push();
                newPost.set ({
                    title: post.title,
                    content: post.content,
                    uid: post.uid,
                    imgTitle: post.imgTitle,
                    img: url,
                    id: newPost.key
                });
            })
            .catch((error) => {
                console.log(`${error.message}`)
            });
    }

    editPost(update: Post) {
        let dbRef = firebase.database().ref('posts/').child(update.id)
            .update({
                title: update.title,
                content: update.content
            });
    }

    deletePost(deletePost: Post) {
        let dbRef = firebase.database().ref('posts/').child(deletePost.id).remove();

        let imageRef = firebase.storage().ref().child(`images/${deletePost.imgTitle}`)
            .delete()
                .then(function() {
                }).catch(function(error) {
                    console.log(`${error.message}`);
                });
    }
}