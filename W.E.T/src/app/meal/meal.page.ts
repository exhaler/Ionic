import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { DomSanitizer } from "@angular/platform-browser";

import { SocialSharing } from '@ionic-native/social-sharing/ngx';

import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

import { MealdbApiService } from "../services/mealdb-api.service";
import { MEALDB_Meal } from "../services/model";
import { FavoriteService } from "../services/favorite.service";

@Component({
  selector: "app-meal",
  templateUrl: "./meal.page.html",
  styleUrls: ["./meal.page.scss"],
})
export class MealPage implements OnInit {
  id: string;
  meal$: Observable<any>;
  ingredients;
  instructions;
  isFavorite = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private mealdb: MealdbApiService,
    private sanitizer: DomSanitizer,
    public favoriteService: FavoriteService,
    private socialSharing: SocialSharing
  ) {
    this.id = this.activatedRoute.snapshot.paramMap.get("mealId");
    this.favoriteService.isFavorite(this.id).then((isFav) => {
      //console.log(isFav)
      this.isFavorite = isFav;
    });

    this.meal$ = this.mealdb.getMealById(this.id).pipe(
      tap((meal) => {
        this.ingredients = this.getIngredientsArray(meal);
        this.instructions = this.convertInstructionsToArray(meal);
        //console.log(meal);
      })
    );
  }

  ngOnInit() {}

  getYoutubeLink(meal: MEALDB_Meal) {
    const id = meal.strYoutube.split("=")[1];
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.youtube.com/embed/${id}?autoplay=1&origin=http://example.com`
    );
  }

  getIngredientsArray(meal: MEALDB_Meal) {
    const results = [];
    for (let i = 1; i <= 20; i++) {
      results.push([meal["strIngredient" + i], meal["strMeasure" + i]]);
    }
    return results.filter((i) => !!i[0]);
  }

  convertInstructionsToArray(meal: MEALDB_Meal) {
    return meal.strInstructions.split("\n").filter((i) => i.trim());
  }

  addToFavorites(meal) {
    this.favoriteService.favoriteMeal(meal).then(() => {
      this.isFavorite = true;
    });
  }

  removeFromFavorites(meal) {
    this.favoriteService.unfavoriteMeal(meal).then(() => {
      this.isFavorite = false;
    });
  }

  shareMeal(meal) {
    // var options = {
    //   message: 'share this', // not supported on some apps (Facebook, Instagram)
    //   subject: 'the subject', // fi. for email
    //   files: ['', ''], // an array of filenames either locally or remotely
    //   url: 'https://www.website.com/foo/#bar?a=b',
    //   chooserTitle: 'Pick an app', // Android only, you can override the default share sheet title
    //   appPackageName: 'com.apple.social.facebook', // Android only, you can provide id of the App you want to share with
    //   iPadCoordinates: '0,0,0,0' //IOS only iPadCoordinates for where the popover should be point.  Format with x,y,width,height
    // };
    // this.socialSharing.shareWithOptions(options);
    this.socialSharing.share("Check out this delicious meal", meal.strMeal, meal.strMealThumb, null);

  }
}
