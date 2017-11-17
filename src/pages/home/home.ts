import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  songs: Observable<any[]>;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, 
    public afDatabase: AngularFireDatabase) {
    this.songs = afDatabase.list('/songs').valueChanges();
  }

  addSong() {
    console.log("Add song");

    let prompt = this.alertCtrl.create({
      title: 'Song Name',
      message: 'Enter a song name',
      inputs: [
        {
          name: 'title',
          placeholder: 'Title'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: (data) => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: (data) => {
            this.afDatabase.list('songs').push({
              title: data.title
            });
          }
        }
      ]
    });
    prompt.present();
  }
}
