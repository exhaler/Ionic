import { Component, OnInit, ViewChild } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { CameraOptions, Camera } from "@ionic-native/camera/ngx";
import {
  ActionSheetController,
  AlertController,
  ToastController,
} from "@ionic/angular";
import { IonSlides } from "@ionic/angular";

@Component({
  selector: "app-submit-form",
  templateUrl: "./submit-form.page.html",
  styleUrls: ["./submit-form.page.scss"],
})
export class SubmitFormPage implements OnInit {
  @ViewChild("slides", { static: true }) slides: IonSlides;
  newsForm: FormGroup;
  showPreviousBtn: boolean = false;
  lastSlide: boolean = false;
  slideIndex: number = 0;
  stepText: string = "1/3 About your loved one";
  currentDate: String = new Date().toISOString();

  constructor(
    public actionCtrl: ActionSheetController,
    private camera: Camera,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private router: Router
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
      children: new FormControl(null, {}),
      relatives: new FormControl(null, {}),
      dateOfPublish: new FormControl(null, {
        validators: [Validators.required],
      }),
      numberOfDay: new FormControl(null, {
        validators: [Validators.required, Validators.min(1), Validators.max(4)],
      }),
    });

    this.slides.lockSwipes(true);
  }

  onSubmitForm() {
    if (!this.newsForm.valid) {
      return;
    }

    console.log(this.newsForm.value);
    this.toastCtrl
      .create({
        message: "Obituary created successfully",
        duration: 2500,
        position: "top",
        color: "success",
      })
      .then((toastEl) => {
        this.newsForm.reset();
        this.router.navigateByUrl("/app/home");
        toastEl.present();
      });
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
          this.lastSlide = false;
          break;

        case 2:
          this.stepText = "3/3 Submit obituary";
          this.lastSlide = true;
          break;

        default:
          this.stepText = "1/3 About your loved one";
          this.lastSlide = false;
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
