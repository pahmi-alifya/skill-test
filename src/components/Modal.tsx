import React, { memo, useCallback, useEffect, useId, useState } from "react";
import { Modal as ModalUi, Button, Text, Input } from "@nextui-org/react";
import Dropdown from "./Dropdown";
import { useFishesStore } from "@/stores/fishes";
import moment from "moment";
import { TResFishesList } from "@/types";

type TModal = {
  initialValue: TResFishesList;
  visible: boolean;
  onClose: () => void;
  handleSubmit: (data: TResFishesList, isEdit: boolean) => void;
} & React.ComponentPropsWithoutRef<"div">;

const Modal = ({ visible, onClose, handleSubmit, initialValue }: TModal) => {
  const [komoditas, setKomoditas] = useState<string>("");
  const [province, setProvince] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [sizeArea, setSizeArea] = useState<string>("");
  const [price, setPrice] = useState<string>("");

  const { getProvinces, getCities, getSizeArea, size, provinces, cities } =
    useFishesStore((state) => state);

  useEffect(() => {
    setKomoditas(initialValue?.komoditas);
    setCity(initialValue?.area_kota);
    setPrice(initialValue?.price);
    setProvince(initialValue?.area_provinsi);
    setKomoditas(initialValue?.komoditas);
    setSizeArea(initialValue?.size);
  }, [initialValue]);

  useEffect(() => {
    getProvinces();
    getSizeArea();
  }, []);

  const handleChangeProvince = useCallback(
    (val: any) => {
      setProvince(Array.from(val).join(", "));
      getCities(Array.from(val).join(", "));
      setCity("");
    },
    [province]
  );

  const handleChangeCity = useCallback(
    (val: any) => {
      setCity(Array.from(val).join(", "));
    },
    [city]
  );

  const handleChangeSizeArea = useCallback(
    (val: any) => {
      setSizeArea(Array.from(val).join(", "));
    },
    [sizeArea]
  );

  const handleSubmitData = (e: any) => {
    e.preventDefault();

    const parsedDate = moment().format("YYYY-MM-DD") + "T00:00:00.000Z";

    if (!komoditas || !province || !city || !sizeArea || !price) {
      alert("Isi form yang lengkap");
      return false;
    }

    const data = {
      uuid: initialValue?.uuid || Math.random()?.toString(),
      komoditas: komoditas.toUpperCase(),
      area_provinsi: province,
      area_kota: city,
      size: sizeArea,
      price: price,
      tgl_parsed: parsedDate,
      timestamp: initialValue?.timestamp || moment().unix()?.toString(),
    };

    handleSubmit(data, !!initialValue);
    alert(initialValue ? "Data berhasil diubah" : "Data berhasil ditambah");

    setKomoditas("");
    setProvince("");
    setCity("");
    setPrice("");
    setKomoditas("");
    setSizeArea("");
  };

  useEffect(() => {
    return () => {
      setKomoditas("");
      setCity("");
      setProvince("");
      setPrice("");
      setKomoditas("");
      setSizeArea("");
    };
  }, [initialValue]);

  return (
    <ModalUi
      closeButton
      aria-labelledby="modal-title"
      open={visible}
      onClose={onClose}
    >
      <ModalUi.Header>
        <Text id="modal-title" size={18}>
          {`${initialValue ? "Ubah" : "Tambah"} Data`}
        </Text>
      </ModalUi.Header>
      <form onSubmit={handleSubmitData}>
        <ModalUi.Body>
          <Input
            bordered
            placeholder="Komoditas"
            color="default"
            value={komoditas}
            onChange={(e) => setKomoditas(e.target.value)}
            clearable
          />
          <Dropdown
            data={provinces}
            value={province || "Silahkan pilih provinsi"}
            color="default"
            handleChange={(val) => handleChangeProvince(val)}
            textColor="black"
          />
          <Dropdown
            data={cities}
            value={city || "Silahkan pilih Kota"}
            color="default"
            handleChange={(val) => handleChangeCity(val)}
            textColor="black"
          />
          <Dropdown
            data={size}
            value={sizeArea || "Silahkan pilih Area"}
            color="default"
            handleChange={(val) => handleChangeSizeArea(val)}
            textColor="black"
          />
          <Input
            bordered
            placeholder="Harga"
            color="default"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            type="number"
            clearable
          />
        </ModalUi.Body>
        <ModalUi.Footer>
          <Button auto color="success" type="submit">
            Simpan
          </Button>
        </ModalUi.Footer>
      </form>
    </ModalUi>
  );
};

export default memo(Modal);
