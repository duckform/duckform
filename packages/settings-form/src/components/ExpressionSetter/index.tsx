import { GlobalRegistry } from "@duckform/core";
import { TextWidget, usePrefix } from "@duckform/react";
import { requestIdle } from "@duckform/shared";
import { Radio } from "@formily/antd";
import { CodeOutlined } from "@ant-design/icons";
import { Button, Modal, Space } from "antd";
import React, { useEffect, useMemo, useState } from "react";
import { MonacoInput } from "../MonacoInput";
import { initDeclaration } from "./declarations";
import { helpCode } from "./helpCode";
import "./styles.less";
import { useField } from "@formily/react";
import { Field } from "@formily/core";

export type ExpressionSetterProps = {
  scopeDefines?: Record<string, string>;
  // value: string;
  // onChange: (expression: string) => void;
};

const monacoProps: React.ComponentProps<typeof MonacoInput> = {
  width: "100%",
  height: 400,
  language: "typescript",
  helpCode: helpCode,
  options: {
    minimap: { enabled: false },
  },
};

export const ExpressionSetter: React.FC<
  React.PropsWithChildren<ExpressionSetterProps>
> = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [innerVisible, setInnerVisible] = useState(false);

  const scopeDefines = useMemo(() => {
    if (!props.scopeDefines) return [];
    return Object.keys(props.scopeDefines);
  }, [props.scopeDefines]);

  const field = useField<Field>();

  const [active, setActive] = useState(
    /\s+/.test(field.value) ? "" : field.value,
  );
  const [code, setCode] = useState(/\s+/.test(field.value) ? field.value : "");
  const prefix = usePrefix("expression-setter");

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  useEffect(() => {
    if (modalVisible) {
      requestIdle(
        () => {
          initDeclaration().then(() => {
            setInnerVisible(true);
          });
        },
        {
          timeout: 400,
        },
      );
    } else {
      setInnerVisible(false);
    }
  }, [modalVisible]);
  return (
    <React.Fragment>
      {props.children}
      <CodeOutlined onClick={openModal}></CodeOutlined>
      {/* <Button block onClick={openModal}>
        <TextWidget token="SettingComponents.ExpressionSetter.configureExpression" />
      </Button> */}
      <Modal
        title={GlobalRegistry.getDesignerMessage(
          "SettingComponents.ExpressionSetter.configureExpression",
        )}
        width="70%"
        centered
        bodyStyle={{ padding: 10 }}
        transitionName=""
        maskTransitionName=""
        open={modalVisible}
        onCancel={closeModal}
        destroyOnClose
        onOk={() => {
          field.value = active ?? code;
          // props.onChange(active ?? code);
          closeModal();
        }}
      >
        <div className={prefix}>
          <Space direction="vertical">
            <div>使用全局作用域变量：</div>
            <Radio.Group
              value={active}
              onChange={(e) => setActive(e.target.value)}
              options={scopeDefines.map((item) => {
                return {
                  label: item,
                  value: item,
                };
              })}
              optionType="button"
            ></Radio.Group>
          </Space>
          <div>
            <Space direction="vertical">
              <div>自定义表达式(与全局作用域变量不能共存): </div>
              <div className="coder-wrapper">
                {/* {innerVisible ? ( */}
                <MonacoInput
                  {...monacoProps}
                  value={code}
                  onChange={(neo) => setCode(neo)}
                ></MonacoInput>
                {/* ) : (
                  "Loading..."
                )} */}
              </div>
            </Space>
          </div>
        </div>
      </Modal>
    </React.Fragment>
  );
};
