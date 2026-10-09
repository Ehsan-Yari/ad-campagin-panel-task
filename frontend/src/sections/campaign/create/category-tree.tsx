import type { CategoryNode } from 'src/modules/categories/interface/categories';

import { useState } from 'react';

import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import { toggleCategory, getDescendantIds } from 'src/modules/categories/utils/tree';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';

type CategoryTreeProps = {
  tree: CategoryNode[];
  value: string[];
  disabled?: boolean;
  onChange: (value: string[]) => void;
};

export function CategoryTree({ tree, value, disabled, onChange }: CategoryTreeProps) {
  return (
    <Box
      sx={{
        py: 1,
        borderRadius: 1.5,
        border: (theme) => `solid 1px ${theme.vars.palette.divider}`,
        opacity: disabled ? 0.48 : 1,
      }}
    >
      {tree.map((node) => (
        <CategoryTreeItem
          key={node.id}
          node={node}
          value={value}
          disabled={disabled}
          ancestorChecked={false}
          onToggle={(target) => onChange(toggleCategory(target, value))}
        />
      ))}
    </Box>
  );
}

type CategoryTreeItemProps = {
  node: CategoryNode;
  value: string[];
  disabled?: boolean;
  ancestorChecked: boolean;
  onToggle: (node: CategoryNode) => void;
};

function CategoryTreeItem({
  node,
  value,
  disabled,
  ancestorChecked,
  onToggle,
}: CategoryTreeItemProps) {
  const [open, setOpen] = useState(true);

  const checked = disabled || value.includes(node.id);
  const descendants = getDescendantIds(node);
  const selectedDescendants = descendants.filter((id) => value.includes(id)).length;

  const indeterminate =
    !disabled && (checked ? selectedDescendants < descendants.length : selectedDescendants > 0);

  const excluded = !disabled && ancestorChecked && !checked;

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', pl: 1 + node.level * 4, pr: 2 }}>
        <IconButton
          size="small"
          onClick={() => setOpen(!open)}
          sx={{ visibility: node.children.length ? 'visible' : 'hidden' }}
        >
          <Iconify
            width={16}
            icon={open ? 'eva:arrow-ios-downward-fill' : 'eva:arrow-ios-back-fill'}
          />
        </IconButton>

        <Checkbox
          size="small"
          checked={checked}
          disabled={disabled}
          indeterminate={indeterminate}
          onChange={() => onToggle(node)}
        />

        <Typography
          variant={node.level === 0 ? 'subtitle2' : 'body2'}
          sx={{ color: excluded ? 'text.disabled' : 'text.primary' }}
        >
          {node.title}
        </Typography>

        {excluded && (
          <Label color="warning" sx={{ ml: 1 }}>
            مستثنی
          </Label>
        )}
      </Box>

      {node.children.length > 0 && (
        <Collapse in={open} unmountOnExit>
          {node.children.map((child) => (
            <CategoryTreeItem
              key={child.id}
              node={child}
              value={value}
              disabled={disabled}
              ancestorChecked={ancestorChecked || checked}
              onToggle={onToggle}
            />
          ))}
        </Collapse>
      )}
    </>
  );
}
