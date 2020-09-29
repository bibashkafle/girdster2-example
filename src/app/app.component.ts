import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  showExampleHomePage : boolean = false;
  title = 'gridster2-example';

  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  } 
 
  toggleExampleHomePage(){
    this.showExampleHomePage = !this.showExampleHomePage;
  }
}
