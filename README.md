# zq-react-ui-pack
[![NPM version](https://img.shields.io/npm/v/zq-react-ui-pack.svg?style=flat-square)](https://www.npmjs.com/package/zq-react-ui-pack)
[![NPM downloads](https://img.shields.io/npm/dm/zq-react-ui-pack.svg?style=flat-square)](https://www.npmjs.com/package/zq-react-ui-pack)
[![NPM downloads](https://img.shields.io/npm/l/zq-react-ui-pack.svg?style=flat-square)](https://www.npmjs.com/package/zq-react-ui-pack)
[![Github Tag](https://img.shields.io/github/tag/JennerChen/zq-react-ui-pack.svg)](https://www.npmjs.com/package/zq-react-ui-pack)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![GitHub stars](https://img.shields.io/github/stars/JennerChen/zq-react-ui-pack.svg?style=social&label=Stars)](https://github.com/JennerChen/zq-react-ui-pack/tree/develop)

![GitHub last commit (branch)](https://img.shields.io/github/last-commit/JennerChen/zq-react-ui-pack/develop.svg)

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

## install
推荐使用 yarn 安装:
```shell
yarn add zq-react-ui-pack
```

## Api
### Button
```javascript
import { Button } from "zq-react-ui-pack";
    
<Button>按钮</Button>
```
prop| type | default| desc
--------------| ------------------ |------------------|----|
type | string| `default`| 按钮样式, `[primary,default,revert]`
shape| string| `default`| 按钮形状 `[default]`
tagName| string | `button`| 按钮html标签 `[button,a]` e.g. 例如使用 `a`标签， 那么 最后渲染在页面的按钮会是 `<a>按钮</a>` 

#### Button.Icon
```javascript
import { Button } from "zq-react-ui-pack";
import { VerticalAlignTop } from "styled-icons/material";
<Button.Icon  
  type={"primary"}  
  size={24}  
  icon={VerticalAlignTop}  
/>
```
prop|  type| default| desc
-----| -----|---------|--------|
type| string| `default`| 按钮样式, `[primary,default,revert]`
size| int | `24` | 按钮大小, 因为这是使用svg渲染的图标, style的font-size对其无用,故使用 size表明其大小
icon| styled-icons | null | styled-icons 图标 
<!--stackedit_data:
eyJoaXN0b3J5IjpbMTIzNjQ0NjgxOCwxNTExNDAwOTM1LC01Nj
Y4Mjc2NzIsLTg5MTczMTA4NiwtMTA3MjgxMjA2NCwtNzkxODQ2
NTY0LC0yMDU0NTE5MTIsMTEyOTA5MjQ3MiwxMDUyODI0ODAwLC
0xMzU1NjE2MzE5LC0xNzIxNTIzMDcsLTM4OTc2ODY4MywtNTQz
NzA2NDg0LC0zNzM3NDIwMiwtMTE2MTY2NzcyLDEwNjY5OTI2Nz
AsODcyMzkzNTg5LDEzNzUwODU3MSwxNDIwOTA1NjQwLC0xMDA1
NTM1MzI0XX0=
-->