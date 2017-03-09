class Fret {
    constructor(container, imageFile, onNextNeeded) {
        this.spawned = false;
        this.callback = onNextNeeded;

        let img = document.createElement('img');
        img.src = imageFile;
        img.className += "fret";

        this.start = container.clientHeight;
        this.offset = this.start;
        img.style.top = this.offset + "px";

        this.elm = img;
        container.appendChild(this.elm);
    }

    drawFrame(mult) {
        let height = this.elm.clientHeight;

        if (this.offset < 0-height) {
            this.destroy();
            return false;
        }

        this.offset -= (5*mult);
        if ((!this.spawned) && this.offset < this.start-(height*0.8)) {
            this.spawned = true;
            this.callback();
        }

        this.elm.style.top = this.offset + "px";
        return true;
    }

    destroy() {
        this.elm.parentNode.removeChild(this.elm);
        delete this.elm;
    }
}
