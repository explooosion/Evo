'use strict';

module.exports = function(context) {
    var SPACE_BETWEEN_BLOCK_AND_CLASS_NAME = 'One space is requried between block and class name';
    var BLOCK_AND_CLASS_NAME_ON_SAME_LINE = 'Class block and class name should be on same line';
    return {
        ClassDeclaration: function (node) {
            var nameEnd = node.id.loc.end;
            if (node.superClass) {
                nameEnd = node.superClass.loc.end;
            }
            if (node.body.loc.start.line !== nameEnd.line) {
                context.report(node, node.loc.start, BLOCK_AND_CLASS_NAME_ON_SAME_LINE);
            } else if (node.body.loc.start.column !== nameEnd.column + 1) {
                context.report(node, node.loc.start, SPACE_BETWEEN_BLOCK_AND_CLASS_NAME);
            }
        }
    };
};
