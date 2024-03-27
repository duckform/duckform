import { IconWidget, usePrefix } from "@duckform/react";
import { FormItem as AntdFormItem, IFormItemProps } from "@formily/antd";
import { observer, useField } from "@formily/react";
import { observable } from "@formily/reactive";
import cls from "classnames";
import React, { Fragment, useRef, useMemo } from "react";
import "./styles.less";

const FormItem = AntdFormItem as Required<typeof AntdFormItem> &
  typeof AntdFormItem;
const ExpandedMap = new Map<string, boolean>();

const OriginFoldItem: React.FC<React.PropsWithChildren<IFormItemProps>> =
  observer(({ className, style, children, ...props }) => {
    const prefix = usePrefix("fold-item");
    const field = useField();
    const expand = useMemo(
      () => observable.ref(ExpandedMap.get(field.address.toString())),
      [],
    );
    const slots = useRef({ base: null, extra: null });
    React.Children.forEach(children, (node) => {
      if (React.isValidElement(node)) {
        if ((node as any)?.type?.displayName === "FoldItem.Base") {
          slots.current.base = node.props.children;
        }
        if ((node as any)?.type?.displayName === "FoldItem.Extra") {
          slots.current.extra = node.props.children;
        }
      }
    });
    return (
      <div className={cls(prefix, className)}>
        <div
          className={`${prefix}-base`}
          onClick={() => {
            expand.value = !expand.value;
            ExpandedMap.set(field.address.toString(), expand.value);
          }}
        >
          <FormItem.BaseItem
            {...props}
            label={
              <span
                className={cls(`${prefix}-title`, {
                  expand: expand.value,
                })}
              >
                {slots.current.extra && <IconWidget infer="Expand" size={10} />}
                {props.label}
              </span>
            }
          >
            <div
              style={{ width: "100%" }}
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              {slots.current.base}
            </div>
          </FormItem.BaseItem>
        </div>
        {expand.value && slots.current.extra && (
          <div className={`${prefix}-extra`}>{slots.current.extra}</div>
        )}
      </div>
    );
  });

const Base: React.FC<React.PropsWithChildren> = () => {
  return <Fragment />;
};

Base.displayName = "FoldItem.Base";

const Extra: React.FC<React.PropsWithChildren> = () => {
  return <Fragment />;
};

Extra.displayName = "FoldItem.Extra";

export const FoldItem = Object.assign(OriginFoldItem, { Base, Extra });
