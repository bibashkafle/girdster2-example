import { Component, OnInit } from '@angular/core';
import { DashboardWidgetInfo } from '../common/DashboardWidgetInfo';

@Component({
  selector: 'app-dashboard-base',
  templateUrl: './dashboard-base.component.html',
  styleUrls: ['./dashboard-base.component.css']
})
export class DashboardBaseComponent  implements OnInit {
  // potected widgetIdToDataMap = new Map<string, DashboardWidgetInfo>();
  widgets: Array<DashboardWidgetInfo>;
  constructor(
    // protected dashboardWidgetService: DashboardWidgetService
  ) {
  }

  ngOnInit() {
   // this.onInit();
    // this.dashboardWidgetService.getWidgets().subscribe(result => {
    //   this.widgets = result;
    //   this.loadWidgetIdToDataMap();
    // });
    // this.dashboardWidgetService.widgetAdded.subscribe(widget => {
    //   this.widgets.push(widget);
    //   this.addWidgetToDataMap(widget);
    //   this.saveWidgets();
    // });    
    this.loadWidgets();
  }

  loadWidgets():void{
    this.widgets = Array<DashboardWidgetInfo>();
    console.log("DashboardBaseComponent.loadWidgets");
    this.widgets.push({id: "6621de45-4b66-f6ae-0064-778cc75452c1", title:"CSC Corptax News 1", position: {y: 0, x: 4}, size: {cols: 1, rows: 1}} as DashboardWidgetInfo)
    this.widgets.push({id: "6621de45-4b66-f6ae-0064-778cc75452c2", title:"CSC Corptax News 2", position: {y: 2, x: 5}, size: {cols: 1, rows: 1}} as DashboardWidgetInfo)
    this.widgets.push({id: "6621de45-4b66-f6ae-0064-778cc75452c3", title:"CSC Corptax News 3", position: {y: 1, x: 2}, size: {cols: 1, rows: 1}} as DashboardWidgetInfo)
    this.widgets.push({id: "6621de45-4b66-f6ae-0064-778cc75452c4", title:"CSC Corptax News 4", position: {y: 1, x: 0}, size: {cols: 1, rows: 1}} as DashboardWidgetInfo)
  }

  onInit(): any {

  }

  loadWidgetIdToDataMap(): any {
    console.log("DashboardBaseComponent.loadWidgetIdToDataMap");
    // if (this.widgets) {
    //   this.widgetIdToDataMap = getWidgetIdToDataMap(this.widgets);
    //   this.dashboardWidgetService.createWidgetInstanceCountMap(this.widgetIdToDataMap);
    // }
  }

  itemModify(e: DashboardWidgetInfo) {
    console.log("DashboardBaseComponent.itemModify");
    // const widget = this.widgetIdToDataMap.get(e.id);
    // if (widget) {
    //   widget.size = e.size;
    //   widget.position = e.position;

    //   this.widgetIdToDataMap.set(widget.id, widget);
    // }
  }

  itemRemoved(e: DashboardWidgetInfo) {
    console.log("DashboardBaseComponent.itemRemoved");
    // const widget = this.widgetIdToDataMap.get(e.id);
    // if (widget) {
    //   const widgetName = widget.name;
    //   this.widgetIdToDataMap.delete(e.id);
    //   this.dashboardWidgetService.decreaseWidgetInstanceCount(widgetName);
    // }
  }

  editingComplete() {
    console.log("DashboardBaseComponent.editingComplete");
    this.saveWidgets();
  }

  resetDashboard() {
    console.log("DashboardBaseComponent.resetDashboard");
    // this.dashboardWidgetService.resetDashboard().subscribe(
    //   r => {
    //     this.widgets = r;
    //     this.loadWidgetIdToDataMap();
    //   });
  }

  private addWidgetToDataMap(widget: DashboardWidgetInfo): any {
    console.log("DashboardBaseComponent.addWidgetToDataMap");
    // this.widgetIdToDataMap.set(widget.id, widget);
  }

  private saveWidgets() {
    console.log("DashboardBaseComponent.saveWidgets");
    // this.dashboardWidgetService.saveWidgets(Array.from(this.widgetIdToDataMap.values())).subscribe(result => {
    //   console.log('changes saved to DB');
    // }, (error) => {
    //   console.log(error);
    // });
  }
}
