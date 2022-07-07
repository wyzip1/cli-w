import { useMemo } from "react";

export function guid() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function covertMoney(money, defaultValue = "-") {
  return typeof money !== "number" ? defaultValue : (money / 100).toFixed(2);
}

export const downloadBlob = data => {
  const blob = new Blob([data], { type: data.contentType });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.download = decodeURIComponent(data.filename);
  link.href = url;
  link.click();
  URL.revokeObjectURL(url);
  link.remove();
};

export const checkTimeMoreThenTreeMonth = (start, end) => {
  const startDate = start instanceof Date ? start : new Date(start);
  startDate.setMonth(startDate.getMonth() + 3);
  const maxTime = startDate.getTime();
  const endTime = (end instanceof Date ? end : new Date(end)).getTime();
  if (maxTime < endTime) return true;
  return false;
};

export const useDateRanger = (_dateList, month = 3) => {
  return useMemo(() => {
    const dateList = _dateList || [];
    let max, min;
    if (dateList[0]) {
      const date = new Date(dateList[0]);
      date.setMonth(date.getMonth() + month);
      max = date > Date.now() ? new Date() : date;
    } else max = new Date();
    if (dateList[1]) {
      const date = new Date(dateList[1]);
      date.setMonth(date.getMonth() - month);
      min = date;
    } else min = null;

    return [min, max];
  }, [_dateList, month]);
};
