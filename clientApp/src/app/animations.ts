import { animate, query as q, style, transition, trigger, stagger, AnimationMetadata, AnimationQueryOptions, state } from '@angular/animations';

const query = (s: string,a: AnimationMetadata | AnimationMetadata[],o: AnimationQueryOptions | null | undefined = {optional:true})=>q(s,a,o);

export const fade =
  trigger('fade', [ 
    transition('* <=> *', [
      style({ opacity: 0 }),
      animate('.75s ease-out', style({opacity: 1}))
    ])
  ]);

  export const fadeIn =
  trigger('fadeIn', [ 
    transition(':enter', [
      style({ opacity: 0 }),
      animate('.8s ease-out', style({ opacity: 1 }))
    ])
  ]);

  export const slideAll =
  trigger('slideAll', [
      transition(':enter', [
        style({ transform: 'translateY(100%)', opacity: 0 }),
        animate('.8s ease-out', style({ transform: 'translateY(0)', opacity: 1 }))
      ])
  ]);

  export const slideLeft =
  trigger('slideLeft', [
      transition('* => *', [
          query(':enter', [
            style({ transform: 'translateX(-100%)', opacity: 0 }),
            stagger(150, [animate('.8s ease-out', style({ transform: 'translateX(0)', opacity: 1 }))])
          ])
      ])
  ]);

  export const slideToTop =
  trigger('slideToTop', [
      transition('* => *', [
          query(':enter', [
            style({ transform: 'translateY(100%)', opacity: 0 }),
            stagger(150, [animate('.8s ease-out', style({ transform: 'translateY(0)', opacity: 1 }))])
          ])
      ])
  ]);