import autobind from '../decorators/autobind';

export default class Debouncer {
  public duration: number;
  public method: Function;
  public context: any;
  public args: any[];

  public timeoutId: number;

  public clear(): void {
    clearTimeout(this.timeoutId);

    this.timeoutId = null;
  }

  @autobind
  public callMethod(): void {
    this.clear();

    this.method.call(this.context, ...this.args);
  }

  @autobind
  public execute(...args: any[]): void {
    this.clear();

    this.args = args;

    this.timeoutId = setTimeout(this.callMethod, this.duration) as any;
  }
}
