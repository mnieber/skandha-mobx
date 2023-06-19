import React from 'react';
import {
  DragAndDrop,
  DragAndDropUIConnectorT,
  createDragAndDropUIConnector,
} from 'skandha-facets';
import { makeFacetObservable } from './makeCtrObservable';

export const useDragAndDropUIConnector = (
  dragAndDrop: DragAndDrop,
  dependencies?: any[]
) => {
  const dragAndDropUIConnector = React.useMemo<DragAndDropUIConnectorT>(
    () => makeFacetObservable(createDragAndDropUIConnector(dragAndDrop)),
    [dragAndDrop, ...(dependencies ?? [])]
  );
  return dragAndDropUIConnector;
};
