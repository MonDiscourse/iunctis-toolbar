//-------------------------- STANDARD ------------------------------------------

// [SMALL]...[/SMALL]
Discourse.BBCode.replaceBBCode("small", function(contents) { return ['span', {'style': 'font-size:x-small'}].concat(contents); });
Discourse.Markdown.whiteListTag('span', 'style', 'font-size:x-small');

Discourse.BBCode.replaceBBCode("su", function(contents) { return ['span', {'class': 'surligne'}].concat(contents); });
Discourse.Markdown.whiteListTag('span', 'class', 'surligne');

Discourse.BBCode.replaceBBCode("floatl", function(contents) { return ['div', {'class': 'floatl'}].concat(contents); });
Discourse.Markdown.whiteListTag('div', 'class', 'floatl');

Discourse.BBCode.replaceBBCode("floatr", function(contents) { return ['div', {'class': 'floatr'}].concat(contents); });
Discourse.Markdown.whiteListTag('div', 'class', 'floatr');

Discourse.BBCode.replaceBBCode("t", function(contents) { return ['div', {'class': 'titrenews'}].concat(contents); });
Discourse.Markdown.whiteListTag('div', 'class', 'titrenews');

// [LEFT]...[/LEFT]
// [CENTER]...[/CENTER]
// [RIGHT]...[/RIGHT]
// [JUSTIFY]...[/JUSTIFY]
["left", "center", "right", "justify"].forEach(function(direction){
  Discourse.BBCode.replaceBBCode(direction, function(contents) { return ['div', {'style': "text-align:" + direction}].concat(contents); });
});
Discourse.Markdown.whiteListTag('div', 'style', /^text-align:.+$/);

//------------------------------- FONT -----------------------------------------

// NOTE: the regex is based on http://blog.stevenlevithan.com/archives/reverse-recursive-pattern
//       it's removing the most nested first and iterating using the while loop to remove less nested matches.

function replaceFontColor (text) {
  while (text != (text = text.replace(/\[color=([^\]]+)\]((?:(?!\[color=[^\]]+\]|\[\/color\])[\S\s])*)\[\/color\]/ig, function (match, p1, p2, offset, string) {
    return "<font color='" + p1 + "'>" + p2 + "</font>";
  })));
  return text;
}

function replaceFontSize (text) {
  while (text != (text = text.replace(/\[size=([^\]]+)\]((?:(?!\[size=[^\]]+\]|\[\/size\])[\S\s])*)\[\/size\]/ig, function (match, p1, p2, offset, string) {
    return "<font size='" + p1 + "'>" + p2 + "</font>";
  })));
  return text;
}

Discourse.Dialect.addPreProcessor(replaceFontColor);
Discourse.Dialect.addPreProcessor(replaceFontSize);

Discourse.Markdown.whiteListTag('font', 'color');
Discourse.Markdown.whiteListTag('font', 'size');
