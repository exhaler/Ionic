import { Component, OnInit, ViewChild } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";

import { CameraOptions, Camera } from "@ionic-native/camera/ngx";
import { ActionSheetController, AlertController } from "@ionic/angular";
import { MenuController, IonSlides } from "@ionic/angular";

@Component({
  selector: "app-submit-form",
  templateUrl: "./submit-form.page.html",
  styleUrls: ["./submit-form.page.scss"],
})
export class SubmitFormPage implements OnInit {
  @ViewChild("slides", { static: true }) slides: IonSlides;
  newsForm: FormGroup;
  showPreviousBtn: boolean = false;
  slideIndex: number = 0;
  stepText: string = "1/3 About your loved one";
  currentDate: String = new Date().toISOString();

  constructor(
    public actionCtrl: ActionSheetController,
    private camera: Camera,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.newsForm = new FormGroup({
      firstName: new FormControl(null, {
        validators: [Validators.required],
      }),
      lastName: new FormControl(null, {
        validators: [Validators.required],
      }),
      dateOfBirth: new FormControl(null, {
        validators: [Validators.required],
      }),
      dateOfDeath: new FormControl(null, {
        validators: [Validators.required],
      }),
      funeralDate: new FormControl(null, {
        validators: [Validators.required],
      }),
      funeralTime: new FormControl(null, {
        validators: [Validators.required],
      }),
      children: new FormControl(null, {
        validators: [Validators.required],
      }),
      relatives: new FormControl(null, {
        validators: [Validators.required],
      }),
      dateOfPublish: new FormControl(null, {
        validators: [Validators.required],
      }),
      numberOfDay: new FormControl(null, {
        validators: [Validators.required],
      }),
    });

    this.slides.lockSwipes(true);
  }

  onSlideChangeStart(event) {
    event.target.isBeginning().then((res) => {
      this.showPreviousBtn = !res;
    });

    event.target.getActiveIndex().then((index) => {
      this.slideIndex = index;
      switch (index) {
        case 1:
          this.stepText = "2/3 About the funeral";
          break;

        case 2:
          this.stepText = "3/3 Submit obituary";
          break;

        default:
          this.stepText = "1/3 About your loved one";
          break;
      }
    });
  }

  nextStep() {
    const formCtrl = this.newsForm.controls;
    let alertMsg = "";

    if (this.slideIndex === 0) {
      if (formCtrl.firstName.status === "INVALID") {
        alertMsg += "- First name<br/>";
      }

      if (formCtrl.lastName.status === "INVALID") {
        alertMsg += "- Last name<br/>";
      }

      if (formCtrl.dateOfBirth.status === "INVALID") {
        alertMsg += "- Date of birth<br/>";
      }

      if (formCtrl.dateOfDeath.status === "INVALID") {
        alertMsg += "- Date of death<br/>";
      }

      if (
        formCtrl.firstName.status === "VALID" &&
        formCtrl.lastName.status === "VALID" &&
        formCtrl.dateOfBirth.status === "VALID" &&
        formCtrl.dateOfDeath.status === "VALID"
      ) {
        this.slides.lockSwipes(false).then((res) => {
          this.slides.lockSwipeToNext(true);
        });
        this.slides.slideNext();
      }
    }

    if (this.slideIndex === 1) {
      if (formCtrl.funeralDate.status === "INVALID") {
        alertMsg += "- Date of Funeral<br/>";
      }

      if (formCtrl.funeralTime.status === "INVALID") {
        alertMsg += "- Funeral time<br/>";
      }

      if (
        formCtrl.funeralDate.status === "VALID" &&
        formCtrl.funeralTime.status === "VALID"
      ) {
        this.slides.lockSwipes(false).then((res) => {
          this.slides.lockSwipeToNext(true);
        });
        this.slides.slideNext();
      }
    }

    if (alertMsg !== "") {
      this.showAlert(alertMsg);
    }
  }

  showAlert(msg: string) {
    this.alertCtrl
      .create({
        header: "Missing fields:",
        message: msg,
        buttons: [
          {
            text: "Okay",
            handler: () => {},
          },
        ],
      })
      .then((alertModal) => {
        alertModal.present();
      });
  }

  async addPhoto() {
    const cameraOptions: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      targetHeight: 200,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.CAMERA,
    };

    const galleryOptions: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      targetHeight: 200,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
    };

    const action = await this.actionCtrl.create({
      header: "Select source",
      buttons: [
        {
          text: "Camera",
          handler: () => {
            this.camera.getPicture(cameraOptions).then((imageData) => {
              // this.myProfileImage = "data:image/jpeg;base64" + imageData;
              const image = "data:image/jpeg;base64" + imageData;
              console.log("camera image: ", image);
            });
          },
        },
        {
          text: "Gallery",
          handler: () => {
            this.camera.getPicture(galleryOptions).then((imageData) => {
              // this.myProfileImage = "data:image/jpeg;base64" + imageData;
              const image = "data:image/jpeg;base64" + imageData;
              console.log("gallery image: ", image);
            });
          },
        },
      ],
    });

    await action.present();
  }
}
