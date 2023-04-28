import React, { useCallback, useEffect, useState } from "react";
import { Button } from "@nextui-org/react";

import { Filter, Modal, PlusIcon, Table } from "@/components";
import { useFishesStore } from "@/stores/fishes";
import { TResFishesList } from "@/types";

export default function Home() {
  const { getFishes, postFishes } = useFishesStore((state) => state);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    getFishes();
  }, []);

  const handleShowModal = useCallback(() => {
    setIsVisible(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsVisible(false);
    setData(null);
  }, []);

  const handleUpdate = (data: TResFishesList) => {
    handleShowModal();
    setData(data);
  };

  const handleSubmit = (data: TResFishesList, isEdit: boolean) => {
    handleCloseModal();

    postFishes(data, isEdit);
  };

  return (
    <main className="tw-min-h-screen tw-flex-col tw-p-16">
      <div className="lg:tw-flex tw-justify-between">
        <h1 className="tw-text-4xl tw-font-extrabold tw-leading-none tw-tracking-tight tw-text-gray-900 md:tw-text-5xl lg:tw-text-6xl dark:tw-text-white tw-mb-5">
          eFishery
        </h1>
        <div className="tw-self-center tw-flex">
          <Filter />
          <Button
            color="primary"
            auto
            ghost
            className="tw-ml-2"
            onClick={handleShowModal}
          >
            <PlusIcon size={20} fill="#fff" />
          </Button>
        </div>
      </div>
      <Table handleUpdate={handleUpdate} />
      <Modal
        initialValue={data}
        visible={isVisible}
        onClose={handleCloseModal}
        handleSubmit={handleSubmit}
      />
    </main>
  );
}
