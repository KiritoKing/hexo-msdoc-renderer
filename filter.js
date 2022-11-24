var pandoc = require("pandoc-filter");

// format provides access to the target format, and meta provides access to the document’s metadata.
function action({ t: type, c: value }, format, meta) {
  // 解决图片地址问题
  if (type === "Image") {
    let src = value[value.length - 1];
    // console.log(src[0].length);
    // src[0].substring(src[0].indexOf("/") + 1);
    // console.log(src[0]);
    return pandoc.Image(["", [], []], [pandoc.Str("image")], src);
  }
}

pandoc.stdio(action);