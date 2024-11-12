export type StoreState<T extends object> = T;
export type SetStateCallback<T extends object> = (
  state: StoreState<T>
) => StoreState<T>;
export interface SetStateDetail<T extends object> {
  callback: SetStateCallback<T>;
}
export interface SetStateEvent<T extends object> {
  detail: SetStateDetail<T>;
}
export interface StateChangeDetail<T extends object> {
  previous: StoreState<T>;
  state: StoreState<T>;
}
export interface StateChangeEvent<T extends object> {
  detail: StateChangeDetail<T>;
}

enum StoreEventType {
  SETSTATE = "setstate",
  STATECHANGE = "statechange",
}

export class Store<T extends {}> {
  private eventTarget: EventTarget;
  private state: StoreState<T>;

  constructor(defaultState: T) {
    this.state = defaultState;
    this.eventTarget = new EventTarget();

    this.eventTarget.addEventListener(StoreEventType.SETSTATE, (event) => {
      const updatedState = (
        event as unknown as SetStateEvent<T>
      ).detail.callback(this.state);

      this.modifyState(updatedState);
    });
  }

  getState() {
    return this.state;
  }

  onStateChange(callback: (event: StateChangeEvent<T>) => void) {
    this.eventTarget.addEventListener(StoreEventType.STATECHANGE, (e) => {
      const event = e as unknown as StateChangeEvent<T>;
      callback(event);
    });
  }

  setState(callback: SetStateCallback<T>) {
    const event = new CustomEvent<SetStateDetail<T>>(StoreEventType.SETSTATE, {
      detail: { callback },
    });
    this.eventTarget.dispatchEvent(event);
  }

  private modifyState(state: StoreState<T>) {
    const event = new CustomEvent<StateChangeDetail<T>>(
      StoreEventType.STATECHANGE,
      {
        detail: { previous: this.state, state },
      }
    );
    this.state = state;
    this.eventTarget.dispatchEvent(event);
  }
}
