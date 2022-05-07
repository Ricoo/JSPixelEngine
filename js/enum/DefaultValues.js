import Enum from "./Enum.js";
import { TextAlign } from "./TextAlign.js";
import { TextType } from "./TextType.js";

const DefaultValues = new Enum({
    EMPTY_IMAGE : {
        src:"data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
        name:"EMPTY_IMAGE",res:[1,1]
    },
    DEFAULT_STYLE: {
        name:"DEFAULT_STYLE",
        font: "Arial",
        size: 20,
        color: "#000000",
        type: TextType.fill,
        align: TextAlign.start,
    },
    LOGO_JSPENGINE: {
        name: "LOGO_JSPENGINE",
        src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAAAyAQMAAACEQrBZAAAABlBMVEX///////9VfPVsAAAAAXRSTlMAQObYZgAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAOtJREFUKJHt0bFOwzAQBuCLMnhLXsBVn4GtDKivROUBBiSnS7uVF4rQRR28oOsLIOipQ9ZkiqtGHHbUARpYWeBfLH2Sdb/uAP7zO9HzSlx4jSBAdjbLUl/asa320YpPf/cLHFuCd/fsTZE3liRtovkE6+tDH8wLydoPM5bbeuKejDyWHZ12D0OXMHe6yoxs9IH4WUdLW3F5/m6KbFIRv/XRYIHqqymNV8E2cLYXiBb6qel6MCamaOWxRXXjXoPpjnhXAqS9ZVSz0E9IC7EL/RI/r1Ddtj6aJd42F3tLcLzLrhibfGP2x2v8tXwABYCCcqjYH4kAAAAASUVORK5CYII=",
        res: [150, 50]
    }
});

export {DefaultValues};