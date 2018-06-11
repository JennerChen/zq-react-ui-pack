# zq-react-ui-pack
[![NPM version](https://img.shields.io/npm/v/zq-react-ui-pack.svg?style=flat-square)](https://www.npmjs.com/package/zq-react-ui-pack)
[![NPM downloads](https://img.shields.io/npm/dw/zq-react-ui-pack.svg.svg?style=flat-square)](https://www.npmjs.com/package/zq-react-ui-pack)

[![NPM downloads](https://img.shields.io/npm/l/zq-react-ui-pack.svg.svg?style=flat-square)](https://www.npmjs.com/package/zq-react-ui-pack)
给自己项目定制的UI Kit, 主要目的为了统一各个模块的样式和写法。

## Getting Start

项目基于 React , [Material Design](https://material.io/design/material-theming/) 风格开发。故如果想继续使用的话，需要接受 MD 风格。

内部使用了 mobx以及 mobx-react, 来提升开发效率, 所以很适合已经大面积使用 mobx, mobx-react 的项目。

另外由于是高度封装的库了, 所以依赖很重。(绝大部分涉及UI框架的库, 依赖都会很重),依赖详见 [Prerequisties](#Prerequisites)

## Prerequisites

你必须安装以下依赖:

### peerDependencies
- react
- react-dom
- styled-components（css-in-js 解决方案）
- mobx (状态管理)
- mobx-react
- styled-icons (图标库, Material风格)
- moment (用于时间操作)

### dependencies
- polished 
- react-popper
- react-spring
- styled-tools (styled-components 工具库)

<!--stackedit_data:
eyJoaXN0b3J5IjpbLTEwMDU1MzUzMjQsLTExMzcxODk1MDAsMT
MxNjkxMzE5MywxNjkwMTIxNTMyLDYxODkxOTY4MywtOTIwMzQ3
OTQ2LDY5Mzg5NzE2OSwtMTY2NTc1NTUzMF19
-->