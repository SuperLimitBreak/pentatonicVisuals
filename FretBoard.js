class FretBoard {
    constructor(container, imageFile) {
        this.container = container;
        this.imageFile = imageFile;
        this.am = new AnimationManager();

        let config = {
            releasedPrefix: "assets/buttons_released",
            pressedPrefix: "assets/buttons_pressed",
            pluckedPrefix: "assets/buttons_plucked",
            postfix: ".png"
        }

        this.buttons = new FretButtons(container, config, this.am);
        this.listener = new window.keypress.Listener();
        this.initKeyListeners();

        this.initDepthOcclusion();

        setTimeout(()=>{this.spawnMore()},1000);
    }

    initDepthOcclusion () {
        let d1 = document.createElement("div");
        d1.className += "topBlur";
        this.container.appendChild(d1);

        let d2 = document.createElement("div");
        d2.className += "topBlock";
        this.container.appendChild(d2);
    }

    initKeyListeners() {
        let my_scope = this;
        this.listener.register_many([
            {
                "keys": "a",
                "prevent_repeat": true,
                "on_keydown": function() {
                    this.buttons.changeState(0, "pressed");
                },
                "on_keyup": function(e) {
                    this.buttons.changeState(0, "released");
                },
                "this": my_scope
            },
            {
                "keys": "s",
                "on_keydown": function() {
                    this.buttons.changeState(1, "pressed");
                },
                "on_keyup": function(e) {
                    this.buttons.changeState(1, "released");
                },
                "this": my_scope
            },
            {
                "keys": "d",
                "on_keydown": function() {
                    this.buttons.changeState(2, "pressed");
                },
                "on_keyup": function(e) {
                    this.buttons.changeState(2, "released");
                },
                "this": my_scope
            },
            {
                "keys": "f",
                "on_keydown": function() {
                    this.buttons.changeState(3, "pressed");
                },
                "on_keyup": function(e) {
                    this.buttons.changeState(3, "released");
                },
                "this": my_scope
            },
            {
                "keys": "g",
                "on_keydown": function() {
                    this.buttons.changeState(4, "pressed");
                },
                "on_keyup": function(e) {
                    this.buttons.changeState(4, "released");
                },
                "this": my_scope
            },
        ]);
    }

    spawnMore() {
        let f1 = new Fret(this.container, this.imageFile);
        f1.animate(()=>{this.spawnMore()});
    }
}
