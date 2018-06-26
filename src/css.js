import { injectGlobal } from "styled-components";
import { normalize } from "polished";
injectGlobal`${normalize()}`;

injectGlobal`
    *{
		box-sizing: border-box;
		font:14px/1.6 PingFangSC-light, "Microsoft YaHei", "SIMSUN";
	}
`;

//injectGlobal`
//    @font-face {
//  font-family: 'iconfont';  /* project id 695698 */
//  src: url('//at.alicdn.com/t/font_695698_vabsiu5eo65n4s4i.eot');
//  src: url('//at.alicdn.com/t/font_695698_vabsiu5eo65n4s4i.eot?#iefix') format('embedded-opentype'),
//  url('//at.alicdn.com/t/font_695698_vabsiu5eo65n4s4i.woff') format('woff'),
//  url('//at.alicdn.com/t/font_695698_vabsiu5eo65n4s4i.ttf') format('truetype'),
//  url('//at.alicdn.com/t/font_695698_vabsiu5eo65n4s4i.svg#iconfont') format('svg');
//}
//
//
//.iconfont{
//    font-family:"iconfont" !important;
//    font-size:16px;font-style:normal;
//    -webkit-font-smoothing: antialiased;
//    -webkit-text-stroke-width: 0.2px;
//    -moz-osx-font-smoothing: grayscale;}
//`;
