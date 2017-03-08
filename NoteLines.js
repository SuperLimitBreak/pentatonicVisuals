class NoteLines {
    constructor(button, container) {
        this.down = true;
        this.reachedTop = false;

        let n = document.createElement("div");
        n.className += "note";
        this._colorize(button, n);

        let l = 0.157*container.clientWidth;
        l += button * (container.clientWidth * 0.165);
        n.style.left = l + "px";

        this.height = n.clientHeight;
        n.style.height = this.height;
        this.maxHeight = container.clientHeight;

        this.bottom = (this.maxHeight)*0.254;
        n.style.bottom = this.bottom + "px";

        container.appendChild(n);
        this.elm = n;
    }

    _colorize(button, elm) {
        switch (button) {
            case 0:
                elm.className += " green";
                break;
            case 1:
                elm.className += " red";
                break;
            case 2:
                elm.className += " yellow";
                break;
            case 3:
                elm.className += " blue";
                break;
            case 4:
                elm.className += " orange";
                break;
        }
    }

    stop() {
        this.down = false;
    }

    drawFrame() {
        if (this.down) {
            if (this.height < this.maxHeight) {
                this.height += 5;
                this.elm.style.height = this.height + "px";
            } else {
                this.reachedTop = true;
            }
        } else {
            if (this.bottom > this.maxHeight) {
                this.elm.parentNode.removeChild(this.elm);
                delete this.elm;
                return false; // finished animating
            }

            this.bottom += 5;
            this.elm.style.bottom = this.bottom + "px";

            // if the bar has reached the top we need to shrink it
            if (this.reachedTop || (this.bottom+this.height > this.maxHeight+(this.maxHeight*0.254))) {
                this.height -= 5;
                this.elm.style.height = this.height + "px";
            }
        }
        return true; // more frames to come
    }
}
