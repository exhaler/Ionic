import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { CameraOptions, Camera } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  myProfileImage;

  constructor(
    private _alertController: AlertController,
    private _camera: Camera
  ) {}

  async selectImageSource() {
    const cameraOptions: CameraOptions = {
      quality: 100,
      destinationType: this._camera.DestinationType.DATA_URL,
      encodingType: this._camera.EncodingType.JPEG,
      mediaType: this._camera.MediaType.PICTURE,
      targetHeight: 200,
      correctOrientation: true,
      sourceType: this._camera.PictureSourceType.CAMERA
    }

    const galleryOptions: CameraOptions = {
      quality: 100,
      destinationType: this._camera.DestinationType.DATA_URL,
      encodingType: this._camera.EncodingType.JPEG,
      mediaType: this._camera.MediaType.PICTURE,
      targetHeight: 200,
      correctOrientation: true,
      sourceType: this._camera.PictureSourceType.SAVEDPHOTOALBUM
    }

    const alert = await this._alertController.create({
      header: "Select source",
      message: "Pick a source for your images",
      buttons: [
        {
          text: "Camera",
          handler: ()=> {
            this._camera.getPicture(cameraOptions)
            .then((imageData)=> {
              this.myProfileImage = "data:image/jpeg;base64" + imageData;
            })
          }
        },
        {
          text: "Gallery",
          handler: ()=> {
            this._camera.getPicture(galleryOptions)
            .then((imageData)=> {
              this.myProfileImage = "data:image/jpeg;base64" + imageData;
            })
          }
        }
      ]
    });

    await alert.present();
  }

}
