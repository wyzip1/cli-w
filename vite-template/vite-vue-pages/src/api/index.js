import axios from "axios";

const baseUrl =
  process.env.NODE_ENV === "development" ? "/developmentApi" : "";
  console.log('baseUrl', baseUrl)
export default function request(paramsData) {
  const { url, method = "GET", data, ...rest } = paramsData;
  let params = {};
  if (method.toUpperCase() === "GET") {
    params = data;
  }
  return new Promise((resolve, reject) => {
    axios(
      {
        url: `${baseUrl}/${url}`.replace(/\/+/g, "/"),
        method,
        data,
        params,
        contentType: "application/json",
        ...rest,
      },
      {
        transformRequest() {},
      }
    )
      .then(res => {
        res.data.contentType = res.headers['content-type'];
        res.data.filename = res.headers['content-disposition']?.split(';').find(i => i.includes('filename')).split('=')[1]
        if (res.status === 200) {
          resolve(res.data);
        } else {
          reject(res);
        }
      })
      .catch(rej => {
        reject(rej);
      });
  });
}
