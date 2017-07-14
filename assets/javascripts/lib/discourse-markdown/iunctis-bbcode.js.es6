import { registerOption } from 'pretty-text/pretty-text';
import { builders } from 'pretty-text/engines/discourse-markdown/bbcode';

registerOption((siteSettings, opts) => opts.features["iunctis-bbcode"] = true);

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

  ruler.push('color', {
    tag: 'color',
    wrap: function(token, tagInfo){
      token.tag = 'font';
      token.attrs = [['color', tagInfo.attrs._default]];
      return true;
    }
  });

  ruler.push('small',{
    tag: 'small',
    wrap: function(token) {
      token.tag = 'span';
      token.attrs = [['style', 'font-size:x-small']];
      return true;
    }
  });
  
  ruler.push('t', {
    tag: 't',
    wrap: function(token, tagInfo){
      token.tag = 'div';
      token.attrs = [['class', 'titrenews']];
      return true;
    }
  });
  
  ruler.push('su', {
    tag: 'su',
    wrap: function(token, tagInfo){
      token.tag = 'span';
      token.attrs = [['class', 'su']];
      return true;
    }
  });
  
  ruler.push('floatl', {
    tag: 'floatl',
    wrap: function(token, tagInfo){
      token.tag = 'div';
      token.attrs = [['class', 'floatl']];
      return true;
    }
  });

  ruler.push('floatr', {
    tag: 'floatr',
    wrap: function(token, tagInfo){
      token.tag = 'div';
      token.attrs = [['class', 'floatr']];
      return true;
    }
  });

  ['left','center','right','justify'].forEach(dir=>{
      tag: dir,
      wrap: function(token) {
        token.attrs = [['style', 'text-align:' + dir]];
        return true;
      }
  });

}

export function setup(helper) {

  helper.whiteList([
    'div.highlight',
    'span.highlight',
    'div.sepquote',
    'span.smallfont',
    'blockquote.indent',
    'font[color=*]',
    'font[size=*]',
    'font[face=*]',
    'ol[type=*]'
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

  if (helper.markdownIt) {
    helper.registerPlugin(setupMarkdownIt);
    return;
  }

  const { register, replaceBBCode, rawBBCode, replaceBBCodeParamsRaw } = builders(helper);

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
