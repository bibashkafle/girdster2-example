import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from '@angular/core';

import {GridsterConfig, GridsterItem, GridsterItemComponentInterface, GridType} from 'angular-gridster2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  options: GridsterConfig;
  dashboard: Array<GridsterItem>;

  ngOnInit(): void {
    this.options = {
      gridType: GridType.Fit,
      itemRemovedCallback: (item: GridsterItem, itemComponent: GridsterItemComponentInterface) => this.itemRemove(item, itemComponent),
      draggable: {
        enabled: true,
      },
      resizable: {
        enabled: false,
      },
      fixedColWidth: 160,
      fixedRowHeight: 160,
      pushItems: false,
    };
    
    this.dashboard = [
      {cols: 1, rows: 1, y: 0, x: 4, label: 'CTX Widget 1', id: 'dfdfdfdfdfdfdf'},
      {cols: 1, rows: 1, y: 2, x: 5, label: 'CTX Widget 2', id: 'dfdfdfdfdfdfdf'},
      {cols: 1, rows: 1, y: 1, x: 0, label: 'CTX Widget 3', id: 'dfdfdfdfdfdfdf'},
      {cols: 1, rows: 1, y: 1, x: 0, label: 'CTX Widget 4', id: 'dfdfdfdfdfdfdf'}
    ];
  }

  removeItem($event: MouseEvent | TouchEvent, item): void {
    // $event.preventDefault();
    // $event.stopPropagation();
    this.dashboard.splice(this.dashboard.indexOf(item), 1);
  }

  addItem(): void {
    var labelName = prompt("Label name");
    this.dashboard.push({x: 0, y: 0, cols: 1, rows: 1,label: labelName });
  }

  itemRemove(item: GridsterItem, itemComponent: GridsterItemComponentInterface) {
    console.log('itemRemove')
    this.emitRemovedWidgetInfo(item);
  }

  private emitRemovedWidgetInfo(item: GridsterItem) {
    console.log('emitRemovedWidgetInfo')
    // const widgetInfo = this.toWidgetInfo(item);
    // this.itemRemoved.emit(widgetInfo);
  }

}
