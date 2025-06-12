import { useEffect, useState } from "react";
import { Box, Chip, TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";

import { TreeViewSearch } from "./components/TreeViewSearch";
import type { RecursiveValue } from "../../types/assessment";

type DropDownTreeSelectProps = {
  data: RecursiveValue[];
  listId: string[];
  setListId: (value: string[]) => void;
  disabled?: boolean;
};

const DropDownTreeSelect = ({
  data,
  listId,
  setListId,
  disabled
}: DropDownTreeSelectProps) => {
  
  useEffect(() => {
    data.forEach((value) => {
      getAllNodeChild(value);
    });
  }, [data]);

  const [itemsList, setItemsList] = useState<RecursiveValue[]>([]);
  const [groupsList, setGroupsList] = useState<string[]>([]);
  const [inputText, setInputText] = useState<string>();

  const getAllNodeChild = (node: RecursiveValue | null = null) => {
    if (node === null) return [];
    if (node.children === undefined) {
      setItemsList((prev) => [...prev, { id: node.id, label: node.label }]);
    } else {
      setGroupsList((prevState) => [...prevState, node.id]);
    }
    if (Array.isArray(node.children)) {
      node.children.forEach((node) => {
        getAllNodeChild(node);
      });
    }
    return itemsList;
  };

  const renderChips = () => {
    return (
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
        {listId
          ? listId
              .filter((v) => !groupsList.includes(v))
              .map((value) => {
                return (
                  <Chip
                    color="secondary"
                    key={value}
                    size="small"
                    variant="outlined"
                    sx={{ pt: 1.8, pb: 1.8 }}
                    onMouseDown={(event) => event.stopPropagation()}
                    onDelete={
                      disabled
                        ? undefined
                        : () => {
                            if (listId) {
                              const newList = listId.filter((v) => v !== value && !groupsList.includes(v));
                              setListId(newList);
                            }
                          }
                    }
                    label={itemsList?.find((v) => v.id === value)?.label ?? ""}
                  />
                );
              })
          : null}
      </Box>
    );
  };

  return (
    <Autocomplete
      multiple
      fullWidth
      size="small"
      className={
        listId && listId.length ? "autocomplete" : "autocomplete-empty"
      }
      clearOnEscape={false}
      onChange={(event) => {
        // @ts-ignore
        !event.key && setListId([]);
        setInputText("");
      }}
      options={[data]}
      disabled={disabled}
      value={listId as any}
      filterOptions={(v) => v}
      onBlur={() => setInputText("")}
      renderValue={() => renderChips()}
      disableCloseOnSelect
      inputValue={inputText}
      renderOption={() => (
        <TreeViewSearch
          data={data}
          setListId={setListId}
          inputText={inputText}
          groupsList={groupsList}
          listId={listId}
        />
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          onChange={(v) => setInputText(v.target.value)}
          placeholder="Select Group"
        />
      )}
    />
  );
};
export default DropDownTreeSelect;
