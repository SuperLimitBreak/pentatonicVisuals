class Fret {
    constructor(container, imageFile, speed, onNextNeeded) {
        this.spawned = false;
        this.speed = speed;
        this.callback = onNextNeeded;

        this.start = container.clientHeight;
        this.offset = this.start;

        let img = document.createElement('img');
        img.src = imageFile;
        img.className += "fret";
        img.style.top = this.offset + "px";
        container.appendChild(img);

        this.height = container.clientHeight*0.15;
        this.elm = img;
    }

    drawFrame(mult) {
        // If the note has left the screen remove it
        if (this.offset < -this.height) {
            this.destroy();
            return false;
        }

        // Icrement the offset prior to updating the element
        this.offset -= (this.speed*mult);

        // if we need the next fret element call the callback
        if ((!this.spawned) && this.offset < this.start-(this.height*0.8)) {
            this.spawned = true;
            this.callback();
        }

        // Update the dom element
        this.elm.style.top = this.offset + "px";
        return true;
    }

    // Remove the element from the dom and delete the larger keys from the object
    destroy() {
        this.elm.parentNode.removeChild(this.elm);
        delete this.elm;
        delete this.callback;
    }
}
