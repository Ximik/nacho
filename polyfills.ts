if (typeof global.Buffer === "undefined") {
  import("buffer").then(({ Buffer }) => {
    global.Buffer = Buffer;
  });
}
