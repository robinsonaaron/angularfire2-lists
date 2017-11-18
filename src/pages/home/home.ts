import { Component } from '@angular/core';
import { NavController, AlertController, ActionSheetController } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  songs: Observable<any[]>;
  songsRef: AngularFireList<any>;

  constructor(public navCtrl: NavController,
    public alertCtrl: AlertController, 
    public afDatabase: AngularFireDatabase, 
    public actionSheetCtrl: ActionSheetController) {
    this.songsRef = afDatabase.list('/songs');
    this.songs = this.songsRef.valueChanges();
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
            const newSongRef = this.songsRef.push({
            });
            newSongRef.set({
              id: newSongRef.key,
              title: data.title
            });
          }
        }
      ]
    });
    prompt.present();
  }

  showOptions(songId, songTitle) {
    let actionSheet = this.actionSheetCtrl.create({
      title: "What do you want to do?",
      buttons: [
        {
          text: "Delete Song",
          role: "destructive",
          handler: () => {
            this.removeSong(songId);
          }
        },
        {
          text: "Update Title",
          handler: () => {
            this.updateSong(songId, songTitle);
          }
        },
        {
          text: "Cancel",
          role: "cancel",
          handler: () => {
            console.log("Cancel clicked");
          }
        }
      ]
    });
    actionSheet.present();
  }

  removeSong(songId) {
    this.songsRef.remove(songId);
  }

  updateSong(songId, songTitle) {
    let prompt = this.alertCtrl.create({
      title: "Song Name",
      message: "Update the name for this song",
      inputs: [
        {
          name: "title",
          placeholder: "Title",
          value: songTitle
        }
      ],
      buttons: [
        {
          text: "Cancel",
          handler: () => {
            console.log("Cancel clicked");
          }
        },
        {
          text: "Save",
          handler: (data) => {
            this.songsRef.update(songId, {
              title: data.title
            });
          }
        }
      ]
    });

    prompt.present();
  }
}
