import React, { memo, useEffect, useMemo } from "react";
import {
  Button,
  Loading,
  Table as TableUi,
  useAsyncList,
  useCollator,
} from "@nextui-org/react";
import { EditIcon, PopoverDelete } from ".";
import { dateConvert, rupiahFormat } from "@/utils";
import { useFishesStore } from "@/stores/fishes";
import { TResFishesList } from "@/types";

type TTable = {
  handleUpdate: (data: TResFishesList) => void;
};

const Table = ({ handleUpdate }: TTable) => {
  const { fishes, deleteFishes } = useFishesStore((state) => state);
  const collator = useCollator({ numeric: true });

  useEffect(() => {
    list.reload();
  }, [fishes]);

  const load = async ({ signal }: any) => {
    return {
      items: fishes,
      index: 0,
    };
  };
  const sort = async ({ items, sortDescriptor }: any) => {
    return {
      items: items.sort((a: { [x: string]: any }, b: { [x: string]: any }) => {
        let first = a[sortDescriptor.column];
        let second = b[sortDescriptor.column];
        let cmp = collator.compare(first, second);
        if (sortDescriptor.direction === "descending") {
          cmp *= -1;
        }
        return cmp;
      }),
    };
  };
  const list = useAsyncList({ load, sort });

  const headCells = useMemo(
    () => [
      {
        id: "komoditas",
        label: "Komoditas",
      },
      {
        id: "area_provinsi",
        label: "Provinsi",
      },
      {
        id: "area_kota",
        label: "Kota",
      },
      {
        id: "size",
        label: "Ukuran",
      },
      {
        id: "price",
        label: "Harga",
      },
      {
        id: "tgl_parsed",
        label: "Tanggal",
      },
      {
        id: "action",
        label: "Aksi",
      },
    ],
    []
  );

  const handleDelete = (id: string) => {
    deleteFishes(id);
  };

  return (
    <TableUi
      bordered
      color="primary"
      aria-label="table content"
      selectionMode="single"
      css={{
        height: "auto",
        minWidth: "100%",
        background: "white",
      }}
      sortDescriptor={list.sortDescriptor}
      onSortChange={list.sort}
    >
      <TableUi.Header>
        {headCells.map((value) => (
          <TableUi.Column allowsSorting key={value.id}>
            {value.label}
          </TableUi.Column>
        ))}
      </TableUi.Header>
      <TableUi.Body items={list.items} loadingState={list.loadingState}>
        {(item) => (
          <TableUi.Row key={item.uuid}>
            <TableUi.Cell>{item.komoditas}</TableUi.Cell>
            <TableUi.Cell>{item.area_provinsi}</TableUi.Cell>
            <TableUi.Cell>{item.area_kota}</TableUi.Cell>
            <TableUi.Cell>{item.size}</TableUi.Cell>
            <TableUi.Cell>{rupiahFormat(item.price)}</TableUi.Cell>
            <TableUi.Cell>{dateConvert(item.tgl_parsed)}</TableUi.Cell>
            <TableUi.Cell>
              <div className="tw-flex tw-w-full">
                <Button
                  color="success"
                  auto
                  flat
                  className="tw-mr-4"
                  onClick={() => handleUpdate(item)}
                >
                  <EditIcon size={20} fill="#0F9549" />
                </Button>
                <PopoverDelete onClick={() => handleDelete(item.uuid)} />
              </div>
            </TableUi.Cell>
          </TableUi.Row>
        )}
      </TableUi.Body>
      <TableUi.Pagination shadow noMargin align="center" rowsPerPage={10} />
    </TableUi>
  );
};

export default memo(Table);
