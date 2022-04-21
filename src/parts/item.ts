
import { MyDisplay } from "../core/myDisplay";

// -----------------------------------------
//
// -----------------------------------------
export class Item extends MyDisplay {

  private _id:number;
  private _nowClass:string = '';
  private _selectClassNames:Array<string>;
  private _isBack:boolean;

  constructor(opt:{el:HTMLElement; id:number, selectClassNames:Array<string>}) {
    super(opt)

    this._id = opt.id;
    this._selectClassNames = opt.selectClassNames;
    this._isBack = this.getEl().classList.contains('-back')

    const b = "POSITIVE,";
    const a = "NEGATIVE,"
    let txt;
    if(this._isBack) {
      txt = a.split('')[this._id % a.length];
    } else {
      txt = b.split('')[this._id % b.length];
    }


    this._update();
    this.getEl().innerHTML = txt;
  }


  protected _update(): void {
    super._update();

    if(this._nowClass != '') this.removeClass(this._nowClass);

    const key = (this._id + this._c) % (this._selectClassNames.length - 1);
    this._nowClass = this._selectClassNames[key];
    this.addClass(this._nowClass);
  }
}