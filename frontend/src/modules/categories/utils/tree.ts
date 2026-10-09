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

export function toggleCategory(
  tree: CategoryNode[],
  node: CategoryNode,
  selectedIds: string[]
): string[] {
  const affected = [node.id, ...getDescendantIds(node)];

  if (selectedIds.includes(node.id)) {
    return selectedIds.filter((id) => !affected.includes(id));
  }

  return selectCompleteParents(tree, [...new Set([...selectedIds, ...affected])]);
}

function selectCompleteParents(tree: CategoryNode[], selectedIds: string[]): string[] {
  const selected = new Set(selectedIds);

  const visit = (node: CategoryNode) => {
    node.children.forEach(visit);

    if (node.children.length && node.children.every((child) => selected.has(child.id))) {
      selected.add(node.id);
    }
  };
  tree.forEach(visit);

  return [...selected];
}
