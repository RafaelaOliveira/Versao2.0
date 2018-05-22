import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  constructor(public navCtrl: NavController) {}
  irLogin(){
  this.navCtrl.push ('LoginPage',{'user':'teste123','pass':'123456'})}
}
