import { Component } from '@angular/core';
import { NavController, ActionSheetController, ToastController, Platform, LoadingController, Loading } from 'ionic-angular';

import { Camera } from '@ionic-native/camera';
import {AuthProvider} from "../../providers/auth/auth";
import {PictureListPage} from "../picture-list/picture-list";

declare var cordova: any;

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    lastImage: string = null;
    loading: Loading;
    picture: any = null;
    imageData: any = null;

    constructor(public navCtrl: NavController, private camera: Camera, public actionSheetCtrl: ActionSheetController,
                public toastCtrl: ToastController, public platform: Platform, private authProvider : AuthProvider) {
    }

    public presentActionSheet() {
        let actionSheet = this.actionSheetCtrl.create({
            title: 'Select Image Source',
            buttons: [
                {
                    text: 'Load from Library',
                    handler: () => {
                        this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
                    }
                },
                {
                    text: 'Use Camera',
                    handler: () => {
                        this.takePicture(this.camera.PictureSourceType.CAMERA);
                    }
                },
                {
                    text: 'Cancel',
                    role: 'cancel'
                }
            ]
        });
        actionSheet.present();
    }

    takePicture(sourceType){
        this.camera.getPicture({
            quality : 100,
            destinationType : this.camera.DestinationType.DATA_URL,
            sourceType : sourceType,
            saveToPhotoAlbum: false,
            correctOrientation: true
        }).then(imageData => {

            this.picture = "data:image/jpeg;base64," + imageData;
            this.imageData = imageData;

        }, error => {
            console.log("ERROR -> " + JSON.stringify(error));
            this.presentToast('Error while selecting image.');
        });
    }

    // Create a new name for the image
    private createFileName() {
        var d = new Date(),
            n = d.getTime(),
            newFileName =  n;
        return newFileName;
    }

    private presentToast(text) {
        let toast = this.toastCtrl.create({
            message: text,
            duration: 3000,
            position: 'top'
        });
        toast.present();
    }

    public uploadImage() {
        // Destination URL
        this.authProvider.addPicture(this.createFileName(), this.imageData)
            .then(data => {
                console.log(data);
                this.presentToast("La imagen se subio correctamente :-)");
            });
    }

    picturesList() {
        this.navCtrl.push(PictureListPage);
    }

}
