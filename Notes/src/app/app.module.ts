import { NgModule, APP_INITIALIZER } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";

import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { SQLite } from "@ionic-native/sqlite/ngx";
import { IonicStorageModule } from "@ionic/storage";
import { Camera } from "@ionic-native/camera/ngx";
import { PhotoViewer } from "@ionic-native/photo-viewer/ngx";
import { LocalNotifications } from "@ionic-native/local-notifications/ngx";

import { MobxAngularModule } from "mobx-angular";
import { configure } from "mobx";

import { STORE_CONFIG } from "./core/constants/store-config";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import {
  AppStartupService,
  startupServiceFactory,
} from "./core/services/app-startup.service";

configure({
  enforceActions: "always",
});

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    MobxAngularModule,
    IonicStorageModule.forRoot({
      name: STORE_CONFIG.DATABASE_NAME,
      driverOrder: ["indexeddb", "websql"],
    }),
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SQLite,
    Camera,
    PhotoViewer,
    LocalNotifications,
    {
      provide: APP_INITIALIZER,
      multi: true,
      deps: [AppStartupService],
      useFactory: startupServiceFactory,
    },
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
