import { ICustomEvent } from "@duckform/shared";
import { AbstractCursorEvent } from "./AbstractCursorEvent";

export class MouseMoveEvent
  extends AbstractCursorEvent
  implements ICustomEvent
{
  type = "mouse:move";
}
