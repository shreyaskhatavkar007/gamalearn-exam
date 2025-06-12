import { TreeItem } from "@mui/x-tree-view/TreeItem";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Box } from "@mui/material";
import type { RecursiveValue } from "../../../types/assessment";
import type { JSX } from "react";

type CustomTreeItemProps = {
  node: RecursiveValue;
  expand: string[];
  setExpand: (value: string[]) => void;
  label: JSX.Element;
  children?: React.ReactNode;
};

export const CustomTreeItem = ({
  node,
  expand,
  setExpand,
  label,
  children,
}: CustomTreeItemProps) => {
  const handleToggle = (e: React.MouseEvent | React.KeyboardEvent) => {
    e.stopPropagation();
    setExpand(
      expand.includes(node.id)
        ? expand.filter((id) => id !== node.id)
        : [...expand, node.id]
    );
  };

  const MyIconContainer = ({ children }: { children: React.ReactNode }) => (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
      }}
      onClick={handleToggle}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          handleToggle(e);
        }
      }}
      role="button"
      tabIndex={0}
      aria-expanded={expand.includes(node.id)}
      aria-label={`Toggle ${node.label}`}
    >
      {children}
    </Box>
  );

  return (
    <TreeItem
      itemId={node.id}
      label={label}
      slots={{
        collapseIcon: ExpandMoreIcon,
        expandIcon: ChevronRightIcon,
        iconContainer: MyIconContainer,
      }}
      aria-expanded={expand.includes(node.id)}
      aria-label={`Tree item ${node.label}`}
    >
      {children}
    </TreeItem>
  );
};
