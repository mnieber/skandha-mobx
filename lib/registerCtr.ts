import * as Skandha from 'skandha';
import { makeCtrObservable } from './makeCtrObservable';

export type PropsT = {
  ctr: any;
  details?: any;
  initCtr?: Function;
  childCtrs?: PropsT[];
};

export const registerCtr = (props: PropsT) => {
  Skandha.registerFacets(props.ctr, props.details ?? {});
  if (props.initCtr) {
    props.initCtr(props.ctr);
  }
  if (props.childCtrs) {
    props.childCtrs.forEach((childCtrProps) => registerCtr(childCtrProps));
  }
  makeCtrObservable(props.ctr);
};
