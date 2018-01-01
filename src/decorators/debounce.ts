// tslint:disable:no-invalid-this

import Debouncer from '../helpers/debouncer';

export default function debounce(duration: number): MethodDecorator {
  return function (
    _target: any,
    propertyKey: string,
    descriptor: TypedPropertyDescriptor<any>
  ): TypedPropertyDescriptor<any> {
    let actualFn: Function = descriptor.value;

    if (typeof actualFn !== 'function') {
      throw new Error(`Cannot autobind: ${typeof actualFn}`);
    }

    return {
      configurable: true,
      enumerable: true,
      get(): Function {
        const debouncer: Debouncer = new Debouncer();

        debouncer.duration = duration;
        debouncer.method = actualFn;
        debouncer.context = this;

        Object.defineProperty(this, propertyKey, {
          configurable: true,
          enumerable: true,
          value: debouncer.execute
        });

        return debouncer.execute;
      },
      set(value: Function): void {
        actualFn = value;
      }
    };
  };
}
