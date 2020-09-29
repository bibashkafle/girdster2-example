import { DashboardWidgetInfo, GridItems } from './../common/DashboardWidgetInfo';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { GridsterConfig, GridsterItem, GridsterItemComponentInterface, GridType } from 'angular-gridster2';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  private readonly _disableEditingText = 'Cancel Edit';
  private readonly _enableEditingText = 'Edit Dashboard';
  private readonly _addWidgetText = 'Add Widget';
  private readonly _hideWidgetEditorText = 'Hide Widget Picker';
  private readonly _resetButtonText = 'Reset Dashboard';
  private readonly _acceptWidgetChangesText = 'Accept';
  private _displayWidgetSelector;
  private _editingEnabled;
  readonly addWidgetButtonIcon = 'fa-plus';
  readonly editWidgetButtonIcon = 'fa-pencil';
  readonly acceptWidgetChangesIcon = 'fa-check';
  readonly resetWidgetsButtonIcon = 'fa-undo';
  readonly position = "right";

  title = 'Widget Editor';
  addWidgetButtonText = this._addWidgetText;
  editingModeButtonText = this._enableEditingText;
  resetButtonText = this._resetButtonText;

  @Input() widgets: DashboardWidgetInfo[];

  gridsterConfig: GridsterConfig;

  @Output() itemModify = new EventEmitter<DashboardWidgetInfo>();

  @Output() itemRemoved = new EventEmitter<DashboardWidgetInfo>();

  @Output() editingComplete = new EventEmitter<void>();

  @Output() resetDashboard = new EventEmitter<void>();

  gridsterItems: Array<GridItems> = [];
  deletedItemsId: string;

  constructor() {

  }

  get editingEnabled() {
    return this._editingEnabled;
  }

  get displayWidgetSelector() {
    return this._displayWidgetSelector;
  }

  get primaryButtonTitle() {
    return this.editingEnabled ? this._acceptWidgetChangesText : this._enableEditingText;
  }

  getAddWidgetButtonCssClass() {
    return this.displayWidgetSelector ? 'hidden' : '';
  }

  getEditWidgetButtonIcon() {
    return this.editingEnabled ? this.acceptWidgetChangesIcon : this.editWidgetButtonIcon;
  }

  ngOnInit() {
    this._editingEnabled = false;
    this._displayWidgetSelector = false;

    this.gridsterConfig = {
      gridType: GridType.Fixed,
      itemChangeCallback: (item: GridsterItem, itemComponent: GridsterItemComponentInterface) => this.itemChange(item, itemComponent),
      itemResizeCallback: (item: GridsterItem, itemComponent: GridsterItemComponentInterface) => this.itemResize(item, itemComponent),
      itemRemovedCallback: (item: GridsterItem, itemComponent: GridsterItemComponentInterface) => this.itemRemove(item, itemComponent),
      resizable: {
        enabled: false
      },
      draggable: {
        enabled: false
      },
      fixedColWidth: 160,
      fixedRowHeight: 160,
      pushItems: false
    };
  }

  itemChange(item: GridsterItem, itemComponent: GridsterItemComponentInterface) {
    console.log('itemChange')
    this.emitUpdatedWidgetInfo(item);
  }


  itemResize(item: GridsterItem, itemComponent: GridsterItemComponentInterface) {
    console.log('itemResize')
    this.emitUpdatedWidgetInfo(item);
  }

  itemRemove(item: GridsterItem, itemComponent: GridsterItemComponentInterface) {
    console.log('itemRemove')
    this.emitRemovedWidgetInfo(item);
  }

  getGridsterItem(widgetInfo: DashboardWidgetInfo): GridsterItem {

    console.log('getGridsterItem');

    const gridsterItem: GridsterItem = {
      id: widgetInfo.id,
      cols: widgetInfo.size.cols,
      rows: widgetInfo.size.rows
    } as any;

    if (widgetInfo.minSize) {
      gridsterItem.minItemRows = widgetInfo.minSize.rows;
      gridsterItem.minItemCols = widgetInfo.minSize.cols;
    }

    if (widgetInfo.maxSize) {
      gridsterItem.maxItemRows = widgetInfo.maxSize.rows;
      gridsterItem.maxItemCols = widgetInfo.maxSize.cols;
    }

    if (widgetInfo.position) {
      gridsterItem.x = widgetInfo.position.x;
      gridsterItem.y = widgetInfo.position.y;
    }

    return gridsterItem;
  }

  toggleWidgetSelector(): any {
    this._displayWidgetSelector = !this._displayWidgetSelector;
    if (this._displayWidgetSelector) {
      this.title = this._addWidgetText;
      this.addWidgetButtonText = this._hideWidgetEditorText;
    } else {
      this.addWidgetButtonText = this._addWidgetText;
      this.title = '';
    }
  }

  reset(): void {
    this.resetDashboard.emit();
    this.ngOnInit();
  }

  hideWidgetPanel() {
    this.toggleWidgetSelector();
  }

  toggleEditing() {
    this._editingEnabled = !this._editingEnabled;
    if (this._editingEnabled) {
      this.editingModeButtonText = this._disableEditingText;
    } else {
      this._displayWidgetSelector = false;
      this.editingModeButtonText = this._enableEditingText;
      this.gridsterEditingCompleted();
    }
    this.gridsterConfig.resizable = {
      enabled: this._editingEnabled
    };
    this.gridsterConfig.draggable.enabled = this._editingEnabled;
    this.changedOptions();
  }

  changedOptions() {
    if (this.gridsterConfig.api) {
      this.gridsterConfig.api.optionsChanged();
    }
  }

  removeWidget($event: MouseEvent | TouchEvent, id: string) {
    $event.preventDefault();
    $event.stopPropagation();

    console.log('removeWidget')
    if (!this.editingEnabled) {
      return;
    }
    let widgetIndex = -1;
    this.widgets.forEach((widget, index) => {
      if (widget.id === id) {
        widgetIndex = index;
      }
    });
    if (widgetIndex !== -1) {
      this.widgets.splice(widgetIndex, 1);
    }
  }

  hasErrors(widgetInfo: DashboardWidgetInfo) {
    console.log('hasErrors')
    return widgetInfo && widgetInfo.errors && widgetInfo.errors.length ? true : false;
  }

  private gridsterEditingCompleted() {
    console.log('gridsterEditingCompleted')
    this.editingComplete.emit();
  }

  private emitRemovedWidgetInfo(item: GridsterItem) {
    console.log('emitRemovedWidgetInfo')
    const widgetInfo = this.toWidgetInfo(item);
    this.itemRemoved.emit(widgetInfo);
  }

  private emitUpdatedWidgetInfo(item: GridsterItem) {
    console.log('emitUpdatedWidgetInfo')
    const widgetInfo = this.toWidgetInfo(item);
    this.itemModify.emit(widgetInfo);
    // console.log(widgetInfo);
  }

  private toWidgetInfo(item: GridsterItem) {
    console.log('toWidgetInfo')
    return {
      id: item.id,
      size: {
        cols: item.cols,
        rows: item.rows
      },
      position: {
        x: item.x,
        y: item.y
      }
    } as DashboardWidgetInfo;
  }

  hasGridsterItems(items: DashboardWidgetInfo[]) {
    let returnValue = false;
    if (items) {
      if (this.gridsterItems.length !== items.length) {
        this.gridsterItems = [];
        for (let index = 0; index < items.length; index++) {
          const gridsterItem = this.GetGridItem(items[index]);
          this.gridsterItems.push(gridsterItem);
        }
      }
      returnValue = true;
    }
    return returnValue;
  }

  GetGridItem(widgetInfo: DashboardWidgetInfo): GridItems {
    let gridItem: GridItems = {
      id: widgetInfo.id,
      cols: widgetInfo.size.cols,
      rows: widgetInfo.size.rows,
    } as GridItems;
    if (widgetInfo.minSize) {
      gridItem.minItemRows = widgetInfo.minSize.rows;
      gridItem.minItemCols = widgetInfo.minSize.cols;
    }
    if (widgetInfo.maxSize) {
      gridItem.maxItemRows = widgetInfo.maxSize.rows;
      gridItem.maxItemCols = widgetInfo.maxSize.cols;
    }
    if (widgetInfo.position) {
      gridItem.x = widgetInfo.position.x;
      gridItem.y = widgetInfo.position.y;
    }
    Object.keys(widgetInfo).forEach((key) => (gridItem[key] = widgetInfo[key]));
    return gridItem;
  }

}
