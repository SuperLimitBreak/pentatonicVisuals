class NoteLines {
    constructor(button, container) {
        this.down = true;
        this.reachedTop = false;

        let n = document.createElement("div");
        n.className += "note";

        this._colorize(button, n);
        this._setLeft(button, container, n)

        this.maxHeight = container.clientHeight;
        this.height = n.clientHeight;
        n.style.height = this.height;

        this.bottom = (this.maxHeight)*0.254;
        n.style.bottom = this.bottom + "px";

        container.appendChild(n);
        this.elm = n;
    }

    _setLeft(button, container, elm) {
        let l = 0.157*container.clientWidth;
        l += button * (container.clientWidth * 0.165);
        elm.style.left = l + "px";
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

    _grow(mult) {
        if (this.height < this.maxHeight) {
            this.height += (5*mult);
            this.elm.style.height = this.height + "px";
        } else {
            this.reachedTop = true;
        }
    }

    _isDone() {
        if (this.bottom > this.maxHeight) {
            this.elm.parentNode.removeChild(this.elm);
            delete this.elm;
            return true;
        }
        return false;
    }

    _shrink(mult) {
        // if the bar has reached the top we need to shrink it
        if (this.reachedTop || (this.bottom+this.height > this.maxHeight+(this.maxHeight*0.254))) {
            this.height -= (mult*5);
            this.elm.style.height = this.height + "px";
        }
    }

    drawFrame(mult) {
        if (this.down) {
            this._grow(mult);
        } else {
            if (this._isDone()) {
                return false; // finished animating
            }

            this.bottom += (5*mult);
            this.elm.style.bottom = this.bottom + "px";
            this._shrink(mult);
        }
        return true; // more frames to come
    }
}
