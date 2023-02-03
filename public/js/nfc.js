export async function cardIdNfc() {
    //return new Promise(async (resolve) => {

        // Function scan after a nfc tag
        function startScanning() {
            // Get refercens to nfc reader
            document.querySelector(".primary_card").style.backgroundColor =
                "hotpink";
            const ndef = new NDEFReader();

            // Start scaning for NFC tags
            // Start scaning for NFC tags
            ndef.scan()
                .then(() => {
                    document.querySelector(
                        ".primary_card"
                        ).style.backgroundColor = "yellow";
                    // text.innerHTML = "Scan started successfully.";

                    // If you get a error while reading a tag
                    ndef.addEventListener("readingerror", () => {
                        // text.innerHTML ="Error! Cannot read data from the NFC tag. Try a different one?";
                        document.querySelector(
                            ".primary_card"
                            ).style.backgroundColor = "red";
                    });
                    // If you reading a tag successful
                    ndef.addEventListener(
                        "reading",
                        ({ message, serialNumber }) => {
                            // info.innerHTML = message + ", " + serialNumber;
                            // text.innerHTML = "NDEF message read.";
                            document.querySelector(
                                ".primary_card"
                            ).style.backgroundColor = "white";
                            // document.querySelector(".secondary_card").value = serialNumber;
                            return serialNumber;
                        }
                    );
                    // If you get a error while reading a tag
                })
                .catch((error) => {
                    // text.innerHTML = `Error! Scan failed to start: ${error}.`;
                });
        }

        // Look if the device have NFC
        if ("NDEFReader" in window) {
            //const text = document.querySelector("h1");
            //text.innerHTML = navigator.permissions.query({ name: "nfc" });

            // Look if have permissions for a nfc is granted or not if permissions is not granded make a button that give browser permissions for nfc
            navigator.permissions.query({ name: "nfc" }).then((result) => {
                if (result.state === "granted") {
                    //text.innerHTML = navigator.permissions.query({
                    //name: "nfc",
                    //});
                    webWorker();
                } else if (result.state === "prompt") {
                    // Show a scan button.
                    document.querySelector("#scanButton").style.display =
                        "block";
                    document.querySelector("#scanButton").onclick = (event) => {
                        // Prompt user to allow to send and receive info when they tap NFC devices.
                        document.querySelector("#scanButton").style.display =
                            "none";
                        // webWorker();
                        document.querySelector(
                            ".primary_card"
                        ).style.backgroundColor = "blue";
                        startScanning();
                    };
                }
            });
        } else {
            // If device have no nfc reader or browser does not support NDEFReader
            //text.innerHTML = "No nfc reader, or browser does not support NDEFReader";
        }

        function webWorker() {
            if (window.Worker) {
                //text.innerHTML = navigator.permissions.query({ name: "nfc" });
                workerMessage();
            }
        }

        function workerMessage() {
            let worker = new Worker("./worker.js");
            //text.innerHTML = "Find web worker";
            worker.addEventListener("message", function (evt) {
                if (evt.data) {
                    //text.innerHTML = evt.data;

                    if (evt.data === 1) {
                        startScanning();
                    }
                }
            });
        }
  // });
}
