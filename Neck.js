class Neck {
    constructor(container, imageFile, animationManager) {
        this.container = container;
        this.imageFile = imageFile;
        this.am = animationManager;

        this._initDepthOcclusion();

        setTimeout(()=>{this.spawnMore()},1000);
    }

    _initDepthOcclusion () {
        let d1 = document.createElement("div");
        d1.className += "topBlur";
        this.container.appendChild(d1);

        let d2 = document.createElement("div");
        d2.className += "topBlock";
        this.container.appendChild(d2);
    }

    spawnMore() {
        let f = new Fret(
            this.container,
            this.imageFile,
            ()=>{this.spawnMore()}
        );

        this.am.add(f);
    }
}
