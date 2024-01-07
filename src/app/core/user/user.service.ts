import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = 'https://api.managol.co/user/';

  constructor(private http: HttpClient) { }

  getUser(token: string, id: string): any {
    const params = new HttpParams().set('token', token);
    return this.http.get(this.baseUrl + 'getUser/' + id, { params });
  }

  getAllproduct(): any {
    return this.http.get(this.baseUrl + 'getAllproduct')
  }
  getAllProductByCat(id: string): any {
    return this.http.get(this.baseUrl + 'getAllProductByCat/' + id);
  }
  getAllOrderByUser(token: string, id: string): any {
    const params = new HttpParams().set('token', token);
    return this.http.get(this.baseUrl + 'getAllOrderByUser/' + id, { params })
  }

  uploadFile(data: any): any {
    return this.http.post(this.baseUrl + 'upload', data);
  }

  registerOrder(token: string, data: any): any {
    const params = new HttpParams().set('token', token);
    return this.http.post(this.baseUrl + 'registerOrder', data, { params });
  }

  updateUser(token: string, id: string, data: any): any {
    const params = new HttpParams().set('token', token);
    return this.http.put(this.baseUrl + 'updateUser/' + id, data, { params });
  }


  getAllCategories(token: string): any {
    const params = new HttpParams().set('token', token);
    return this.http.get(this.baseUrl + 'getAllCategory', { params });
  }

  getAllCategory(): any {
    return this.http.get(this.baseUrl + 'getAllCategory');
  }
  getAllSubCategory(id: string): any {
    return this.http.get(this.baseUrl + 'getAllSubCategory/' + id);
  }
  getAllProductBySubCat(id: string): any {
    return this.http.get(this.baseUrl + 'getAllProductBySubCat/' + id);
  }

}
