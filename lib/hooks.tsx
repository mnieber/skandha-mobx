import React from 'react';
import {
  DragAndDrop,
  DragAndDropUIConnectorT,
} from 'skandha-facets/DragAndDrop';
import { Selection, SelectionUIConnectorT } from 'skandha-facets/Selection';
import { makeFacetObservable } from './makeCtrObservable';

export const useDragAndDropUIConnector = (dragAndDrop: DragAndDrop) => {
  const [dragAndDropUIConnector] = React.useState<DragAndDropUIConnectorT>(() =>
    makeFacetObservable(dragAndDrop.createUIConnector())
  );
  return dragAndDropUIConnector;
};

export const useSelectionUIConnector = (selection: Selection) => {
  const [selectionUIConnector] = React.useState<SelectionUIConnectorT>(() =>
    makeFacetObservable(selection.createUIConnector())
  );
  return selectionUIConnector;
};
