import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {AngularFireAuthModule} from 'angularfire2/auth';

import { File } from '@ionic-native/file';
import { Transfer } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';
import { AuthProvider } from '../providers/auth/auth';
import {LoginPage} from "../pages/login/login";
import {PictureListPage} from "../pages/picture-list/picture-list";

export const firebaseConfig = {
    apiKey: "AIzaSyDRlY0OIv88OLmCISbXdWe_HurvMQfeKwM",
    authDomain: "upload-image-db719.firebaseapp.com",
    databaseURL: "https://upload-image-db719.firebaseio.com",
    storageBucket: "upload-image-db719.appspot.com",
    messagingSenderId: "149724188994"
};

// Initialize Firebase
/*var config = {
    apiKey: "AIzaSyDRlY0OIv88OLmCISbXdWe_HurvMQfeKwM",
    authDomain: "upload-image-db719.firebaseapp.com",
    databaseURL: "https://upload-image-db719.firebaseio.com",
    projectId: "upload-image-db719",
    storageBucket: "upload-image-db719.appspot.com",
    messagingSenderId: "149724188994"
};
*/

@NgModule({
    declarations: [
        MyApp,
        HomePage,
        LoginPage,
        PictureListPage
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp),
        AngularFireModule.initializeApp(firebaseConfig),
        AngularFireAuthModule,
        AngularFireDatabaseModule
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage,
        LoginPage,
        PictureListPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        File,
        Transfer,
        Camera,
        FilePath,
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        AuthProvider
    ]
})
export class AppModule {}
