export type TResFishesList = {
  uuid: string,
  komoditas: string,
  area_provinsi: string,
  area_kota: string,
  size: string,
  price: string,
  tgl_parsed: string,
  timestamp: string,
}

export type TResArea = {
  province?: string,
  city?: string,
  label?: string,
  value?: string,
}

export type TResSize = {
  size: string,
  label?: string,
  value?: string,
}