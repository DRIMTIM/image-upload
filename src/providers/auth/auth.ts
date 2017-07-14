import { Injectable } from '@angular/core';
import firebase from 'firebase';
import {AngularFireAuth} from "angularfire2/auth";
import {AngularFireDatabase, FirebaseListObservable} from "angularfire2/database";

@Injectable()
export class AuthProvider {

    fireAuth: any;

    constructor(public afAuth: AngularFireAuth, public afDatabase: AngularFireDatabase) {
        this.afAuth.authState.subscribe( user => {
            if (user) {
                this.fireAuth = user;
            }
        });
    }

    getUser():firebase.User { return this.fireAuth; }

    loginUser(newEmail: string, newPassword: string):firebase.Promise<any> {
        return this.afAuth.auth.signInWithEmailAndPassword(newEmail, newPassword);
    }

    resetPassword(email: string): firebase.Promise<void> {
        return firebase.auth().sendPasswordResetEmail(email);
    }

    logoutUser(): firebase.Promise<void> {
        firebase.database().ref('/userProfile').child(firebase.auth().currentUser.uid).off();
        return firebase.auth().signOut();
    }

    addPicture(pictureName, picture = null): firebase.Promise<any> {
        return firebase.database()
            .ref(`userProfile/${firebase.auth().currentUser.uid}/pictureList`)
            .push({
                pictureName: pictureName,
                profilePicture: null
            }).then((newPicture) => {
                if (picture != null) {
                    firebase.storage().ref(`/pictures/${firebase.auth().currentUser.uid}/`).child(pictureName + '.jpg')
                        .putString(picture, 'base64', {contentType: 'image/jpeg'})
                        .then((savedPicture) => {
                            firebase.database()
                                .ref(`userProfile/${firebase.auth().currentUser.uid}/pictureList`)
                                .child(newPicture.key)
                                .child('profilePicture').set(savedPicture.downloadURL);
                        });
                }
            });
    }

    getPictures(): FirebaseListObservable<any> {
        return this.afDatabase.list(`/userProfile/${firebase.auth().currentUser.uid}/pictureList`);
    }

}
