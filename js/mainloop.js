
/*** Thanks to https://github.com/IceCreamYou for setting us on the right path ***/

(function(root) {

var simulationTimestep = 1000 / 60,
    frameDelta = 0,
    lastFrameTimeMs = 0,
    fps = 60,
    lastFpsUpdate = 0,
    framesThisSecond = 0,
    numUpdateSteps = 0,
    minFrameDelay = 0,
    running = false,
    started = false,
    panic = false,

    requestAnimationFrame = root.requestAnimationFrame || (function() {
        var lastTimestamp = Date.now(),
            now,
            timeout;
        return function(callback) {
            now = Date.now();
            timeout = Math.max(0, simulationTimestep - (now - lastTimestamp));
            lastTimestamp = now + timeout;
            return setTimeout(function() {
                callback(now + timeout);
            }, timeout);
        };
    })(),

    cancelAnimationFrame = root.cancelAnimationFrame || clearTimeout,
    NOOP = function() {},
    begin = NOOP,
    update = NOOP,
    draw = NOOP,
    end = NOOP,
    rafHandle;

root.MainLoop = {
    getSimulationTimestep: function() {
        return simulationTimestep;
    },

    setSimulationTimestep: function(timestep) {
        simulationTimestep = timestep;
        return this;
    },

    getFPS: function() {
        return fps;
    },

    getMaxAllowedFPS: function() {
        return 1000 / minFrameDelay;
    },

    setMaxAllowedFPS: function(fps) {
        if (typeof fps === 'undefined') {
            fps = Infinity;
        }
        if (fps === 0) {
            this.stop();
        }
        else {
            // Dividing by Infinity returns zero.
            minFrameDelay = 1000 / fps;
        }
        return this;
    },

    resetFrameDelta: function() {
        var oldFrameDelta = frameDelta;
        frameDelta = 0;
        return oldFrameDelta;
    },

    setBegin: function(fun) {
        begin = fun || begin;
        return this;
    },

    setUpdate: function(fun) {
        update = fun || update;
        return this;
    },

    setDraw: function(fun) {
        draw = fun || draw;
        return this;
    },

    setEnd: function(fun) {
        end = fun || end;
        return this;
    },

    start: function() {
        if (!started) {
            started = true;
            rafHandle = requestAnimationFrame(function(timestamp) {
                draw(1);
                running = true;
                lastFrameTimeMs = timestamp;
                lastFpsUpdate = timestamp;
                framesThisSecond = 0;

                // Start the main loop.
                rafHandle = requestAnimationFrame(animate);
            });
        }
        return this;
    },

    stop: function() {
        running = false;
        started = false;
        cancelAnimationFrame(rafHandle);
        return this;
    },

    isRunning: function() {
        return running;
    },
};

function animate(timestamp) {
    if (timestamp < lastFrameTimeMs + minFrameDelay) {
        // Run the loop again the next time the browser is ready to render.
        rafHandle = requestAnimationFrame(animate);
        return;
    }

    frameDelta += timestamp - lastFrameTimeMs;
    lastFrameTimeMs = timestamp;

    begin(timestamp, frameDelta);

    if (timestamp > lastFpsUpdate + 1000) {
        // Compute the new exponential moving average with an alpha of 0.25.
        fps = 0.25 * framesThisSecond + 0.75 * fps;

        lastFpsUpdate = timestamp;
        framesThisSecond = 0;
    }
    framesThisSecond++;

    numUpdateSteps = 0;
    while (frameDelta >= simulationTimestep) {
        update(simulationTimestep);
        frameDelta -= simulationTimestep;
        if (++numUpdateSteps >= 240) {
            panic = true;
            break;
        }
    }

    draw(frameDelta / simulationTimestep);

    end(fps, panic);

    panic = false;

    // Run the loop again the next time the browser is ready to render.
    rafHandle = requestAnimationFrame(animate);
}

// AMD support
if (typeof define === 'function' && define.amd) {
    define(root.MainLoop);
}
// CommonJS support
else if (typeof exports === 'object') {
    module.exports = root.MainLoop;
}

})(this);