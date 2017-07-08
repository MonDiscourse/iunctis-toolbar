import { registerOption } from 'pretty-text/pretty-text';
import { builders } from 'pretty-text/engines/discourse-markdown/bbcode';

registerOption((siteSettings, opts) => opts.features["vbulletin-bbcode"] = true);

function replaceFontColor (text) {
  while (text !== (text = text.replace(/\[color=([^\]]+)\]((?:(?!\[color=[^\]]+\]|\[\/color\])[\S\s])*)\[\/color\]/ig, function (match, p1, p2) {
    return `<font color='${p1}'>${p2}</font>`;
  })));
  return text;
}

function replaceFontSize (text) {
  while (text !== (text = text.replace(/\[size=([^\]]+)\]((?:(?!\[size=[^\]]+\]|\[\/size\])[\S\s])*)\[\/size\]/ig, function (match, p1, p2) {
    return `<font size='${p1}'>${p2}</font>`;
  })));
  return text;
}

function replaceFontFace (text) {
  while (text !== (text = text.replace(/\[font=([^\]]+)\]((?:(?!\[font=[^\]]+\]|\[\/font\])[\S\s])*)\[\/font\]/ig, function (match, p1, p2) {
    return `<font face='${p1}'>${p2}</font>`;
  })));
  return text;
}

function setupMarkdownIt(md) {
  const ruler = md.inline.bbcode_ruler;

  ruler.push('size', {
    tag: 'size',
    wrap: function(token, tagInfo){
      token.tag = 'font';
      token.attrs = [['size', tagInfo.attrs._default]];
      return true;
    }
  });

  ruler.push('font', {
    tag: 'font',
    wrap: function(token, tagInfo){
      token.tag = 'font';
      token.attrs = [['face', tagInfo.attrs._default]];
      return true;
    }
  });

  ruler.push('color', {
    tag: 'color',
    wrap: function(token, tagInfo){
      token.tag = 'font';
      token.attrs = [['color', tagInfo.attrs._default]];
      return true;
    }
  });

  ruler.push('bgcolor', {
    tag: 'bgcolor',
    wrap: function(token, tagInfo){
      token.tag = 'span';
      token.attrs = [['style', 'background-color:' + tagInfo.attrs._default.trim()]];
      return true;
    }
  });

  ruler.push('highlight',{
    tag: 'highlight',
    wrap: 'span.highlight'
  });

  ruler.push('small',{
    tag: 'small',
    wrap: function(token) {
      token.tag = 'span';
      token.attrs = [['style', 'font-size:x-small']];
      return true;
    }
  });

  ruler.push('aname', {
    tag: 'aname',
    wrap: function(token, tagInfo) {
      token.tag = 'a';
      token.attrs = [['name', tagInfo.attrs._default]];
      return true;
    }
  });

  ruler.push('jumpto', {
    tag: 'jumpto',
    wrap: function(token, tagInfo) {
      token.tag = 'a';
      token.attrs = [['href', '#' + tagInfo.attrs._default]];
      return true;
    }
  });

  ['left','right','center'].forEach(dir=>{
    md.block.bbcode_ruler.push(dir, {
      tag: dir,
      wrap: function(token) {
        token.attrs = [['style', 'text-align:' + dir]];
        return true;
      }
    });
  });

  md.block.bbcode_ruler.push('indent', {
    tag: 'indent',
    wrap: 'blockquote.indent'
  });

  ['ot', 'edit'].forEach(tag => {
    md.block.bbcode_ruler.push('ot', {
      tag: tag,
      before: function(state) {
        let token = state.push('sepquote_open', 'div', 1);
        token.attrs = [['class', 'sepquote']];

        token = state.push('span_open', 'span', 1);
        token.block = false;
        token.attrs = [['class', 'smallfont']];

        token = state.push('text', '', 0);
        token.content = I18n.t('bbcode.' + tag);

        token = state.push('span_close', 'span', -1);

        state.push('soft_break', 'br', 0);
        state.push('soft_break', 'br', 0);
      },
      after: function(state) {
        state.push('sepquote_close', 'div', -1);
      }
    });
  });

  ['list', 'ul', 'ol'].forEach(tag =>{
    md.block.bbcode_ruler.push(tag, {
      tag: tag,
      replace: function(state, tagInfo, content) {
        let ol = tag === 'ol' || (tag === 'list' && tagInfo.attrs._default);
        let token;

        if (ol) {
          token = state.push('ordered_list_open', 'ol', 1);
          if (tagInfo.attrs._default) {
            token.attrs = [['type', tagInfo.attrs._default]];
          }
        } else {
          state.push('bullet_list_open', 'ul', 1);
        }

        let lines = content.split("\n");
        let list = [null];
        let index = 0;

        for(let i=0; i<lines.length; i++) {
          let line = lines[i];

          let match = line.match(/^\s*\[?\*\]?(.*)/);
          if (match) {
            index++;
            list[index] = match[1];
            continue;
          }

          match = line.match(/\s*\[li\](.*)\[\/li\]\s*$/);
          if (match) {
            index++;
            list[index] = match[1];
            continue;
          }

          if (list[index]) {
            list[index] += '\n' + line;
          } else {
            list[index] = line;
          }
        }

        list.forEach(li => {
          if (li !== null) {
            state.push('list_item_open', 'li', 1);
            // a bit lazy, we could use a block parser here
            // but it means a lot of fussing with line marks
            token = state.push('inline', '', 0);
            token.content = li;
            token.children = [];

            state.push('list_item_close', 'li', -1);
          }
        });

        if (ol) {
          state.push('ordered_list_close', 'ol', -1);
        } else {
          state.push('bullet_list_close', 'ul', -1);
        }

        return true;
      }
    });
  });

}

export function setup(helper) {

  helper.whiteList([
    'div.floatl',
    'div.floatr',
    'div.titrenews',
    'span.su',
    'font[color=*]',
    'font[size=*]',
  ]);

  helper.whiteList({
    custom(tag, name, value) {
      if (tag === 'span' && name === 'style') {
        return /^font-size:.*$/.exec(value);
      }

      if (tag === 'div' && name === 'style') {
        return /^text-align:(center|left|right|justify)$/.exec(value);
      }
    }
  });

  const { register, replaceBBCode } = builders(helper);

  replaceBBCode("small", contents => ['span', {'style': 'font-size:x-small'}].concat(contents));
  replaceBBCode("floatl", contents => ['div', {'class': 'floatl'}].concat(contents));
  replaceBBCode("floatr", contents => ['div', {'class': 'floatr'}].concat(contents));
  replaceBBCode("t", contents => ['div', {'class': 'titrenews'}].concat(contents));
  replaceBBCode('su', contents => ['span', { 'class': 'su' }].concat(contents));

  ["left", "center", "right", "justify"].forEach(direction => {
    replaceBBCode(direction, contents => ['div', {'style': "text-align:" + direction}].concat(contents));
  });

  helper.addPreProcessor(replaceFontColor);
  helper.addPreProcessor(replaceFontSize);
  
}