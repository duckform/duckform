import {
  IconWidget,
  NodePathWidget,
  useOperation,
  usePrefix,
  useSelected,
  useSelectedNode,
  useWorkbench,
} from "@duckform/react";
import { cancelIdle, requestIdle } from "@duckform/core/shared";
import { Form } from "@formily/antd";
import { createForm } from "@formily/core";
import { observer } from "@formily/react";
import { Empty } from "antd";
import cls from "classnames";
import React, { useMemo } from "react";
import { SchemaField } from "./SchemaField";
import { useLocales, useSnapshot } from "./effects";
import { SettingsFormContext } from "./shared/context";
import "./styles.less";
import { ISettingFormProps } from "./types";

const GlobalState = {
  idleRequest: -1,
};

export const SettingsForm: React.FC<
  React.PropsWithChildren<ISettingFormProps>
> = observer(
  (props) => {
    const workbench = useWorkbench();
    const currentWorkspace =
      workbench?.activeWorkspace || workbench?.currentWorkspace;
    const currentWorkspaceId = currentWorkspace?.id;
    const operation = useOperation(currentWorkspaceId);
    const node = useSelectedNode(currentWorkspaceId);
    const selected = useSelected(currentWorkspaceId);
    const prefix = usePrefix("settings-form");
    const schema = node?.designerProps?.propsSchema;
    const isEmpty = !(
      node?.designerProps?.propsSchema && selected.length === 1
    );
    const form = useMemo(() => {
      return createForm({
        initialValues: node?.designerProps?.defaultProps,
        values: node?.props,
        effects(form) {
          useLocales(node!);
          useSnapshot(operation);
          props.effects?.(form);
        },
      });
    }, [node, node?.props, schema, operation, isEmpty]);

    const render = () => {
      if (!isEmpty) {
        return (
          <div
            className={cls(prefix, props.className)}
            style={props.style}
            key={node.id}
          >
            <SettingsFormContext.Provider value={props}>
              <Form
                form={form}
                colon={false}
                labelWidth={120}
                labelAlign="left"
                wrapperAlign="right"
                feedbackLayout="none"
                tooltipLayout="text"
              >
                <SchemaField
                  schema={schema}
                  components={props.components}
                  scope={{ $node: node, ...props.scope }}
                />
              </Form>
            </SettingsFormContext.Provider>
          </div>
        );
      }
      return (
        <div className={`${prefix}-empty`}>
          <Empty />
        </div>
      );
    };

    return (
      <IconWidget.Provider tooltip>
        <div className={`${prefix}-wrapper`}>
          {!isEmpty && <NodePathWidget workspaceId={currentWorkspaceId} />}
          <div className={`${prefix}-content`}>{render()}</div>
        </div>
      </IconWidget.Provider>
    );
  },
  {
    scheduler: (update) => {
      cancelIdle(GlobalState.idleRequest!);
      GlobalState.idleRequest = requestIdle(update, {
        timeout: 500,
      });
    },
  },
);
