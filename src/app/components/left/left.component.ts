import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import { Location} from '../../classes/location';
import {GetLocationDataService} from '../../services/get-location-data.service'; //引入服务
@Component({
  selector: 'app-left',
  templateUrl: './left.component.html',
  styleUrls: ['./left.component.scss']
})
export class LeftComponent implements OnInit {
  @ViewChild('map') mapElement;  //地图的dom
  map:any; //地图的下标
  locationCenter: Location = { lat: -34.397, lng: 150.644 };
  infoWindow:any;  //窗口信息
  constructor(public mark: GetLocationDataService) { }
  //生命周期函数
  ngOnInit(): void {
    this.listenerChange()
  }
  ngAfterViewInit(){
    this.initMap()
  }

  //初始化地图的函数
  initMap(){
    //得到当前的位置
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(position => {
        this.locationCenter = {
          lat:position.coords.latitude,
          lng:position.coords.longitude,
        }
      },function (err){
        console.log(err)
      })
    }
    //初始化地图
    this.map = new google.maps.Map(this.mapElement.nativeElement,{
      center: this.locationCenter,
      zoom:3
    });
  }

  listenerChange(){
    this.mark.listener.subscribe(data=>{
          this.mark.getData().subscribe(data=>{
              data.forEach((item,index)=>{
                return new google.maps.Marker({
                  position:item,
                  map:this.map,
                  label:`${index+1}`
                })
              })
          })
        if(typeof data !== "boolean"){
          this.map.setCenter(data)
        }
    })
  }

}
