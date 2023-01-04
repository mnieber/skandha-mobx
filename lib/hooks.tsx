import React from 'react';
import {
  DragAndDrop,
  DragAndDropUIConnectorT,
} from 'skandha-facets/DragAndDrop';
import {
  Selection,
  SelectionUIConnectorOptionsT,
  SelectionUIConnectorT,
} from 'skandha-facets/Selection';
import { makeFacetObservable } from './makeCtrObservable';

export const useDragAndDropUIConnector = (dragAndDrop: DragAndDrop) => {
  const dragAndDropUIConnector = React.useMemo<DragAndDropUIConnectorT>(
    () => makeFacetObservable(dragAndDrop.createUIConnector()),
    [dragAndDrop]
  );
  return dragAndDropUIConnector;
};

export const useSelectionUIConnector = (
  selection: Selection,
  options?: SelectionUIConnectorOptionsT
) => {
  const selectionUIConnector = React.useMemo<SelectionUIConnectorT>(
    () => makeFacetObservable(selection.createUIConnector(options)),
    [selection]
  );
  return selectionUIConnector;
};
