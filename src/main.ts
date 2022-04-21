import { Conf } from './core/conf';
import { HSL } from './libs/hsl';
import { Util } from './libs/util';
import { Item } from './parts/item'
import { Color } from "three/src/math/Color";
import './style.css'


// div作成
document.querySelectorAll('.l-main').forEach((val) => {
  const num = Conf.instance.NUM;
  const isBack:boolean = val.classList.contains('-back');
  for(let i = 0; i < num; i++) {
    const el = document.createElement('div');
    el.classList.add('l-main-item');
    el.classList.add(isBack ? '-back' : '-front');
    val.append(el);
  }
})

// 選択用のクラス作っておく
const selectClassNames:Array<string> = [];
const num = 100;
for(let l = 0; l < num; l++) {
  const hsl = new HSL();
  hsl.s = 1;
  hsl.l = 0.5;
  hsl.h = Util.instance.map(Math.sin(Util.instance.radian(Util.instance.map(l, 0, 360, 0, num - 1))), 0, 1, -1, 1);

  const col = new Color()
  col.setHSL(hsl.h, hsl.s, hsl.l);
  let styleCol:String = col.getStyle();

  const sheets = document.styleSheets
  const sheet = sheets[sheets.length - 1];
  const name = 'col-' + l
  sheet.insertRule(
    '.' + name + '::selection { color: ' + styleCol + '; background: ' + 'rgba(255,255,255,1)' + '; }',
    sheet.cssRules.length
  );

  selectClassNames.push(name);
}

document.querySelectorAll('.l-main-item.-back').forEach((val,i) => {
  new Item({
    el:val as HTMLElement,
    id:i,
    selectClassNames:selectClassNames,
  })
})
document.querySelectorAll('.l-main-item.-front').forEach((val,i) => {
  new Item({
    el:val as HTMLElement,
    id:i,
    selectClassNames:selectClassNames,
  })
})