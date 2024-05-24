import { getContext, onDestroy } from "svelte";

export class EventManager {
  events = {};
  
  on(name, fn, capture) {
    if (!this.events[name]) this.events[name] = [];
    this.events[name][capture ? "unshift" : "push"](fn);
    
    onDestroy(() => {
      this.off(name, fn);
    });
  }
  
  off(name, fn) {
    if (this.events[name])
      this.events[name] = this.events[name].filter(eventFn => eventFn != fn);
  }
  
  dispatch(name, data) {
    const event = this.events[name];
    if (event) event.forEach(fn => fn.call(null, data));
  }
}

export function getEventManagerContext(key = "events") {
  return getContext(key);
}