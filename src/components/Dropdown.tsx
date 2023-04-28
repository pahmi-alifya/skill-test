import React, { memo, useMemo } from "react";
import { Dropdown as DropdownUi } from "@nextui-org/react";

type TDropdown = {
  handleChange: (val: any) => void;
  value: string | "";
  data: {
    uuid?: string;
    key?: string;
    value?: string;
    label?: string;
  }[];
  color?: "default" | "primary" | "secondary" | "success" | "warning" | "error";
  textColor?: "white" | "black";
};

const Dropdown = ({
  handleChange,
  data,
  value,
  color = "default",
  textColor = "white",
}: TDropdown) => {
  const selectedValue = useMemo(
    () => Array.from(value).join("").replaceAll("_", " "),
    [value]
  );

  return (
    <DropdownUi>
      <DropdownUi.Button
        bordered
        color={color}
        className="tw-justify-start"
        css={{
          tt: "capitalize",
          borderColor: "$black",
          color: textColor == "black" ? "$black" : "$white",
        }}
      >
        {selectedValue}
      </DropdownUi.Button>
      <DropdownUi.Menu
        aria-label="Single selection actions"
        color={color}
        disallowEmptySelection
        selectionMode="single"
        selectedKeys={value}
        onSelectionChange={(val) => handleChange(val)}
      >
        {data.map((value) => (
          <DropdownUi.Item
            className="tw-text-black"
            key={value.label || value.value}
          >
            {value.label || value.value || "-"}
          </DropdownUi.Item>
        ))}
      </DropdownUi.Menu>
    </DropdownUi>
  );
};

export default memo(Dropdown);
