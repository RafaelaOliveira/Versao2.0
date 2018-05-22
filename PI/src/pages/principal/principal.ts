import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
 
declare var google;
 
@IonicPage()
@Component({
  selector: 'page-principal',
  templateUrl: 'principal.html',
})
export class PrincipalPage {
  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer();
  map: any;
  startPosition: any;
  originPosition: string;
  destinationPosition: string;
 
  constructor(public navCtrl: NavController, public navParams: NavParams) {}
 
  ionViewDidLoad() {
    this.initializeMap();
  }
 
  initializeMap() {
    this.startPosition = new google.maps.LatLng(-18.574947, -46.514701);
 
    const mapOptions = {
      zoom: 18,
      center: this.startPosition,
      disableDefaultUI: true
    }
 
    this.map = new google.maps.Map(document.getElementById('map'), mapOptions);
    this.directionsDisplay.setMap(this.map);
 
    const marker = new google.maps.Marker({
      position: this.startPosition,
      map: this.map,
    });
  }
 
  calculateRoute() {
    if (this.destinationPosition) {
      const request = {
        origin: this.startPosition,
        destination: this.destinationPosition,
        travelMode: 'DRIVING'
      };
 
      this.traceRoute(this.directionsService, this.directionsDisplay, request);
    }
  }
 
  traceRoute(service: any, display: any, request: any) {
    service.route(request, function (result, status) {
      if (status == 'OK') {
        display.setDirections(result);
      }
    });
  }
  timeInSeconds: number;
 
  time: number;
  remainingTime: number;
  runTimer: boolean;
  hasStarted: boolean;
  hasFinished: boolean;
  displayTime: string;
  
  ngOnInit() {
    this.initTimer();
  }
  
  initTimer() {
    if (!this.timeInSeconds) { this.timeInSeconds = 120; }
  
    this.time = this.timeInSeconds;
     this.runTimer = false;
     this.hasStarted = false;
     this.hasFinished = false;
     this.remainingTime = this.timeInSeconds;
    
     this.displayTime = this.getSecondsAsDigitalClock(this.remainingTime);
  }
  
  startTimer() {
     this.runTimer = true;
    this.hasStarted = true;
    this.timerTick();
  }
  
  pauseTimer() {
    this.runTimer = false;
  }
  
  resumeTimer() {
    this.startTimer();
  }
  
  timerTick() {
    setTimeout(() => {
  
      if (!this.runTimer) { return; }
      this.remainingTime--;
      this.displayTime = this.getSecondsAsDigitalClock(this.remainingTime);
      if (this.remainingTime > 0) {
        this.timerTick();
      }
      else {
        this.hasFinished = true;
      }
    }, 1000);
  }
  
  getSecondsAsDigitalClock(inputSeconds: number) {
    var sec_num = parseInt(inputSeconds.toString(), 10);
    var hours = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);
    var hoursString = '';
    var minutesString = '';
    var secondsString = '';
    hoursString = (hours < 10) ? "0" + hours : hours.toString();
    minutesString = (minutes < 10) ? "0" + minutes : minutes.toString();
    secondsString = (seconds < 10) ? "0" + seconds : seconds.toString();
    return hoursString + ':' + minutesString + ':' + secondsString;
  }
 }
