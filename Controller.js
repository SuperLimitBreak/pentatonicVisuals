class StateManager {
    constructor(buttons) {
        this.buttons = buttons;
        this.pluckedString = -1;

        this.green = false;
        this.red = false;
        this.yellow = false;
        this.blue = false;
        this.orange = false;
    }

    _buttonByNumber(i) {
        switch(i) {
            case 0:
                return this.green;
            case 1:
                return this.red;
            case 2:
                return this.yellow;
            case 3:
                return this.blue;
            case 4:
                return this.orange;
            default:
                return null;
        }
    }

    _anyPressed() {
        return this.green || this.red || this.yellow || this.blue || this.orange;
    }

    _highestPressed() {
        switch(true) {
            case this.orange:
                return 4;
            case this.blue:
                return 3;
            case this.yellow:
                return 2;
            case this.red:
                return 1;
            case this.green:
                return 0;
        }

        return -1;
    }

    _newData(events) {
        this._setButtonState(events);

        if(events.includes("pluck")) {
            if (this.pluckedString != -1) {
                this.buttons.changeState(this.pluckedString, "released");
            }

            this.pluckedString = this._highestPressed();
            if (this.pluckedString != -1) {
                this.buttons.changeState(this.pluckedString, "plucked");
            }
        }

        if(this.pluckedString != -1) {
            if (this._highestPressed() != this.pluckedString) {
                this.buttons.changeState(this.pluckedString, "released");
                if (this._buttonByNumber(this.pluckedString)) {
                    this.buttons.changeState(this.pluckedString, "pressed");
                }

                this.pluckedString = -1;

                if (this._anyPressed()) {
                    this.pluckedString = this._highestPressed();

                    if (this.pluckedString != -1) {
                        this.buttons.changeState(this.pluckedString, "plucked");
                    }
                }
            }
        }
    }

    _setButtonState(events) {
        ["greendown", "reddown", "yellowdown", "bluedown", "orangedown"].map((v,i)=>{
            if (events.includes(v)) {
                this.buttons.changeState(i, "pressed");
                this[v.split("down")[0]] = true;
            }
        });

        ["greenup", "redup", "yellowup", "blueup", "orangeup"].map((v,i)=>{
            if (events.includes(v)) {
                this.buttons.changeState(i, "released");
                this[v.split("up")[0]] = false;
            }
        });
    }
}

class Controller {
    constructor(padIndex, buttons) {
        this.padIndex = padIndex;
        this.sm = new StateManager(buttons);

        this.stopped = false;
        this.lastState = null;

        requestAnimationFrame(()=>{this.loop()});
    }

    _newState(st) {
        let events = this._getEvents(st);

        if (events.length == 0) {
            return;
        }

        this.sm._newData(events);
        this.lastState = st;
    }

    _getEvents(st) {
        let events = [];

        ["yellow", "green", "red", "blue", "orange"].map((v)=>{
            let last = null;

            if (this.lastState != null) {
                last = this.lastState[v];
            }

            switch(st[v]) {
                case last:
                    break;

                case true:
                    events.push(v+"down");
                    break;

                case false:
                    events.push(v+"up");
                    break;
            }
        });

        if (st.plucked && !this.lastState.plucked) {
            events.push("pluck");
        }

        if (this.lastState != null) {
            if (!st.plucked && this.lastState.plucked) {
                events.push("pluckrelease");
            }
        }

        return events;
    }

    stop() {
        this.stopped = true;
    }

    loop() {
        let pad = navigator.getGamepads()[this.padIndex];
        let controllerState = {};

        ["yellow", "green", "red", "blue", "orange"].map((v,i)=>{
            controllerState[v] = pad.buttons[i].pressed;
        });

        controllerState.plucked = pad.axes[5] == 0 ? false : true;

        this._newState(controllerState);

        if (!this.stopped) {
            requestAnimationFrame(()=>{this.loop()});
        }
    }
}
