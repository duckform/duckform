# DuckForm

> 看到一只鸟走起来像鸭子、游泳起来像鸭子、叫起来也像鸭子，那么这只鸟就可以被称为鸭子。

可视化 formily 设计器，在 [designable](https://designable-antd.formilyjs.org/) 魔改的;


> [!IMPORTANT]
> formily Vue 相关生态暂不考虑支持.


代码逻辑目前没有太多改动， 主要是项目结构上

[x] 减少分层, 核心导出 core/react/settings-form/shared 四个包
[x] 减少 icons (1.5M) -> TODO
[x] TypeScript@5.x & React@18.x 依赖升级，类型修复
[x] 简化构建 rollup -> father, 运行环境 [bun](https://bun.sh), 未来计划 rsbuild 一步到位

可能会做的：

[] UI 升级到 antd@5 

## packages 说明
|                     |                       |                                                                                                                      |
| -------------------| --------------------- | -------------------------------------------------------------------------------------------------------------------- |
| @duckform/core |  拖拽库核心模型  | [![version](https://badgen.net/npm/v/@duckform/core)](https://www.npmjs.com/package/duckform/core)       |
| @duckform/shared | 公共方法    | [![version](https://badgen.net/npm/v/@duckform/shared)](https://www.npmjs.com/package/duckform/shared)       |
| @duckform/react |  React 适配层 | [![version](https://badgen.net/npm/v/@duckform/react)](https://www.npmjs.com/package/duckform/react)       |
| @duckform/settings-form |  属性配置表单组件合集 (formily style)  | [![version](https://badgen.net/npm/v/@duckform/settings-form)](https://www.npmjs.com/package/duckform/settings-form)       |

## 如何开发  

- 项目结构: 使用 bun 来组织管理的 monorepo
> 出现这种报错 `error: workspace dependency "@duckform/shared" not found Searched in "./packages/shared" `
> 请 删除 bun.lockb 重新 bun i
- Fomatter: biome , 请安装对应 vscode 插件
- src 目录为简单的 Playground, 使用 [RsBuild](https://rsbuild.dev/zh/guide/start/)


```bash
# 安装 bun 环境
curl -fsSL https://bun.sh/install | bash
# 安装依赖
bun i
# 构建packages 和 monorepo 依赖, (每次修改后都要重新build 才会在 playgorund 生效)
bun run build
# run dev 启动 playground
bun run dev
```

## 如何贡献

> 分支类型：斜杆前面 feature/fix/docuemnt, (core/react/settings-form/shared) 所属 package

1. fork 当前仓库
2. 创建分支， 例如： `git checkout -b feature/(core)xxx` 创建 core 包的功能分支
3. push 之后， 在你的 fork 仓库首页，会有个显眼的 Open pull Request


## 引用 

- [formily](https://formilyjs.org/)
- [designable](https://github.com/alibaba/designable)
