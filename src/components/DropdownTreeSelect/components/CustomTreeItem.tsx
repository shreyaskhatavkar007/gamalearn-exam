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
  const handleToggle = (e: React.MouseEvent) => {
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
    >
      {children}
    </TreeItem>
  );
};
