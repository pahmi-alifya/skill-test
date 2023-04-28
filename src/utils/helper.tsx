import moment from "moment";

export function dateConvert(date: string, format: string = "DD MMM YYYY") {
  return moment(date).format(format);
}

export function rupiahFormat(num: string) {
  if (!num) {
    return 0;
  }
  return "Rp. " + num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
}
