import javascript from '../../../src/js/parser/javascript/parser.js';
import _ from 'lodash';

describe('parser/javascript/anchor.js', function() {

  _.forIn({
    '^': {
      label: '开始行'
    },
    '$': {
      label: '结束行'
    }
  }, (content, str) => {
    it(`parses "${str}" as an Anchor`, function() {
      var parser = new javascript.Parser(str);
      expect(parser.__consume__anchor()).toEqual(jasmine.objectContaining(content));
    });
  });

});
