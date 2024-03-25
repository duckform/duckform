import { ICustomEvent } from "@duckform/shared";
import { AbstractHistoryEvent } from "./AbstractHistoryEvent";

export class HistoryPushEvent
  extends AbstractHistoryEvent
  implements ICustomEvent
{
  type = "history:push";
}
