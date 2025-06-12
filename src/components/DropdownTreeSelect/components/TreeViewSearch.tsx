import { SimpleTreeView } from "@mui/x-tree-view/SimpleTreeView";
import { useEffect, useState, type JSX } from "react";
import { Box } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import { onlyUnique } from "./utils";
import { CustomTreeItem } from "./CustomTreeItem";
import type { RecursiveValue } from "../../../types/assessment";

type TreeViewSearchProps = {
  data: RecursiveValue[];
  setListId: (value: string[]) => void;
  inputText?: string;
  groupsList?: string[];

  listId?: string[];
};
export const TreeViewSearch = ({
  inputText,
  groupsList,
  data,
  setListId,
  listId,
}: TreeViewSearchProps): JSX.Element => {
  const [expand, setExpand] = useState<string[]>([]);
  useEffect(() => {
    if (groupsList) {
      if (inputText) {
        setExpand(groupsList);
      } else {
        setExpand([]);
      }
    }
  }, [inputText]);

  const treeNodes = renderTreeNodesSearch(data, setListId, setExpand, expand, inputText, listId);

  return (
    <SimpleTreeView
      sx={{ overflow: "hidden" }}
      expandedItems={expand}
      expansionTrigger="content"
    >
      {treeNodes?.some((v) => v) ? (
        treeNodes
      ) : (
        <Typography padding={3} paddingLeft={2}>
          No options
        </Typography>
      )}
    </SimpleTreeView>
  );
};

const renderTreeNodesSearch = (
  nodes: RecursiveValue[],
  setValue: (value: string[]) => void,
  setExpand: (nodeIds: string[]) => void,
  expand: string[] = [],
  inputSearch?: string,
  listId?: string[],
): (JSX.Element | null)[] | null => {
  return nodes
    ? nodes.map((node) => {
        const childFits: (JSX.Element | null)[] | null = node.children
          ? renderTreeNodesSearch(node.children, setValue, setExpand, expand, inputSearch, listId)
          : null;
        return childFits?.some((value) => !!value) ||
          (inputSearch
            ? node.label.toLowerCase().includes(inputSearch.toLowerCase())
            : true) ? (
              <CustomTreeItem
                key={node.id}
                node={node}
                expand={expand}
                setExpand={setExpand}
                label={
                  <Box
                    display="flex"
                    sx={{
                      width: "100%",
                      fontSize: "0.875rem",
                      alignItems: "center",
                    }}
                    alignItems="center"
                    gap={1}
                    onClick={(e) => {
                      e.stopPropagation();
                      setExpand(
                        expand.includes(node.id)
                          ? expand.filter((id) => id !== node.id)
                          : [...expand, node.id]
                      );
                    }}
                  >
                    <Checkbox
                      size="small"
                      onChange={(e) => {
                        setValue(
                          onlyUnique(
                            selectNodes(node, e.target.checked, listId) ?? []
                          )
                        );
                      }}
                      checked={
                        listId ? listId.includes(node.id) : false
                      }
                    />
                    {node.label}
                  </Box>
                }
              >
                {childFits}
              </CustomTreeItem>
        ) : null;
      })
    : null;
};
const selectNodes = (
  node: RecursiveValue,
  checked: boolean,
  array: string[] | undefined
) => {
  if (array) {
    if (!checked) {
      array = array?.filter((v) => v !== node.id);
    } else {
      array?.push(node.id);
    }
  }
  if (Array.isArray(node.children)) {
    node.children.forEach((node: RecursiveValue) => {
      array = selectNodes(node, checked, array);
    });
  }
  return array;
};
