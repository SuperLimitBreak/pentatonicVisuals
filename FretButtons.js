class FretButtons {
    constructor(container, config, speed, animationManager) {
        this.container = container;
        this.config = config;
        this.speed = speed;
        this.animationManager = animationManager;

        this.elms = [];
        this.lines = [[],[],[],[],[]];

        this._initButtons();
    }

    _initButtons() {
        let offset = this.container.clientWidth * 0.085;
        let pos = offset;

        for (let i=0; i<5; i++) {
            let img = document.createElement('img');
            img.src = this.config.releasedPrefix + i + this.config.postfix;
            img.className += "fretButton";
            img.style.left = pos + "px";
            pos += (offset*1.94);

            this.container.appendChild(img);
            this.elms.push(img);
        }
    }

    changeState(button, state) {
        let prefix = "";

        if (state == "pressed") {
            prefix = this.config.pressedPrefix;
        }

        if (state == "plucked") {
            prefix = this.config.pluckedPrefix;
            let temp = new NoteLines(button, this.container, this.speed);
            this.lines[button].push(temp);
            this.animationManager.add(temp);
        }

        if (state == "released") {
            prefix = this.config.releasedPrefix;
            let ln = this.lines[button].shift();
            if (ln != null) {
                ln.stop();
            }
        }

        this.elms[button].src = prefix + button + this.config.postfix;
    }
}
