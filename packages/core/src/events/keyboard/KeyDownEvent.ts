import { ICustomEvent } from "@duckform/shared";
import { AbstractKeyboardEvent } from "./AbstractKeyboardEvent";

export class KeyDownEvent
  extends AbstractKeyboardEvent
  implements ICustomEvent
{
  type = "key:down";
}
