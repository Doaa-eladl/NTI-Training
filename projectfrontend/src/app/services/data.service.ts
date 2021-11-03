import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public isAuthed = false
  public isAdmin = false

  constructor(private _http:HttpClient) { }

  getallproducts():Observable<any>{
    return this._http.get('http://localhost:3000/auth/showallproducts')
  }
  getnotebooks():Observable<any>{
    return this._http.get('http://localhost:3000/auth/shownotebookproducts')
  }
  getsmartphones():Observable<any>{
    return this._http.get('http://localhost:3000/auth/showsmartphoneproducts')
  }
  register(user:any):Observable<any>{
    return this._http.post('http://localhost:3000/auth/regestier',user)
  }
  login(data:any):Observable<any>{
    return this._http.post('http://localhost:3000/auth/login',data)
  }
  profile():Observable<any>{
    return this._http.get(`http://localhost:3000/user/profile`)
  }
  updateuser(user:any):Observable<any>{
    return this._http.put(`http://localhost:3000/user/update`,user)
  }
  changepassword(user:any):Observable<any>{
    return this._http.put(`http://localhost:3000/user/changepass`,user)
  }
  logout():Observable<any>{
    return this._http.get(`http://localhost:3000/auth/logout`)
  }
  showcart():Observable<any>{
    return this._http.get(`http://localhost:3000/user/showcart`)
  }
  increasequantity(productId:any):Observable<any>{
    return this._http.post('http://localhost:3000/user/increasequantity',productId)
  }
  decreasequantity(productId:any):Observable<any>{
    return this._http.post('http://localhost:3000/user/decreasequantity',productId)
  }
  addtocart(addproduct:any):Observable<any>{
    return this._http.post('http://localhost:3000/user/addtocart',addproduct)
  }
  deleteproduct(productId:any):Observable<any>{
    return this._http.post('http://localhost:3000/user/deleteproductfromcart',productId)
  }
  showorder():Observable<any>{
    return this._http.get('http://localhost:3000/user/showorder')
  }
  sendorder():Observable<any>{
    return this._http.get('http://localhost:3000/user/sendorder')
  }
  deletecart():Observable<any>{
    return this._http.get('http://localhost:3000/user/deletecart')
  }
  deleteuser():Observable<any>{
    return this._http.delete('http://localhost:3000/user/delete')
  }
  logoutall():Observable<any>{
    return this._http.get('http://localhost:3000/auth/logoutall')
  }
  showuserorder():Observable<any>{
    return this._http.get('http://localhost:3000/user/showuserorder')
  }
  addproduct(product:any):Observable<any>{
    return this._http.post('http://localhost:3000/admin/addproduct',product)
  }
  addproductimg(product:any,id:String):Observable<any>{
    return this._http.post(`http://localhost:3000/admin/addproductimg/${id}`,product)
  }
  deleteproductbyadmin(id:String):Observable<any>{
    return this._http.delete(`http://localhost:3000/admin/deleteanyproduct/${id}`)
  }
  showsingle(id:any):Observable<any>{
    return this._http.get(`http://localhost:3000/admin/showsingle/${id}`)
  }
  updateproduct(product:any,id:any):Observable<any>{
    return this._http.put(`http://localhost:3000/admin/updateproduct/${id}`,product)
  }
}
