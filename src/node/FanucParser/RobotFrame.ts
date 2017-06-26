 

export enum FrameType{
    Tool,
    Frame,
    Unknown
}
export interface IRobotFrame {
    raw:string;
    file:string;
    type:FrameType;
    typeString:string;
    num:Number;
    X:Number;
    Y:Number;
    Z:Number;
    W:Number;
    P:Number;
    R:Number;

}
export class RobotFrame implements IRobotFrame {     
    public typeString:string;
    constructor(public raw:string,public file:string,public type:FrameType,public num:Number,public X:Number,public Y:Number,public Z:Number,public W:Number,public P:Number,public R:Number)
    {
        switch(type){
            case FrameType.Frame:
                this.typeString="Frame";
                break;
                case FrameType.Tool:
                this.typeString="Tool";
                break;
                default:
                debugger;
                this.typeString="Unknown";
                break;


        }
        this.typeString=type===0?"Tool":"Frame";
    }


    public toCSV():string{

        var result = `${this.file},${this.type==0?"Tool":"Frame"},${this.num},${this.X},${this.Y},${this.Z},${this.W},${this.P},${this.R}`;
        return result;
    }
}