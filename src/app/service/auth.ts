import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private STORAGE_KEY = 'netflux_auth';
  private LOGIN_SESSION_KEY = 'netflux_logged_in';

  users: any[] = [];
  private currentUserSubject = new BehaviorSubject<any>(null);

  constructor() {
    const saved = localStorage.getItem(this.STORAGE_KEY);
    this.users = saved ? JSON.parse(saved) : [];

    const loggedIn = localStorage.getItem(this.LOGIN_SESSION_KEY);
    if (loggedIn) {
      this.currentUserSubject.next(JSON.parse(loggedIn));
    }
  }

  signUp(newUser: any): boolean {
    if (newUser) {
      const checkToDup = this.users.find(user => user.id === newUser.id)
      if (checkToDup) {
        alert("This ID is already taken");
        return false;
      }
      this.users.push(newUser);
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.users));
      return true;
    }else return false;
  }

  login(id: string, pw: string): boolean {
    const checkToUser = this.users.find(user => user.id === id && user.password === pw);
    if (checkToUser) {
      this.currentUserSubject.next(checkToUser);
      localStorage.setItem(this.LOGIN_SESSION_KEY,JSON.stringify(checkToUser));

      console.log("Valid user logged In!", checkToUser);
      return true;
    }else{
      alert("Invalid ID or Password");
      return false
    }
  }

  logout(){
    localStorage.removeItem(this.LOGIN_SESSION_KEY);
    this.currentUserSubject.next(null);
    alert("Logged out successfully!");
  }

  getCurrentUser(){
    return this.currentUserSubject.asObservable();
  }
}
