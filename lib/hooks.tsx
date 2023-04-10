import React from 'react';
import {
  DragAndDrop,
  DragAndDropUIConnectorT,
  Highlight,
  HighlightUIConnectorOptionsT,
  HighlightUIConnectorT,
  Selection,
  SelectionUIConnectorOptionsT,
  SelectionUIConnectorT,
  createDragAndDropUIConnector,
  createHighlightUIConnector,
  createSelectionUIConnector,
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

export const useSelectionUIConnector = <T,>(
  selection: Selection<T>,
  options?: SelectionUIConnectorOptionsT,
  dependencies?: any[]
) => {
  const selectionUIConnector = React.useMemo<SelectionUIConnectorT>(
    () => makeFacetObservable(createSelectionUIConnector(selection, options)),
    [selection, ...(dependencies ?? [])]
  );
  return selectionUIConnector;
};

export const useHighlightUIConnector = (
  highlight: Highlight,
  options?: HighlightUIConnectorOptionsT,
  dependencies?: any[]
) => {
  const highlightUIConnector = React.useMemo<HighlightUIConnectorT>(
    () => makeFacetObservable(createHighlightUIConnector(highlight, options)),
    [highlight, ...(dependencies ?? [])]
  );
  return highlightUIConnector;
};
