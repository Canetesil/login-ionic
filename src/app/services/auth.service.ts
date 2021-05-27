import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Usuario } from 'src/app/interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private auth: AngularFireAuth
  ) { }

  login(usuario:Usuario){
    return this.auth.signInWithEmailAndPassword(usuario.email,usuario.senha);
  }

  register(usuario:Usuario){
    return this.auth.createUserWithEmailAndPassword(usuario.email,usuario.senha);
  }

  logout(){
    return this.auth.signOut();
  }

  getAuth(){
    return this.auth;
  }

}
