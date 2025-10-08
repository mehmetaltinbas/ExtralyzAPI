import { InlineNode } from 'src/source/types/inline-node.interface';

export interface BlockNode {
    content: InlineNode[];
}
