import { Component, OnInit } from '@angular/core';
import {GetLocationDataService} from '../../services/get-location-data.service';
@Component({
  selector: 'app-right',
  templateUrl: './right.component.html',
  styleUrls: ['./right.component.scss']
})
export class RightComponent implements OnInit {
  flag:boolean = false; //生成标签的标记
  dataArr: any[]=[]; //数据的集合
  constructor(private mark:GetLocationDataService) { }

  ngOnInit(): void {
  }
  onProduct(){
    this.flag = true;
    this.mark.emit(this.flag)
    this.onProductDom()
  }
  onProductDom(){
    if(this.flag){
      this.mark.getData().subscribe(data=>{
        this.dataArr = data;
      })
    }
  }
  //改变中心点
  onChange(value){
    this.mark.emit(value)
  }
}
