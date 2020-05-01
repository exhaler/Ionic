import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: "app-contact-us",
  templateUrl: "./contact-us.page.html",
  styleUrls: ["./contact-us.page.scss"],
})
export class ContactUsPage implements OnInit {
  contactUsForm: FormGroup;

  constructor() {}

  ngOnInit() {
    this.contactUsForm = new FormGroup({
      enquiry: new FormControl("general", {}),
      name: new FormControl(null, {
        validators: [Validators.required],
      }),
      email: new FormControl(null, {
        validators: [Validators.required, Validators.email],
      }),
      comments: new FormControl(null, {
        validators: [Validators.required],
      }),
    });
  }

  submitContactUs() {
    if (!this.contactUsForm.valid) {
      return;
    }

    console.log(this.contactUsForm.value);
  }
}
