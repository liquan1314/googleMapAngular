import { Injectable } from '@angular/core';
import { Location} from '../classes/location';
import {of,Subject} from 'rxjs'
@Injectable({
  providedIn: 'root'
})
export class GetLocationDataService {
  //假设得到的数据
  data:Location[] = [
    { lat: -31.56391, lng: 147.154312,},
    { lat: -33.718234, lng: 150.363181 },
    { lat: -33.727111, lng: 150.371124 },
    { lat: -33.848588, lng: 151.209834 },
    { lat: -33.851702, lng: 151.216968 },
    { lat: -34.671264, lng: 150.863657 },
    { lat: -35.304724, lng: 148.662905 },
    { lat: -36.817685, lng: 175.699196 },
    { lat: -36.828611, lng: 175.790222 },
  ]
  sub = new Subject(); //生成发布订阅模式

  listener = this.sub.asObservable(); //生成监听者
  constructor() { }

  //服务分开一个接口让别的模块可以访问
  getData(){
    return of(this.data)
  }

  //生成发布函数
  emit(value){
    return this.sub.next(value)
  }
}
