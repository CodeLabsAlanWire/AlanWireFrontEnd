import { HttpHandler, HttpInterceptor, HttpRequest, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { exhaustMap, take } from "rxjs/operators";
import { AuthService } from "./auth.service";


@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor{
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (req.url.includes('alanwireapi.codefilabsapi.com')
    // || req.url.includes('127.0.0.1:3000')
    )
    {
    return this.authService.currentUser.pipe(
      take(1),
      exhaustMap(user => {
        if (!user) return next.handle(req);
        const modifiedReq = req.clone({
          headers: new HttpHeaders()
          .set('Authorization', (`Bearer ${user.token as string}`))
          .set('Content-Type', 'application/json')
          .set('Access-Control-Allow-Origin', 'https://alanwire-frontend.web.app')
          .set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PATCH, PUT, DELETE')
          .set('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version')
        });
        return next.handle(modifiedReq);
      })
    );} else {
      return next.handle(req);
    }
  }
}
