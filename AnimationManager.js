class AnimationManager {
    constructor() {
        this.live = [];
        this.waiting = [];
        this.running = false;
        this.lastTimestamp = null;
    }

    animate(highResTimeStamp) {
        let multiplier = 1;
        if (this.lastTimestamp != null){
            multiplier = Math.round(
                (highResTimeStamp - this.lastTimestamp) /
                (1000/60)
            );
        }
        this.lastTimestamp = highResTimeStamp;

        this.running = true;

        let newLive = [];
        let length = this.live.length;
        for (let i=0; i<length; i++) {
            let obj = this.live.shift();

            // Run the frame and re queue it if it returns true
            if (obj.drawFrame(multiplier)) {
                newLive.push(obj);
            }
        }

        length = this.waiting.length;
        for (let i=0; i<length; i++) {
            newLive.push(this.waiting.shift());
        }

        this.live = newLive;

        if (this.live.length == 0) {
            this.running = false;
            return;
        }

        window.requestAnimationFrame((ts)=>{
            this.animate(ts);
        });
    }

    add(obj) {
        this.waiting.push(obj);

        if (!this.running) {
            window.requestAnimationFrame((ts)=>{
                this.animate(ts);
            });
        }
    }
}
