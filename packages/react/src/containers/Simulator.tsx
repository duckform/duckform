import { ScreenType } from "@duckform/core";
import { requestIdle } from "@duckform/shared";
import { observer } from "@formily/reactive-react";
import React from "react";
import { useScreen } from "../hooks";
import {
  MobileSimulator,
  PCSimulator,
  ResponsiveSimulator,
} from "../simulators";

export type ISimulatorProps = React.HTMLAttributes<HTMLDivElement>;

export const Simulator: React.FC<React.PropsWithChildren<ISimulatorProps>> =
  observer(
    (props: ISimulatorProps) => {
      const screen = useScreen();
      if (screen.type === ScreenType.PC)
        return <PCSimulator {...props}>{props.children}</PCSimulator>;
      if (screen.type === ScreenType.Mobile)
        return <MobileSimulator {...props}>{props.children}</MobileSimulator>;
      if (screen.type === ScreenType.Responsive)
        return (
          <ResponsiveSimulator {...props}>{props.children}</ResponsiveSimulator>
        );
      return <PCSimulator {...props}>{props.children}</PCSimulator>;
    },
    {
      scheduler: requestIdle,
    },
  );