import { Component } from '@angular/core';
import { IonicPage, NavController, Loading, LoadingController, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { HomePage } from '../home/home';

import firebase from 'firebase';

@IonicPage({name : "signup"})
@Component({
    selector: 'page-signup',
    templateUrl: 'signup.html',
})
export class SignupPage {

    public signupForm:FormGroup;
    public loading:Loading;

    constructor(public navCtrl: NavController, public loadingCtrl: LoadingController,
                public alertCtrl: AlertController, public formBuilder: FormBuilder,
                public authProvider: AuthProvider) {

        this.signupForm = formBuilder.group({
            email: ['', Validators.required],
            password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
        });

    }

    signupUser(email : string , password : string):void {
        if (!this.signupForm.valid){
            console.log(this.signupForm.value);
            console.log(this.signupForm.value.email.valid);
        } else {
            email = this.signupForm.value.email;
            password = this.signupForm.value.password;
            firebase.auth().createUserWithEmailAndPassword(email, password).then((newUser) => {
                this.loading.dismiss().then( () => {
                    this.navCtrl.setRoot(HomePage);
                    firebase.database().ref('/userProfile').child(newUser.uid).set({
                        email: email
                    });
                });
            });

            this.loading = this.loadingCtrl.create();
            this.loading.present();
        }
    }

}
