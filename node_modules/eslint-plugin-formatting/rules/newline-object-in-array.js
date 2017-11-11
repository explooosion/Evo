'use strict';

module.exports = function(context) {
    var SHOULD_START_IN_NEW_LINE = 'Object in multiline array should start in new line';
    var SHOULD_END_IN_NEW_LINE = 'Multiline array containing objects should end in new line';
    var SHOULD_INDET = 'Object should be indented';
    return {
        ObjectExpression: function (node) {
            var parent = node.parent;
            if (parent.type === 'ArrayExpression') {
                if (parent.loc.start.line !== parent.loc.end.line && node.loc.start.line !== node.loc.end.line) {
                    if (node.loc.start.line === parent.loc.start.line) {
                        // console.log(node.loc, parent.loc);
                        context.report(node, node.loc.start, SHOULD_START_IN_NEW_LINE);
                    } else if (node.loc.end.line === parent.loc.end.line) {
                        // console.log(node.loc, parent.loc);
                        context.report(node, node.loc.end, SHOULD_END_IN_NEW_LINE);
                    } else if (node.loc.start.column + 1 !== node.loc.end.column) {
                        // console.log(node.loc, parent.loc);
                        context.report(node, node.loc.start, SHOULD_START_IN_NEW_LINE);
                    } else if (node.loc.start.column <= parent.loc.end.column) {
                        // console.log(node.loc, parent.loc);
                        context.report(node, node.loc.start, SHOULD_INDET);
                    }
                }
            }
        }
    };
};
