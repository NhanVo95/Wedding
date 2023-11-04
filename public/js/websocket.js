function startWebsocket() {
    var timeoutID = undefined;
    const ws = new WebSocket("ws://localhost:8080");
    // Browser WebSockets have slightly different syntax than `ws`.
    // Instead of EventEmitter syntax `on('open')`, you assign a callback
    // to the `onopen` property.
    // UNCOMMENT HERE
    ws.onopen = function () {
        // document.querySelector("#send").disabled = false;
        console.log("Websocket connected");

        if (this.timeoutID != undefined) {
            clearTimeout(this.timeoutID);
        }
        // document.querySelector("#send").addEventListener("click", function () {
        //     ws.send(document.querySelector("#message").value);
        // });
    };

    ws.onmessage = function (msg) {
        if (msg.data == "reload browser") {
            console.log("Page will reload");
            window.location.reload();
        }
        // document.querySelector(
        //     "#messages"
        // ).innerHTML += `<div>${msg.data}</div>`;
    };

    ws.onclose = function () {
        console.log("Websocket is closed and auto reconnect after 1s");
        // connection closed, discard old websocket and create a new one in 1s
        this.timeoutID = setTimeout(startWebsocket, 1000);
    };
}
