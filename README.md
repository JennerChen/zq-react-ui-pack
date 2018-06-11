# zq-react-ui-pack
[![NPM version](https://img.shields.io/npm/v/zq-react-ui-pack.svg?style=flat-square)](https://www.npmjs.com/package/zq-react-ui-pack)
[![NPM downloads](https://img.shields.io/npm/dw/zq-react-ui-pack.svg.svg?style=flat-square)](https://www.npmjs.com/package/zq-react-ui-pack)
[![NPM downloads](https://img.shields.io/npm/l/zq-react-ui-pack.svg.svg?style=flat-square)](https://www.npmjs.com/package/zq-react-ui-pack)
[![Github Tag](https://img.shields.io/github/tag/zq-react-ui-pack/zq-react-ui-pack.svg)](https://www.npmjs.com/package/zq-react-ui-pack)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![GitHub stars](https://img.shields.io/github/stars/badges/zq-react-ui-pack.svg?style=social&label=Stars)](https://github.com/JennerChen/zq-react-ui-pack/tree/develop)

给自己项目定制的UI Kit, 主要目的为了统一各个模块的样式和写法。

## Getting Start

项目基于 React , [Material Design](https://material.io/design/material-theming/) 风格开发。故如果想继续使用的话，需要接受 MD 风格。

内部使用了 mobx以及 mobx-react, 来提升开发效率, 所以很适合已经大面积使用 mobx, mobx-react 的项目。

另外由于是高度封装的库了, 所以依赖很重。(绝大部分涉及UI框架的库, 依赖都会很重),依赖详见 [Prerequisties](#prerequisites)

## Prerequisites

你必须安装以下依赖:

### dependencies
- react
- react-dom
- styled-components（css-in-js 解决方案）
- mobx (状态管理)
- mobx-react
- styled-icons (图标库, Material风格)
- moment (用于时间操作)

## Api
### Button
```
	import { Button } from "zq-react-ui-pack";
    
    <Button>按钮</Button>
```
prop| type | default| desc
--------------| ------------------ |------------------|----|
type | string| "default"
shape| string| "default"
tagName| string | "button"

<!--stackedit_data:
eyJoaXN0b3J5IjpbLTc3NTk5MDc5NywtMTk2NzYyMDY3OSwtMz
czNzQyMDIsLTExNjE2Njc3MiwxMDY2OTkyNjcwLDg3MjM5MzU4
OSwxMzc1MDg1NzEsMTQyMDkwNTY0MCwtMTAwNTUzNTMyNF19
-->