import { Component, OnInit, ViewChild } from '@angular/core';
import { Usuario } from 'src/app/interfaces/usuario';
import { IonSlides, LoadingController, ToastController} from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  @ViewChild(IonSlides)slides:IonSlides;
  public loginPosicao = 0;
  public loginDiferente = 100;

  usuarioLogin = {} as Usuario;
  usuarioRegister = {} as Usuario;

  private loading: any;

  constructor(
    private authService:AuthService,
    private loadingCtrl:LoadingController,
    private toastCtrl:ToastController
  ) { }

  ngOnInit() {
  }

  segmentChanged(event:any){
    if(event.detail.value==='login'){
      this.slides.slidePrev();
      this.loginPosicao += this.loginDiferente;
    }else{
      this.slides.slideNext();
      this.loginPosicao -= this.loginDiferente;
    }
  }

  async presentLoading(){
    this.loading = await this.loadingCtrl.create({
      message:'Aguarde...'
    });
    return this.loading.present();
  }
  async presentToast(message:string){
    const toast = await this.toastCtrl.create({
      message,
      duration:5000
    });
    toast.present();
  }

  async register(){

    await this.presentLoading();

    try{
      await this.authService.register(this.usuarioRegister);
    }catch(error){
      let message: string;
      switch(error.code){
        case 'auth/email-already-in-use':
        message = 'E-mail sendo usando';
        break;
        case 'auth/invalid-email':
          message = 'E-mail inválido';
          break;
      }
       this.presentToast(message);
    }finally{
      this.loading.dismiss();
    }
  }
  async login(){
    await this.presentLoading();
    try{
      await this.authService.login(this.usuarioLogin);
    }catch(error){
      this.presentToast(error.message);
    }finally{
      this.loading.dismiss();
    }
  }

}
