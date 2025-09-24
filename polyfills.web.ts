if (typeof global.Buffer === "undefined") {
  import("buffer").then(({ Buffer }) => {
    global.Buffer = Buffer;
  });
}

if (typeof window !== "undefined" && !("BarcodeDetector" in window)) {
  import("@undecaf/zbar-wasm")
    .then((zbarWasm) => {
      (window as any).zbarWasm = zbarWasm;
      return import("@undecaf/barcode-detector-polyfill");
    })
    .then(({ BarcodeDetectorPolyfill }) => {
      (window as any).BarcodeDetector = BarcodeDetectorPolyfill;
    })
    .catch((error) => {
      if (error.message && error.message.includes("import.meta")) {
        return;
      }
      console.warn("Failed to load barcode detector polyfill:", error);
    });
}
