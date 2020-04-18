import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(
    private _alertController: AlertController
  ) {}

  async selectImageSource() {
    const alert = await this._alertController.create({
      header: "Select source",
      message: "Pick a source for your images",
      buttons: [
        {
          text: "Camera",
          handler: ()=> {

          }
        },
        {
          text: "Gallery",
          handler: ()=> {
            
          }
        }
      ]
    });

    await alert.present();
  }

}
