import { ICustomEvent } from "../../shared";
import { AbstractWorkspaceEvent } from "./AbstractWorkspaceEvent";
export class AddWorkspaceEvent
  extends AbstractWorkspaceEvent
  implements ICustomEvent
{
  type = "add:workspace";
}
