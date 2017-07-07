"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FrameType;
(function (FrameType) {
    FrameType[FrameType["Tool"] = 0] = "Tool";
    FrameType[FrameType["Frame"] = 1] = "Frame";
    FrameType[FrameType["Unknown"] = 2] = "Unknown";
})(FrameType = exports.FrameType || (exports.FrameType = {}));
class RobotFrame {
    constructor(raw, file, type, num, X, Y, Z, W, P, R) {
        this.raw = raw;
        this.file = file;
        this.type = type;
        this.num = num;
        this.X = X;
        this.Y = Y;
        this.Z = Z;
        this.W = W;
        this.P = P;
        this.R = R;
        switch (type) {
            case FrameType.Frame:
                this.typeString = "Frame";
                break;
            case FrameType.Tool:
                this.typeString = "Tool";
                break;
            default:
                debugger;
                this.typeString = "Unknown";
                break;
        }
        this.typeString = type === 0 ? "Tool" : "Frame";
    }
    toCSV() {
        var result = `${this.file},${this.type == 0 ? "Tool" : "Frame"},${this.num},${this.X},${this.Y},${this.Z},${this.W},${this.P},${this.R}`;
        return result;
    }
}
exports.RobotFrame = RobotFrame;
//# sourceMappingURL=RobotFrame.js.map