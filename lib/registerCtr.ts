import * as Skandha from 'skandha';
import { makeCtrObservable } from './makeCtrObservable';

export type PropsT = {
  ctr: any;
  options: Skandha.RegisterCtrOptionsT;
  initCtr?: Function;
};

export const registerCtr = (props: PropsT) => {
  Skandha.registerCtr(props.ctr, props.options);
  if (props.initCtr) {
    props.initCtr(props.ctr);
  }
  makeCtrObservable(props.ctr);
};
