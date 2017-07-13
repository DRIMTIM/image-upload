import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AuthProvider} from "../../providers/auth/auth";
import {FirebaseListObservable} from "angularfire2/database";

@IonicPage()
@Component({
    selector: 'page-picture-list',
    templateUrl: 'picture-list.html',
})
export class PictureListPage {

    pictures: FirebaseListObservable<any>;

    constructor(public navCtrl: NavController, public navParams: NavParams,
                public authProvider : AuthProvider) {

        authProvider.getPictures().subscribe(pictures => {
            this.pictures = pictures;
        });

    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad PictureListPage');
    }

}
