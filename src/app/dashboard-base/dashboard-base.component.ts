import { Component, OnInit } from '@angular/core';
import { DashboardWidgetInfo } from '../common/DashboardWidgetInfo';

export class DashboardBaseComponent {
  widgets: Array<DashboardWidgetInfo>;

  constructor() {
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

  loadWidgetIdToDataMap(): any {
    console.log("DashboardBaseComponent.loadWidgetIdToDataMap");
  }

  itemModify(e: DashboardWidgetInfo) {
    console.log("DashboardBaseComponent.itemModify");
  }


  itemRemoved(e: DashboardWidgetInfo) {
    console.log("DashboardBaseComponent.itemRemoved");
  }

  editingComplete() {
    console.log("DashboardBaseComponent.editingComplete");
    this.saveWidgets();
  }

  resetDashboard() {
    console.log("DashboardBaseComponent.resetDashboard");
  }

  private addWidgetToDataMap(widget: DashboardWidgetInfo): any {
    console.log("DashboardBaseComponent.addWidgetToDataMap");
  }

  private saveWidgets() {
    console.log("DashboardBaseComponent.saveWidgets");
  }
}
