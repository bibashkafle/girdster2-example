import { Type } from '@angular/core';import { GridsterItem } from 'angular-gridster2';
;

export interface DashboardWidgetInfo{
  id: string;
  name: string;
  size: DashboardSize;
  minSize?: DashboardSize;
  maxSize?: DashboardSize;
  position?: DashboardPosition;
  component?: Type<any>;
  service?: any;
  allowMultipleInstances?: boolean;
  isDefault?: boolean;
  title?: string;
  description?: string;
  state?: DashboardWidgetState;
  errors?: any;
  future?: boolean;
  accessRightsService?: any;
  displayHelp?: boolean;
  helpControlState?: any;
  systemDefined?: boolean;
  widgetDefinitionId?: string;
  showMoreUri?: any;
}

export interface DashboardWidgetState {
  isBusy: boolean;
  progressValue?: number;
}

export interface DashboardSize {
  cols: number;
  rows: number;
}

export interface DashboardPosition {
  x: number;
  y: number;
}

/**
 * @param  {DashboardWidgetInfo[]} widgets
 * @returns Map
 */
export function getWidgetIdToDataMap(widgets: DashboardWidgetInfo[]): Map<string, DashboardWidgetInfo> {
  const widgetIdToDataMap = new Map<string, DashboardWidgetInfo>();
  widgets.forEach(widget => {
    widgetIdToDataMap.set(widget.id, widget);
  });
  return widgetIdToDataMap;
}

export interface GridItems extends GridsterItem, DashboardWidgetInfo {}