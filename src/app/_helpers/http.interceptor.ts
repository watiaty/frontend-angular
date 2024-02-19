import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {StorageService} from "../_services/storage.service";

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

  constructor(private storageService: StorageService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.storageService.getAccessToken();

    if (token != null) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        },
        withCredentials: true,
      });
    }
    return next.handle(req);
  }
}
