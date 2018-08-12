import { Component, OnInit } from "@angular/core";
import { LoadingController,ToastController } from "@ionic/angular";

@Component({
  selector: "app-device-list",
  templateUrl: "./device-list.page.html",
  styleUrls: ["./device-list.page.scss"]
})
export class DeviceListPage implements OnInit {
  deviceList = [];

  constructor(public loadingController: LoadingController,
    public toastController: ToastController) {}

  ngOnInit() {
    // this.presentLoading();
    this.presentToast("Alert : Fan1 and Light is ON at the moment and no one inside the room .")
    this.deviceList = [
      {
        Id: 1,
        Name: "Fan1",
        Status: "on"
      },
      {
        Id: 1,
        Name: "Fan2",
        Status: "on"
      },
      {
        Id: 1,
        Name: "Fan3",
        Status: "on"
      },
      {
        Id: 1,
        Name: "Fan4",
        Status: "on"
      },
      {
        Id: 7,
        Name: "Light",
        Status: "off"
      },
      {
        Id: 1,
        Name: "AC1",
        Status: "on"
      },
      {
        Id: 1,
        Name: "AC2",
        Status: "on"
      }
    ];
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      content: "Loading ...",
      duration: 2000
    });
    return await loading.present();
  }

  onChangeStatus(device) {
    if (device.Status === "on") device.Status = "off";
    else device.Status = "on";

    this.presentToast(device.Name+" is switched "+device.Status);
  }
  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 60000
    });
    toast.present();
  }
}
