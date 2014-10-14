function arrayBufferToString(buffer, asHex) {
    asHex = asHex || false;
    var str = '';
    var arr = new Uint8Array(buffer);
    for (var i = 0; i < arr.length; i++) {
        str += String.fromCharCode(arr[i]);
    }
    return str;
}

function stringToHex(str) {
    var hex = '';
    for (var i = 0; i < str.length; i++) {
        hex += str.charCodeAt(i).toString(16);
    }
    return hex;
}

var input = document.getElementById('upload');
input.onchange = function (e) {
    e.preventDefault();
    var file = this.files[0],
        reader = new FileReader();
    if (file.type !== 'application/x-bittorrent') {
        return false;
    }
    reader.readAsArrayBuffer(file);
    reader.onload = function () {
        var metadata = bdecode(arrayBufferToString(this.result), {
            utf8: true
        });
        var sha1 = new Digest.SHA1();
        var str = bencode(metadata.info);
        str = sha1.digest(arrayBufferToString(str));
        document.getElementById('magnet').value = 'magnet:?xt=urn:btih:' + stringToHex(arrayBufferToString(str)) + '&dn=' + metadata.info.name;
    };
    return false;
};