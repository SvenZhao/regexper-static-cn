// Escape nodes are used for escape sequences. It is rendered as a label with
// the description of the escape and the numeric code it matches when
// appropriate.

import _ from 'lodash';

function hex(value) {
  var str = value.toString(16).toUpperCase();

  if (str.length < 2) {
    str = '0' + str;
  }

  return `(0x${str})`;
}

export default {
  type: 'escape',

  // Renders the escape into the currently set container.
  _render() {
    return this.renderLabel(this.label)
      .then(label => {
        label.select('rect').attr({
          rx: 3,
          ry: 3
        });
        return label;
      });
  },

  setup() {
    let addHex;

    // The escape code. For an escape such as `\b` it would be "b".
    this.code = this.properties.esc.properties.code.textValue;
    // The argument. For an escape such as `\xab` it would be "ab".
    this.arg = this.properties.esc.properties.arg.textValue;
    // Retrieves the label, ordinal value, an flag to control adding hex value
    // from the escape code mappings
    [this.label, this.ordinal, addHex] = _.result(this, this.code);

    // When requested, add hex code to the label.
    if (addHex) {
      this.label = `${this.label} ${hex(this.ordinal)}`;
    }
  },

  // Escape code mappings
  b: ['边界符', -1, false],
  B: ['非文字边界', -1, false],
  d: ['数字', -1, false],
  D: ['非数字', -1, false],
  f: ['form feed', 0x0c, true],
  n: ['line feed', 0x0a, true],
  r: ['carriage return', 0x0d, true],
  s: ['空白符', -1, false],
  S: ['非空白符', -1, false],
  t: ['tab', 0x09, true],
  v: ['vertical tab', 0x0b, true],
  w: ['单词', -1, false],
  W: ['非单词', -1, false],
  1: ['回溯引用 (分组 = 1)', -1, false],
  2: ['回溯引用 (分组 = 2)', -1, false],
  3: ['回溯引用 (分组 = 3)', -1, false],
  4: ['回溯引用 (分组 = 4)', -1, false],
  5: ['回溯引用 (分组 = 5)', -1, false],
  6: ['回溯引用 (分组 = 6)', -1, false],
  7: ['回溯引用 (分组 = 7)', -1, false],
  8: ['回溯引用 (分组 = 8)', -1, false],
  9: ['回溯引用 (分组 = 9)', -1, false],
  0: function() {
    if (this.arg) {
      return [`octal: ${this.arg}`, parseInt(this.arg, 8), true];
    } else {
      return ['null', 0, true];
    }
  },
  c() {
    return [`ctrl-${this.arg.toUpperCase()}`, this.arg.toUpperCase().charCodeAt(0) - 64, true];
  },
  x() {
    return [`0x${this.arg.toUpperCase()}`, parseInt(this.arg, 16), false];
  },
  u() {
    return [`U+${this.arg.toUpperCase()}`, parseInt(this.arg, 16), false];
  }
};
