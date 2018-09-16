import { Component, OnInit, OnDestroy } from "@angular/core";
import { LoadingController, ToastController } from "@ionic/angular";
import { DeviceService } from "../services/device.service";
import { timer } from "rxjs";
import { takeWhile, switchMap, catchError } from "rxjs/operators";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-device-list",
  templateUrl: "./device-list.page.html",
  styleUrls: ["./device-list.page.scss"]
})
export class DeviceListPage implements OnInit, OnDestroy {
  alive: boolean = true;
  ip;

  constructor(
    public loadingController: LoadingController,
    public toastController: ToastController,
    public deviceService: DeviceService,
    private route: ActivatedRoute
  ) {}

  ngOnDestroy() {
    this.alive = false; // switches your IntervalObservable off
    console.log("Device list destroyed");
  }
  ngOnInit(): void {
    this.route.params.subscribe(param => {
      if (param.ip) {
        this.ip = param.ip;
        timer(1000, 3000)
          .pipe(
            takeWhile(() => this.alive),
            switchMap(x => {
              return this.deviceService.sync(this.ip);
            })
          )
          .subscribe();
      }
    });
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      content: "Loading ...",
      duration: 2000
    });
    return await loading.present();
  }

  onChangeStatus(device) {
    device.status=device.status==0?1:0;
    this.deviceService
      .update(this.ip, device)
      .pipe(
        catchError(err => {
          this.presentToast("Sorry , Something went wrong .");
          return err;
        })
      )
      .subscribe(res => {
        if (res) {
          const status = device.status === 0 ? "OFF" : "ON";
          this.presentToast("Light is switched " + status);
        }
      });
  }
  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }
}
