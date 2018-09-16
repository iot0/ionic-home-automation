import { Component, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { DeviceService } from "../services/device.service";
import { ToastController } from "@ionic/angular";
import { timer } from "rxjs";
import { takeWhile, switchMap, catchError } from "rxjs/operators";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage implements OnDestroy {
  intelligentMode;
  alive: boolean = true;
  constructor(
    private router: Router,
    private deviceService: DeviceService,
    public toastController: ToastController
  ) {}
  ngOnDestroy(): void {
    this.alive = false;
    console.log("home destroyed");
  }
  onSync(ip: string) {
    if (ip) {
      this.router.navigate(["device-list", ip]);
      timer(0, 3000)
        .pipe(
          takeWhile(() => this.alive),
          switchMap(x => {
            return this.deviceService.sync(ip);
          }),
          catchError(err => {
            this.presentToast("Sorry Something went wrong .");
            return err;
          })
        )
        .subscribe();
      // this.deviceService.sync(ip).subscribe(res => {
      //   this.router.navigate(["device-list", ip]);
      // });
    }
  }

  changeMode(ip: string) {
    if (ip) {
      let intelligentMode = this.intelligentMode === 0 ? 1 : 0;
      this.deviceService.changeMode(ip, intelligentMode).subscribe(res => {
        this.intelligentMode = intelligentMode;
        let message =
          "Intelligent mode is " +
          (this.intelligentMode === 1 ? "Enabled" : "Disabled");
        this.presentToast(message);
      });
    }
  }
  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }
}
