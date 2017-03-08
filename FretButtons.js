class FretButtons {
    constructor(container, config, animationManager) {
        this.container = container;
        this.config = config;
        this.animationManager = animationManager;

        let offset = container.clientWidth * 0.085;
        let pos = offset;
        this.elms = [];
        this.lines = [[],[],[],[],[]];

        for (let i=0; i<5; i++) {
            let img = document.createElement('img');
            img.src = config.releasedPrefix+ i +config.postfix;
            img.className += "fretButton";
            img.style.left = pos + "px";
            pos += (offset*1.94);

            container.appendChild(img);
            this.elms.push(img)
        }
    }

    changeState(button, state) {
        let prefix = "";

        if (state == "pressed") {
            prefix = this.config.pressedPrefix;
            let temp = new NoteLines(button, this.container);
            this.lines[button].push(temp);
            this.animationManager.add(temp);
        }

        if (state == "plucked") {
            prefix = this.config.pluckedPrefix;
        }

        if (state == "released") {
            prefix = this.config.releasedPrefix;
            this.lines[button].shift().stop();
        }

        this.elms[button].src = prefix + button + this.config.postfix;
    }
}
