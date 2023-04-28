import React, { memo, useCallback, useMemo, useState } from "react";
import Dropdown from "./Dropdown";
import { useFishesStore } from "@/stores/fishes";
import { debounce } from "lodash";
import { Input } from "@nextui-org/react";

const Filter = () => {
  const [item, setItem] = useState<string>("komoditas");
  const { getFishesFilter } = useFishesStore((state) => state);

  const filterData = useMemo(
    () => [
      {
        uuid: "komoditas",
        label: "Komoditas",
      },
      {
        uuid: "area_provinsi",
        label: "Provinsi",
      },
      {
        uuid: "area_kota",
        label: "Kota",
      },
      {
        uuid: "size",
        label: "Ukuran",
      },
    ],
    []
  );

  const handleChange = useCallback(
    (val: any) => {
      setItem(Array.from(val).join(", "));
    },
    [item]
  );

  const handleSearch = debounce((val: string, type: string = "komoditas") => {
    getFishesFilter(val, type);
  }, 500);

  return (
    <div className="tw-flex">
      <Dropdown
        color="default"
        value={item}
        data={filterData}
        handleChange={handleChange}
      />
      <Input
        type="search"
        color="primary"
        className="tw-pl-2"
        onChange={(e) =>
          handleSearch(
            e.target.value,
            filterData?.find((val) => val?.label === item)?.uuid
          )
        }
        placeholder={`Cari ${item}`}
      />
    </div>
  );
};

export default memo(Filter);
