class Cooldown {
    // Class for preventing sending too many requests at once
    constructor(seconds) {
        this.seconds = seconds
        this.startTime
    }

    #timeDiff() {
        // Calculate the difference between the start time and current time
        if (this.startTime) { // Check if the time is set
            var diff = new Date() - this.startTime
            return Math.abs(Math.floor(diff / 1000)) // Turn to seconds
        }
        return 0
    }

    start() {
        // Starts the clock
        this.startTime = new Date()
    }

    isFinished() {
        // Returns true if the time difference is larger than the seconds
        if (this.#timeDiff() >= this.seconds) {
            return true
        }

        if (this.startTime) { // Check if the time is set
            return false
        }
        return true
    }

    timeLeft() {
        // returns how much time is left
        if (this.startTime) { // Check if the time is set
            return this.seconds - this.#timeDiff()
        }
        return 0
    }
}

module.exports = Cooldown