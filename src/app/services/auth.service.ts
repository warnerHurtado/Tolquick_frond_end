import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { userModel } from '../models/userModel';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private url    = 'https://identitytoolkit.googleapis.com/v1/accounts:';
  private apiKey = 'AIzaSyDxjX-AfZ7G7AgdA8KY8sV3zogtCf5G9lk';
  
  private userToken: string;
  // crear usuarios
  // https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]

  // login
  // https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]


  constructor(private http  : HttpClient,) {
    this.readToken();               
              }

  logOut(){
    localStorage.removeItem('token');
  }

  login( user: userModel){
    const authData = {
      ...user,
      returnSecureToken: true
    };

    return this.http.post(
      `${ this.url }signInWithPassword?key=${ this.apiKey }`, authData
    ).pipe(
      map( resp => {
        this.saveToken( resp['idToken'] );
        return resp;
      })
    );
  }

  newUser( user: userModel ){

    const authData = {
      ...user,
      returnSecureToken: true
    };

    return this.http.post(
      `${ this.url }signUp?key=${ this.apiKey }`, authData
    ).pipe(
      map( resp => {
        this.saveToken( resp['idToken'] );
        return resp;
      })
    );

  }

  
  private saveToken(idToken: string ){
    this.userToken = idToken;

    localStorage.setItem('token', idToken);

    let today = new Date();
    today.setSeconds( 3600 );

    localStorage.setItem('expira', today.getTime().toString() );

  }

  private readToken(){

    if( localStorage.getItem('token')) {
      this.userToken = localStorage.getItem('token');
    } else{
      this.userToken = '';
    }

    return this.userToken;
  }

  IsAutentic(): boolean {
    
    if ( this.userToken.length < 2 ) {
      return false;
    }

    const expira = Number(localStorage.getItem('expira'));
    const expiraDate = new Date();
    expiraDate.setTime(expira);

    if ( expiraDate > new Date() ) {
      return true;
    } else {
      return false;
    }

  }

}
