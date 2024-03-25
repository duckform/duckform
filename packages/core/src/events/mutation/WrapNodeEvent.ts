import { ICustomEvent } from "@duckform/shared";
import { AbstractMutationNodeEvent } from "./AbstractMutationNodeEvent";

export class WrapNodeEvent
  extends AbstractMutationNodeEvent
  implements ICustomEvent
{
  type = "wrap:node";
}
