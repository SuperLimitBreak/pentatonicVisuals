class AnimationManager {
    constructor() {
        this.live = [];
        this.waiting = [];
        this.running = false;
    }

    animate() {
        this.running = true;

        let newLive = [];
        for (let i=0; i<this.live.length; i++) {
            let obj = this.live.shift();

            // Run the frame and re queue it if it returns true
            if (obj.drawFrame()) {
                newLive.push(obj);
            }
        }

        for (let i=0; i<this.waiting.length; i++) {
            newLive.push(this.waiting.shift());
        }

        this.live = newLive;

        if (this.live.length == 0) {
            this.running = false;
            return;
        }

        window.requestAnimationFrame(()=>{
            this.animate();
        });
    }

    add(obj) {
        this.waiting.push(obj);

        if (!this.running) {
            window.requestAnimationFrame(()=>{
                this.animate();
            });
        }
    }
}
