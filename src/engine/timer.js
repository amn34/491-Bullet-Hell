// This game shell was happily modified from Googler Seth Ladd's "Bad Aliens" game and his Google IO talk in 2011

class Timer {
    constructor() {
        this.gameTime = 0;
        this.maxStep = 0.05;
        this.lastTimestamp = 0;
    };

    tick() {
        var current = Date.now();
        var delta = (current - this.lastTimestamp) / 1000;
        this.lastTimestamp = current;

        var gameDelta = Math.min(delta, this.maxStep);
        this.gameTime += gameDelta;

        this.displayTime();
        return gameDelta;
    };

    displayTime() {
        var time = this.gameTime;
        const minutes = Math.floor(time / 60);

        time -= (minutes * 60);
        const seconds = Math.floor(time);

        time -= seconds;
        const millis = Math.floor(time * 10);

        document.getElementById("minutes").textContent = (minutes < 10 ? "0" : "") + minutes;
        document.getElementById("seconds").textContent = (seconds < 10 ? "0" : "") + seconds;
        document.getElementById("millis").textContent = millis;
    }

    displayTotalTime() {

        var time = this.gameTime;
        
        const totalMinutesSoFar = parseInt(document.getElementById("tot-minutes").textContent);
        const totalSecondsSoFar = parseInt(document.getElementById("tot-seconds").textContent);
        const totalMillisSoFar = parseInt(document.getElementById("tot-millis").textContent);
        
        time += (totalMinutesSoFar * 60) + (totalSecondsSoFar) + (totalMillisSoFar * 10);
        console.log(time);

        const minutes = Math.floor(time / 60);

        time -= (minutes * 60);
        const seconds = Math.floor(time);

        time -= seconds;
        const millis = Math.floor(time * 10);

        document.getElementById("tot-minutes").textContent = (minutes < 10 ? "0" : "") + minutes;
        document.getElementById("tot-seconds").textContent = (seconds < 10 ? "0" : "") + seconds;
        document.getElementById("tot-millis").textContent = millis;
    }

    getGameTime() {
        return Math.floor(this.gameTime);
    }
};