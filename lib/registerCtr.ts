import * as Skandha from 'skandha';
import { makeCtrObservable } from './makeCtrObservable';

export type ArgsT = {
  ctr: any;
  options: Skandha.RegisterCtrOptionsT;
  initCtr?: Function;
};

export const registerCtr = (args: ArgsT) => {
  Skandha.registerCtr(args);
  makeCtrObservable(args.ctr);
};
