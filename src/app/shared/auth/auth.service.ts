import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Subscription } from "rxjs";
import { tap } from "rxjs/operators";
import { environment } from "src/environments/environment";

import { User } from "./user.model";
import { ApiService } from "../api.service";
// import { ValidateAdminResponse } from "../api.service";

export interface AuthResponseData {
  success: boolean;
  payload: {
    user: {
      id: number;
      email: string;
      first_name: string;
      last_name: string;
      name: string;
      phone: string;
      token: {
        id: number;
        created_at: string;
        expiry: string;
        ip: string;
        revocation_date: string;
        updated_at: string;
        user_id: number;
        value: string;
      };
    },
    is_admin: boolean
  };
}

export interface UserData {
  email: string;
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  isAdmin: boolean;
  _token: string;
  _tokenExpirationDate: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser = new BehaviorSubject<User|null>(null);
  userToken = null;
  validAdmin = new BehaviorSubject<boolean>(false);
  // validationSub: Subscription;
  private tokenExpTimer: any;

  constructor(private http: HttpClient, private router: Router, private apiService: ApiService) {}

  automaticSignIn() {
    const storedUser = localStorage.getItem('userData');
    // Check for locally saved user data
    if (!storedUser) {
      return;
    } else {
      const userData: UserData = JSON.parse(storedUser as string);
      const { email, id, firstName, lastName, isAdmin, _token, _tokenExpirationDate } = userData;
      // If exists, set saved data to variables, add new token expiry
      const loadedUser = new User (
        email,
        id,
        firstName,
        lastName,
        isAdmin,
        _token,
        new Date(_tokenExpirationDate)
      );
      // Emit user and redirect
      if (loadedUser.token) {
        this.currentUser.next(loadedUser);
        // this.validationSub = this.apiService.validateAdmin(loadedUser.token).subscribe((res: ValidateAdminResponse) => {
        //   console.log(res);
        //   this.isAdmin = res.success;
        // });

        this.validAdmin.next(loadedUser.isAdmin);
        this.router.navigate(['../home']);
      }
    }
  }

  automaticSignOut(expDuration: number) {
    // Set timeout duration and call logout function when expired
    this.tokenExpTimer = setTimeout(() => {
      this.signOut();
    }, expDuration);
  }

  handleAuth(email: string, userId: number, first: string, last: string, isAdmin: boolean, token: string, expiresIn: number) {
    // Set expiration for token
    const expDate = new Date(new Date().getTime() + expiresIn * 1000);
    //  Take in form info and create a new user based on it
    const formUser = new User(email, userId, first, last, isAdmin, token, expDate);
    // Set new expiration timer for token
    this.automaticSignOut(expiresIn);
    // Emit new user
    this.currentUser.next(formUser);
    this.validAdmin.next(isAdmin);
    // Save user in local storage
    localStorage.setItem('userData', JSON.stringify(formUser));
    console.log(formUser)
  }

  signIn(email: string, password: string) {
    // Make post request to backend
    return this.http.post<AuthResponseData>(
      `${environment.apiRoute}users/login`,
      {
        // Pass sign in data as object
        email,
        password,
        returnSecureToken: true,
      }
    ).pipe(
      tap((response) => {
        // Destructure to access all response values
        const { success, payload } = response;
        // Calculate time until expiration
        let expiresAt = new Date(response.payload.user.token.expiry).getTime();
        let now = new Date(response.payload.user.token.created_at).getTime();
        let expiresIn = +expiresAt - +now;
        // Pass response values to handleAuth method
        this.handleAuth(email, payload.user.id, payload.user.first_name, payload.user.last_name, payload.is_admin, payload.user.token.value, +expiresIn);
        }
      )
    );
  }

  signOut() {
    // Emit user as null
    this.currentUser.next(null);
    // Clear user from local storage
    localStorage.removeItem('userData');
    if (this.tokenExpTimer) {
      // Clear any remaining time on token expiration timer
      clearTimeout(this.tokenExpTimer);
    }
    // Navigate back to auth form
    this.router.navigate(['auth']);
  }

  signUp(email: string, password: string, phone: string, firstName: string, lastName: string) {
    // Make post request to backend
    return this.http.post<AuthResponseData>(`${environment.apiRoute}users/create`, {
      // Pass registration data as object
      email: email,
      password: password,
      first_name: firstName,
      last_name: lastName,
      phone: phone,
      returnSecureToken: true
    }).pipe(
      tap((response) => {
        if (response.success){
          this.signIn(email, password);
        }
        // // Destructure to access all response values
        // const { success, payload } = response;
        // // Calculate time until expiration
        // let expiresAt = new Date(response.payload.user.token.revocation_date).getTime
        // let now = new Date(response.payload.user.token.created_at).getTime
        // let expiresIn = +expiresAt - +now
        // // Pass response values to handleAuth method
        // this.handleAuth(payload.user.email, payload.user.id, payload.user.first_name, payload.user.last_name, payload.user.token.value, +expiresIn)
        }
      )
    );
  }
}
