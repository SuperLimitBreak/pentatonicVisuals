class Visualizer {
    constructor(container, imageFile) {
        this.container = container;
        this.imageFile = imageFile;
        this.speed = container.clientHeight * 0.008;
        this.am = new AnimationManager();

        let config = {
            releasedPrefix: "assets/buttons_released",
            pressedPrefix: "assets/buttons_pressed",
            pluckedPrefix: "assets/buttons_plucked",
            postfix: ".png"
        }

        this.buttons = new FretButtons(container, config, this.speed, this.am);
        this.listener = new window.keypress.Listener();
        this._initKeyListeners();

        let n = new Neck(container, imageFile, this.speed, this.am);
    }

    changeState(buttonNo, state) {
        this.buttons.changeState(button, state);
    }

    _buildListener(key, button) {
        let my_scope = this;

        return {
            "keys": key,
            "prevent_repeat": true,
            "on_keydown": function() {
                this.buttons.changeState(button, "plucked");
            },
            "on_keyup": function(e) {
                this.buttons.changeState(button, "released");
            },
            "this": my_scope
        };
    }

    _initKeyListeners() {
        this.listener.register_many(["a", "s", "d", "f", "g"].map((key,n)=>{
            return this._buildListener(key,n);
        }));
    }
}
