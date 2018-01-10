export default {
  _render() {
    return this.renderLabel(this.label).then(label => label.addClass('anchor'));
  },
  setup() {
    if (this.textValue === '^') {
      this.label = '开始以';
    } else {
      this.label = '以结束';
    }
  }
};
