import React from 'react';
import {
  DragAndDrop,
  DragAndDropUIConnectorT,
} from 'skandha-facets/DragAndDrop';
import {
  Highlight,
  HighlightUIConnectorOptionsT,
  HighlightUIConnectorT,
} from 'skandha-facets/Highlight';
import {
  Selection,
  SelectionUIConnectorOptionsT,
  SelectionUIConnectorT,
} from 'skandha-facets/Selection';
import { makeFacetObservable } from './makeCtrObservable';

export const useDragAndDropUIConnector = (
  dragAndDrop: DragAndDrop,
  dependencies?: any[]
) => {
  const dragAndDropUIConnector = React.useMemo<DragAndDropUIConnectorT>(
    () => makeFacetObservable(dragAndDrop.createUIConnector()),
    [dragAndDrop, ...(dependencies ?? [])]
  );
  return dragAndDropUIConnector;
};

export const useSelectionUIConnector = (
  selection: Selection,
  options?: SelectionUIConnectorOptionsT,
  dependencies?: any[]
) => {
  const selectionUIConnector = React.useMemo<SelectionUIConnectorT>(
    () => makeFacetObservable(selection.createUIConnector(options)),
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
    () => makeFacetObservable(highlight.createUIConnector(options)),
    [highlight, ...(dependencies ?? [])]
  );
  return highlightUIConnector;
};
