class Stopwatch {
  constructor() {
    this.startTime = 0;
    this.elapsedTime = 0;
    this.timerInterval = null;
    this.isRunning = false;

    // Get DOM elements
    this.timerDisplay = document.getElementById("timerDisplay");
    this.startStopBtn = document.getElementById("startStopBtn");
    this.clearBtn = document.getElementById("clearBtn");

    // Initialize event listeners
    this.initEventListeners();

    // Initialize display
    this.updateDisplay();
  }

  initEventListeners() {
    // Start/Stop button functionality
    this.startStopBtn.addEventListener("click", () => {
      if (this.isRunning) {
        this.stop();
      } else {
        this.start();
      }
    });

    // Clear button functionality
    this.clearBtn.addEventListener("click", () => {
      this.reset();
    });

    // Keyboard shortcuts
    document.addEventListener("keydown", (e) => {
      switch (e.code) {
        case "Space":
          e.preventDefault();
          if (this.isRunning) {
            this.stop();
          } else {
            this.start();
          }
          break;
        case "KeyR":
          e.preventDefault();
          this.reset();
          break;
      }
    });
  }

  start() {
    if (!this.isRunning) {
      this.startTime = Date.now() - this.elapsedTime;
      this.timerInterval = setInterval(() => {
        this.elapsedTime = Date.now() - this.startTime;
        this.updateDisplay();
      }, 10); // Update every 10ms for smooth display

      this.isRunning = true;
      this.startStopBtn.textContent = "stop";
      this.startStopBtn.style.backgroundColor = "#ef4444"; // Red when running
    }
  }

  stop() {
    if (this.isRunning) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
      this.isRunning = false;
      this.startStopBtn.textContent = "start";
      this.startStopBtn.style.backgroundColor = "#fbbf24"; // Yellow when stopped
    }
  }

  reset() {
    this.stop();
    this.elapsedTime = 0;
    this.updateDisplay();
  }

  updateDisplay() {
    const totalMilliseconds = this.elapsedTime;

    // Calculate hours, minutes, seconds, and milliseconds
    const hours = Math.floor(totalMilliseconds / 3600000);
    const minutes = Math.floor((totalMilliseconds % 3600000) / 60000);
    const seconds = Math.floor((totalMilliseconds % 60000) / 1000);
    const milliseconds = Math.floor((totalMilliseconds % 1000) / 10);

    // Format the display (HH:MM:SS.MS)
    const formattedTime =
      `${hours.toString().padStart(2, "0")}:` +
      `${minutes.toString().padStart(2, "0")}:` +
      `${seconds.toString().padStart(2, "0")}.` +
      `${milliseconds.toString().padStart(2, "0")}`;

    this.timerDisplay.textContent = formattedTime;
  }

  // Method to get current time in different formats
  getCurrentTime() {
    return {
      totalMilliseconds: this.elapsedTime,
      hours: Math.floor(this.elapsedTime / 3600000),
      minutes: Math.floor((this.elapsedTime % 3600000) / 60000),
      seconds: Math.floor((this.elapsedTime % 60000) / 1000),
      milliseconds: Math.floor((this.elapsedTime % 1000) / 10),
    };
  }
}

// Initialize the stopwatch when the page loads
document.addEventListener("DOMContentLoaded", () => {
  const stopwatch = new Stopwatch();

  // Add some visual feedback for button interactions
  const buttons = document.querySelectorAll(
    ".clear-button, .start-stop-button"
  );
  buttons.forEach((button) => {
    button.addEventListener("mousedown", () => {
      button.style.transform = "scale(0.95)";
    });

    button.addEventListener("mouseup", () => {
      button.style.transform = "scale(1)";
    });

    button.addEventListener("mouseleave", () => {
      button.style.transform = "scale(1)";
    });
  });

  // Add instructions for keyboard shortcuts
  console.log("Stopwatch Controls:");
  console.log("Spacebar: Start/Stop");
  console.log("R key: Reset");
});
