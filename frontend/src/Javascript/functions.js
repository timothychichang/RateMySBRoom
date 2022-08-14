export function decodeBuffer(buffer) {
    var base64String = btoa(
        new Uint8Array(buffer)
          .reduce((data, byte) => data + String.fromCharCode(byte), '')
    );

    return 'data:image/jpeg;base64,' + base64String;
}
