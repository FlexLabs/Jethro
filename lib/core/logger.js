module.exports = function(severity, source, message, timestamp) {
    if (typeof severity !== "object") {
        if (typeof severity !== "undefined" && typeof source !== "undefined" && typeof message !== "undefined") {
            if (typeof timestamp === "undefined") {
                timestamp = new Date();
            }

            this.emit('logger', {
                severity: severity,
                source: source,
                message: message,
                timestamp: timestamp
            });
        } else {
            this.log(
                "warning", "Logger", "Check syntax, something was undefined - Severity: "
                + severity + " Source: " + source + " Message: " + message
            );
        }
    } else {
        this.log("warning", "Logger", "An object was passed to Jethro, support for this is currently unavailable!");
    }
};