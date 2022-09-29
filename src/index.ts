import { h } from 'hastscript'
import { map } from 'unist-util-map'

import type { Directive as DirectiveNode } from 'mdast-util-directive';
import type { Plugin, Transformer } from 'unified';
import type { MapFunction } from 'unist-util-map'
import type { Node } from 'unist'

const isDirectiveNode = (node: Node): node is DirectiveNode => {
  const { type } = node;
  return type === 'textDirective' || type === 'leafDirective' || type === 'containerDirective';
}

const mapDirectiveNode: MapFunction = (node) => {
  if (isDirectiveNode(node)) {

    const { properties, tagName } = h(node.name, node.attributes);

    return {
      ...node,
      data: {
        hName: tagName,
        hProperties: properties
      }
    }
  }

  return node;
};

const transformNodeTree: Transformer = (nodeTree) => map(nodeTree, mapDirectiveNode);

const remarkDirectiveRehype: Plugin = () => transformNodeTree;

export default remarkDirectiveRehype;
