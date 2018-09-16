import { Component } from '@angular/core';

import { Platform, ToastController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { DeviceService } from './services/device.service';
import { throttleTime } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public toastController: ToastController,
    private deviceService:DeviceService
  ) {
    this.initializeApp();
    this.deviceService.device$
    .pipe(throttleTime(3000))
    .subscribe((res)=>{
      if(res && res.length>0){
        let notify:boolean=false,message="";
        for(let i=0;i<res.length;i++){
          if(res[i].status===1 && res[i].ir===0){
            message+=" LED" +(i+1)
            notify=true;
          }
        }
        if(notify)
        this.presentToast(message+"  IS ON , NO ONE IN THE ROOM .");
      }
    })
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position:"middle"
    });
    toast.present();
  }
}
