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
  polygon:any;
  markes:any[]; //这是坐标集合
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
    google.maps.event.addDomListener(this.mapElement.nativeElement,'click',()=> {
      if(this.markes!== undefined ){
        this.markes.forEach(item=>{
          item.setMap(null)
        })
        this.paintPolygon()
      }

    })
  }
  //监听模式
  listenerChange(){
    this.mark.listener.subscribe(data=>{
          this.mark.getData().subscribe(data=>{
            this.markes = data.map((item,index)=>{
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
  //绘画多边形
  paintPolygon(){
    this.mark.getData().subscribe(data=>{
      this.polygon = new google.maps.Polygon({
        paths:data,
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#FF0000",
        fillOpacity: 0.35,
      })
    })

    this.polygon.setMap(this.map)
  }
}
