import { BaseModel } from 'src/app/shared/models/base-model';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { User } from './user';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentUserSubject: BehaviorSubject<User>
  public currentUser: Observable<User>
  private apiRoot: string

  constructor(
    private http: HttpClient,
    private storage: LocalStorageService,
    private router: Router
  ) {
    this.apiRoot = `${environment.apiUrl}`
    this.currentUserSubject = new BehaviorSubject<User>(this.storage.getItem('currentUser'))
    this.currentUser = this.currentUserSubject.asObservable()
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value
  }

  setCurrentUser(user: User) {
    this.currentUserSubject.next(user)
  }

  generateAccessCode(params) {
    return this.http.post<any>(`${this.apiRoot}/users/generate_new_access_code`, params)
      .pipe(
        catchError(this.handleError),
        map(x => {
          const res = this.handleBaseResponse(x)
          return res.payload
        }
        ))
  }

  loginByEmail(params) {
    return this.http.post<any>(`${this.apiRoot}/users/login`, params)
      .pipe(map(data => {
        if (data.success) {
          // login successful if data.success = true and ther's a token in the payload
          const newUser = new User(data.payload)
          if (newUser && data.payload.token) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            this.storage.setItem('accessToken', data.payload.token)
            this.storage.setItem('currentUser', newUser)
            this.currentUserSubject.next(newUser)
          }
          return data.payload
        }
      }));
  }

  registerUserByEmail(params) {
    return this.http.post<any>(`${this.apiRoot}/users/register`, params)
      .pipe(map(data => {
        if (data.success) {
          // login successful if data.success = true and ther's a token in the payload
          const newUser = new User(data.payload)
          if (newUser && data.payload.token) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            this.storage.setItem('accessToken', data.payload.token)
            this.storage.setItem('currentUser', newUser)
            this.currentUserSubject.next(newUser)
          }
          return data.payload
        }
      }));
  }

  editProfile(params) {
    return this.http.post<any>(`${this.apiRoot}/admin/users/edit`, params)
      .pipe(map(data => {
        if (data.success) {
          // login successful if data.success = true and ther's a token in the payload
          const newUser = new User(data.payload)
          if (newUser && data.payload.token) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            this.storage.setItem('accessToken', data.payload.token)
            this.storage.setItem('currentUser', newUser)
            this.currentUserSubject.next(newUser)
          }
          return data.payload
        }
      }));
  }

  retrieveUserProfile(params) {
    return this.http.get<any>(`${this.apiRoot}/users/me`)
      .pipe(
        catchError(this.handleError),
        map(x => {
          const res = this.handleBaseResponse(x)
          return res.payload
        }))
  }


  logoutUser() {
    this.logout().subscribe(data => {
      // logout successful
      console.log(data)
      if (data) {
        this.removeCurrentUserAndRoute()
      } else {
        this.removeCurrentUserAndRoute()
      }
    }, error => {
      if (error) {
        this.removeCurrentUserAndRoute()
      }
    });
  }

  logout() {
    return this.http.post<any>(`${this.apiRoot}/users/logout`, {})
      .pipe(
        catchError(this.handleError),
        map(x => {
          const res = this.handleBaseResponse(x)
          return res.payload
        }
        ))
  }

  removeCurrentUserAndRoute() {
    this.storage.setItem('currentUser', undefined)
    this.storage.setItem('accessToken', undefined)
    this.storage.removeItem('currentUser')
    this.storage.removeItem('accessToken')
    this.currentUserSubject.next(null)
    this.router.navigate(['app/login'])
  }


  generateAccessCodeForPhone(params) {
    return this.http.post<any>(`${this.apiRoot}/users/generate_new_access_code`, params)
      .pipe(
        catchError(this.handleError),
        map(x => {
          const res = this.handleBaseResponse(x)
          return res.payload
        }
        ))
  }

  loginByPhone(params) {
    return this.http.post<any>(`${this.apiRoot}/users/login`, params)
      .pipe(map(data => {
        // login successful if data.success = true and ther's a token in the payload
        const newUser = new User(data.payload)
        if (newUser && data.payload.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          this.storage.setItem('accessToken', data.payload.token)
          this.storage.setItem('currentUser', newUser)
          this.currentUserSubject.next(newUser)
        }
        return data
      }));
  }

  registerUserByPhone(params) {
    return this.http.post<any>(`${this.apiRoot}/users/update_profile`, params)
      .pipe(map(data => {
        // login successful if data.success = true and ther's a token in the payload
        const newUser = new User(data.payload)
        if (newUser && data.payload.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          this.storage.setItem('accessToken', data.payload.token)
          this.storage.setItem('currentUser', newUser)
          this.currentUserSubject.next(newUser)
        }
        return data
      }));
  }

  retrieveUserProfileByPhone() {
    return this.http.post<any>(`${this.apiRoot}/users/update_profile`, {})
      .pipe(map(data => {
        // login successful if data.success = true and ther's a token in the payload
        const newUser = new User(data.payload)
        if (newUser && data.payload.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          this.storage.setItem('accessToken', data.payload.token)
          this.storage.setItem('currentUser', newUser)
          this.currentUserSubject.next(newUser)
        }
        return data
      }));
  }

  registerUserByPhoneNoAuth(params) {
    return this.http.post<any>(`${this.apiRoot}/users/update_profile`, params)
      .pipe(
        catchError(this.handleError),
        map(x => {
          const res = this.handleBaseResponse(x)
          return res.payload
        }
        ))
  }

  checkIfPhoneExists(params) {
    return this.http.post<any>(`${this.apiRoot}/users/phone_number_exists_in_system`, params)
      .pipe(
        catchError(this.handleError),
        map(x => {
          const res = this.handleBaseResponse(x)
          return res.payload
        }
        ))
  }

  migratePhoneNumbers(params) {
    return this.http.post<any>(`${this.apiRoot}/users/migrate_phone_numbers`, params)
      .pipe(map(data => {
        // login successful if data.success = true and ther's a token in the payload
        const newUser = new User(data.payload)
        if (newUser && data.payload.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          this.storage.setItem('accessToken', data.payload.token)
          this.storage.setItem('currentUser', newUser)
          this.currentUserSubject.next(newUser)
        }
        return data
      }));
  }

  generateAccessCodeForMigration(params) {
    return this.http.post<any>(`${this.apiRoot}/users/generate_access_code_for_phone_migration`, params)
      .pipe(
        catchError(this.handleError),
        map(x => {
          const res = this.handleBaseResponse(x)
          return res.payload
        }
        ))
  }

  verifyMigratedPhoneNumber(params) {
    return this.http.post<any>(`${this.apiRoot}/users/verify_migrated_phone_number`, params)
      .pipe(map(data => {
        // login successful if data.success = true and ther's a token in the payload
        const newUser = new User(data.payload)
        if (newUser && data.payload.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          this.storage.setItem('accessToken', data.payload.token)
          this.storage.setItem('currentUser', newUser)
          this.currentUserSubject.next(newUser)
        }
        return data
      }));
  }


  // END OF MODULE API CALLS

  private handleBaseResponse(res: BaseModel) {
    if (res.success) {
      return res
    } else {
      throwError(res.errors)
      return res
    }
  }

  private handleError(error) {
    let errorMessage = ''
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`
    }
    return throwError(error)
  }
}
