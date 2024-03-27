import { EventDriver } from "../shared";
import { MouseMoveEvent } from "../events";
import { Engine } from "../models/Engine";
export class MouseMoveDriver extends EventDriver<Engine> {
  request: null | number = null;

  onMouseMove = (e: MouseEvent) => {
    this.request = requestAnimationFrame(() => {
      cancelAnimationFrame(this.request!);
      this.dispatch(
        new MouseMoveEvent({
          clientX: e.clientX,
          clientY: e.clientY,
          pageX: e.pageX,
          pageY: e.pageY,
          target: e.target!,
          view: e.view!,
        }),
      );
    });
  };

  attach() {
    this.addEventListener("mousemove", this.onMouseMove, {
      mode: "onlyOne",
    });
  }

  detach() {
    this.removeEventListener("mouseover", this.onMouseMove, {
      mode: "onlyOne",
    });
  }
}
