import { dom, library, config } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";

config.autoReplaceSvg = true;
config.observeMutations = true;
config.searchPseudoElements = true;

library.add(fas);
// dom.i2svg();
// dom.watch();

// const mavon = [
//   "bold",
//   "italic",
//   "thumb-tack",
//   "link",
//   "picture-o",
//   "repeat",
//   "undo",
//   "trash-o",
//   "floppy-o",
//   "compress",
//   "eye",
//   "eye-slash",
//   "question-circle",
//   "times",
//   "align-left",
//   "align-center",
//   "align-right",
//   "arrows-alt",
//   "bars",
//   "list-ul",
//   "list-ol",
//   "strikethrough",
//   "underline",
//   "table",
//   "columns",
//   "quote-left",
//   "code",
//   "superscript",
//   "subscript",
//   "header",
//   "window-maximize"
// ];
// for (const icon of mavon) {
//  library.add
// }

// // const css = dom.css();
// // dom.insertCss(css);
