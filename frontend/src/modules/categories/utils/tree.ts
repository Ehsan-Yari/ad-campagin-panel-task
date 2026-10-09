import type { Category, CategoryNode } from 'src/modules/categories/interface/categories';

export function buildTree(categories: Category[]): CategoryNode[] {
  const nodes = new Map<string, CategoryNode>();

  categories.forEach((category) => {
    nodes.set(category.id, { ...category, level: 0, children: [] });
  });

  const roots: CategoryNode[] = [];

  nodes.forEach((node) => {
    const parent = node.parentId ? nodes.get(node.parentId) : undefined;
    if (parent) {
      parent.children.push(node);
    } else {
      roots.push(node);
    }
  });

  const setLevel = (list: CategoryNode[], level: number) => {
    list.forEach((node) => {
      node.level = level;
      setLevel(node.children, level + 1);
    });
  };
  setLevel(roots, 0);

  return roots;
}

export function getDescendantIds(node: CategoryNode): string[] {
  return node.children.flatMap((child) => [child.id, ...getDescendantIds(child)]);
}

export function toggleCategory(node: CategoryNode, selectedIds: string[]): string[] {
  const affected = [node.id, ...getDescendantIds(node)];

  if (selectedIds.includes(node.id)) {
    return selectedIds.filter((id) => !affected.includes(id));
  }

  return [...new Set([...selectedIds, ...affected])];
}
