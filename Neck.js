class Neck {
    constructor(container, imageFile, speed, animationManager) {
        this.container = container;
        this.imageFile = imageFile;
        this.speed = speed;
        this.am = animationManager;

        this._initDepthOcclusion();

        // After one second start the fretboard
        setTimeout(()=>{this.spawnMore()},1000);
    }

    // Creates two elements, a black block and a transparency gradient.
    // These help to create the illusion of the fretboard disappearing into the
    // background.
    _initDepthOcclusion () {
        let transparencyGradient = document.createElement("div");
        transparencyGradient.className += "topBlur";
        this.container.appendChild(transparencyGradient);

        let black = document.createElement("div");
        black.className += "topBlock";
        this.container.appendChild(black);
    }

    spawnMore() {
        let f = new Fret(
            this.container,
            this.imageFile,
            this.speed,
            ()=>{this.spawnMore()}
        );

        this.am.add(f);
    }
}
