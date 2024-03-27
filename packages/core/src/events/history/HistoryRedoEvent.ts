import { ICustomEvent } from "../../shared";
import { AbstractHistoryEvent } from "./AbstractHistoryEvent";

export class HistoryUndoEvent
  extends AbstractHistoryEvent
  implements ICustomEvent
{
  type = "history:undo";
}
