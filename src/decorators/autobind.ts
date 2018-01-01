// tslint:disable:no-invalid-this
export default function (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<Function>): TypedPropertyDescriptor<any> {
  let actualFn: Function = descriptor.value;

  if (typeof actualFn !== 'function') {
    throw new Error(`Cannot autobind: ${typeof actualFn}`);
  }

  return {
    configurable: true,
    get(): Function {
      if (this === target.prototype || this.hasOwnProperty(propertyKey) || typeof actualFn !== 'function') {
        return actualFn;
      }

      const bindedFn: Function = actualFn.bind(this);

      Object.defineProperty(this, propertyKey, {
        configurable: true,
        get(): Function {
          return bindedFn;
        },
        set(value: Function): void {
          actualFn = value;

          delete this[propertyKey];
        }
      });

      return bindedFn;
    },
    set(value: Function): void {
      actualFn = value;
    }
  };
}
