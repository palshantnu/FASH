export class Listener {
  listeners: Map<string, Array<(...args: unknown[]) => unknown>>;
  constructor() {
    this.listeners = new Map();
  }

  addEventListener = (event: string, func: (...args: unknown[]) => unknown) => {
    const callbacks = this.listeners.get(event);
    this.listeners.set(event, callbacks ? [...callbacks, func] : [func]);

    return {
      remove: () => {
        this.listeners.delete(event);
      },
    };
  };

  simulateListener = async (event: string, args: unknown[] = []) => {
    const callbacks = this.listeners.get(event);
    if (callbacks) {
      for (const callback of callbacks) {
        await callback(...args);
      }
    }
  };
}
