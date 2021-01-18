import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {GetLocationDataService} from './services/get-location-data.service'  //引入服务
import { AppComponent } from './app.component';
import { LeftComponent } from './components/left/left.component';
import { RightComponent } from './components/right/right.component';

@NgModule({
  declarations: [
    AppComponent,
    LeftComponent,
    RightComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [GetLocationDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
