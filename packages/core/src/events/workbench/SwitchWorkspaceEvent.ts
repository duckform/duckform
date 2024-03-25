import { ICustomEvent } from "@duckform/shared";
import { AbstractWorkspaceEvent } from "./AbstractWorkspaceEvent";

export class SwitchWorkspaceEvent
  extends AbstractWorkspaceEvent
  implements ICustomEvent
{
  type = "switch:workspace";
}
