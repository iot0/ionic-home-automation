import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.page.html',
  styleUrls: ['./device-list.page.scss'],
})
export class DeviceListPage implements OnInit {
  deviceList=[];
  constructor() { }

  ngOnInit() {
    this.deviceList=[
      {
        Id:1,
        Name:"Fan",
        Status:"on"
      },
      {
        Id:7,
        Name:"Light",
        Status:"off"
      },
      {
        Id:1,
        Name:"AC",
        Status:"on"
      }
    ];
    
  }

}
