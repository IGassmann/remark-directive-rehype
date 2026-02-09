import { h } from 'hastscript'
import { map } from 'unist-util-map'

import type { Directives as DirectiveNode } from 'mdast-util-directive';
import type { Plugin, Transformer } from 'unified';
import type { MapFunction } from 'unist-util-map'
import type { Node } from 'unist'

/**
 * Type guard that checks whether a node is a directive node
 * (`textDirective`, `leafDirective`, or `containerDirective`).
 */
const isDirectiveNode = (node: Node): node is DirectiveNode => {
  const { type } = node;
  return type === 'textDirective' || type === 'leafDirective' || type === 'containerDirective';
}

/**
 * Maps a directive node to include hast data (`hName` and `hProperties`),
 * so that `remark-rehype` can convert it to the corresponding HTML element.
 * Non-directive nodes are returned unchanged.
 */
const mapDirectiveNode: MapFunction = (node) => {
  if (isDirectiveNode(node)) {

    const { properties, tagName } = h(node.name, node.attributes ?? {});

    return {
      ...node,
      data: {
        ...node.data,
        hName: tagName,
        hProperties: properties
      }
    }
  }

  return node;
};

const transformNodeTree: Transformer = (nodeTree) => map(nodeTree, mapDirectiveNode);

/**
 * Remark plugin that enables directives (parsed by `remark-directive`) to be
 * rendered as HTML elements when using `remark-rehype`.
 *
 * @remarks
 * This plugin must be used after `remark-directive` and before `remark-rehype`
 * in the unified pipeline.
 *
 * @example
 * ```ts
 * import remarkDirective from 'remark-directive'
 * import remarkDirectiveRehype from 'remark-directive-rehype'
 * import remarkRehype from 'remark-rehype'
 *
 * const file = await unified()
 *   .use(remarkParse)
 *   .use(remarkDirective)
 *   .use(remarkDirectiveRehype)
 *   .use(remarkRehype)
 *   .use(rehypeStringify)
 *   .process('::my-component{title="Hello"}')
 * ```
 */
const remarkDirectiveRehype: Plugin = () => transformNodeTree;

export default remarkDirectiveRehype;
