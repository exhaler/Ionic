import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Plugins } from "@capacitor/core";

import { BehaviorSubject, from } from "rxjs";
import { map, tap } from "rxjs/operators";

import { User } from "../shared/models";
import { AuthResponseData } from "../shared/types";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private _user = new BehaviorSubject<User>(null);

  get userIsAuthenticated() {
    return this._user.asObservable().pipe(
      map((user) => {
        if (user) {
          return !!user.token;
        } else {
          return false;
        }
      })
    );
  }

  constructor(private http: HttpClient) {}

  private setUserData(userData: AuthResponseData) {
    if (!userData.error) {
      this._user.next(
        new User(
          userData.data.userId,
          userData.data.displayName,
          userData.data.email,
          userData.data.token
        )
      );
      this.storeAuthData(
        userData.data.userId,
        userData.data.displayName,
        userData.data.email,
        userData.data.token
      );
    }
  }

  autoLogin() {
    return from(Plugins.Storage.get({ key: "authData" })).pipe(
      map((storedData) => {
        if (!storedData || !storedData.value) {
          return null;
        }

        const parsedData = JSON.parse(storedData.value) as {
          userId: string;
          displayName: string;
          email: string;
          _token: string;
        };

        const user = new User(
          parsedData.userId,
          parsedData.displayName,
          parsedData.email,
          parsedData._token
        );

        return user;
      }),
      tap((user) => {
        if (user) {
          this._user.next(user);
        }
      }),
      map((user) => {
        return !!user;
      })
    );
  }

  login(email: string, password: string) {
    const data = `user_login&email=${email}&password=${password}`;
    return this.http
      .post<AuthResponseData>(`${environment.apiURL}${data}`, null)
      .pipe(tap(this.setUserData.bind(this)));
  }

  private storeAuthData(
    userId: string,
    displayName: string,
    email: string,
    _token: string
  ) {
    const data = JSON.stringify({
      userId: userId,
      displayName: displayName,
      email: email,
      token: _token,
    });
    Plugins.Storage.set({
      key: "authData",
      value: data,
    });
  }

  logout() {
    this._user.next(null);
    Plugins.Storage.remove({ key: "authData" });
    window.dispatchEvent(new CustomEvent('user:logout'));
  }

  async getUserToken(): Promise<string> {
    const token = await Plugins.Storage.get({ key: "authData" });
    
    if (!token.value) {
      return;
    }
    const value = JSON.parse(token.value);
    return value.token;
  }

  async getUsername(): Promise<string> {
    const displayName = await Plugins.Storage.get({ key: "authData" });
    
    if (!displayName.value) {
      return;
    }
    const value = JSON.parse(displayName.value);
    //console.log("display name", value.displayName);
    return value.displayName;
  }

  async isLoggedIn(): Promise<boolean> {
    const authData = await Plugins.Storage.get({ key: "authData" });
    if (authData.value) {
      const parsedAuthData = JSON.parse(authData.value);

      if (!parsedAuthData.token) {
        return false;
      } else {
        return true;
      }
    }
  }
}
