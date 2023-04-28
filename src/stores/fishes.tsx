import { TResArea, TResFishesList, TResSize } from "@/types";
import api from "@/utils/api";
import { create } from "zustand";
import uniq from "lodash/uniq";

type TFishes = {
  fishes: TResFishesList[];
  tempFishes: TResFishesList[];
  area: TResArea[];
  provinces: {
    key?: string;
    value?: string;
  }[];
  cities: TResArea[];
  size: TResSize[];
  loading: boolean;
  loadItem: boolean;
  postFishes: (data: TResFishesList, isEdit: boolean) => void;
  getFishes: () => void;
  getProvinces: () => void;
  getSizeArea: () => void;
  getCities: (label: string) => void;
  getFishesFilter: (label: string, type: string) => void;
  deleteFishes: (id: string) => void;
};

export const useFishesStore = create<TFishes>()((set, get) => ({
  fishes: [],
  tempFishes: [],
  provinces: [],
  cities: [],
  area: [],
  size: [],
  loading: false,
  loadItem: false,
  getFishes: () =>
    new Promise((resolve, reject) => {
      try {
        set({ loading: true });
        api.get<TResFishesList[]>(`list`).then((response) => {
          if (response.status === 200) {
            const data = response.data.filter((val) => val.uuid);
            set({ fishes: data, tempFishes: data });
          } else {
            set({ fishes: [], tempFishes: [] });
          }
          set({ loading: false });
        });
      } catch (error) {
        set({ loading: false, fishes: [], tempFishes: [] });
        reject(error);
      }
    }),
  getSizeArea: () =>
    new Promise((resolve, reject) => {
      try {
        set({ loadItem: true });
        api.get<TResSize[]>(`option_size`).then((response) => {
          if (response.status === 200) {
            let size = response.data;
            size.map(
              (item, index) => (
                (size[index].label = item.size), (size[index].value = item.size)
              )
            );

            set({ size });
          } else {
            set({ size: [] });
          }
          set({ loadItem: true });
        });
      } catch (error) {
        set({ loadItem: true, size: [] });
        reject(error);
      }
    }),
  getProvinces: () =>
    new Promise((resolve, reject) => {
      try {
        set({ loadItem: true });
        api.get<TResArea[]>(`option_area`).then((response) => {
          if (response.status === 200) {
            const provinces = uniq(
              response.data.map((item) => item.province)
            ).map((i) => ({
              key: i,
              value: i,
            }));
            set({ provinces: provinces, area: response.data });
          } else {
            set({ provinces: [], area: [] });
          }
          set({ loadItem: false });
        });
      } catch (error) {
        set({ provinces: [], area: [], loading: false });
        reject(error);
      }
    }),
  getFishesFilter: (val: string, type: string = "komoditas") => {
    if (!val) return set({ fishes: get().tempFishes });
    set({
      fishes: get().fishes.filter((item) => item[type] === val?.toUpperCase()),
    });
  },
  getCities: (label: string) => {
    let cities = get().area.filter((i) => i.province === label && i.city);
    cities.map(
      (val, index) => (
        (cities[index].label = val.city), (cities[index].value = val.city)
      )
    );

    set({ cities: cities });
  },
  deleteFishes: (id: string) => {
    set({ fishes: get().fishes.filter((i) => i.uuid !== id) });
  },
  postFishes: (data, isEdit) => {
    if (isEdit) {
      const item = get().fishes.map((val) => {
        if (val.uuid === data.uuid) {
          return { ...data, ...data };
        }
        return val;
      });
      return set({ fishes: item });
    }

    set({ fishes: [...get().fishes, data] });
  },
}));
