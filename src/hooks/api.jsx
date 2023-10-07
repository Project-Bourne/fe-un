/**
 * Object Request Header
 */
import { Cookies } from "react-cookie";
const cookies = new Cookies();
let access = "";
if (typeof window !== "undefined") {
  access =
    cookies.get("deep-access") ||
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImEwMTU0ODcwLWVhYjgtNGQyMy1hYjk2LWNkMDk5YjRmYmU5MyIsInJvbGUiOiI0IiwiaWF0IjoxNjk1NzQxMTAwLCJleHAiOjE2OTU4Mjc1MDB9.RCAnoAu0yR9mzKwyMoxtkSdriMXmIsSlz1bgXtdUlbg";
}
export const requestHeader = {
  Accept: "application/json",
  "Cache-Control": "no-cache",
  "Content-Type": "application/json",
  "deep-token": access,
};

/**
 *
 * @param {string} url
 * @param {string, [GET, POST, PATCH, PUT...]} method
 * @param {payload} payload
 * @param {boolean} token
 * @param {boolean} text
 * @param {boolean} form
 * @returns Response Data;
 */

const API_USER_URL = "http://192.81.213.226:81/86/api/v1/";

export async function request(url, method, payload, token, text, form) {
  requestHeader["Content-Type"] =
    form === true ? "multipart/form-data" : "application/json";

  if (method === "GET") {
    return fetch(API_USER_URL + url, {
      method,
      headers: Object.assign(requestHeader),
    })
      .then((res) => {
        if (
          res.status === 403 &&
          res.message === "Access Denied: Invalid Token"
        ) {
          // Token is invalid, remove it from client-side storage
          removeAuthToken(); // Replace with your logic to remove the token
          // Redirect to the home page if needed
          router.push("/");
          return Promise.reject("Invalid Token");
        }
        if (text === true) {
          return res.text();
        } else if (res) {
          return res.json();
        } else {
          return res.json();
        }
      })
      .catch((err) => {
        console.error(`Request Error ${url}: `, err);
        return err;
      });
  } else {
    return fetch(API_USER_URL + url, {
      method,
      headers: Object.assign(requestHeader),
      body: form === true ? payload : JSON.stringify(payload),
    })
      .then((res) => {
        if (text === true) {
          return res.text();
        } else if (res) {
          return res.json();
        } else {
          return res.json();
        }
      })
      .catch((err) => {
        console.error(`Request Error ${url}: `, err);
      });
  }
}

const API_USER_URL2 = "http://192.81.213.226:81/80/";
export async function request2(url, method, payload, token, text, form) {
  requestHeader["Content-Type"] =
    form === true ? "multipart/form-data" : "application/json";

  if (method === "GET") {
    return fetch(API_USER_URL2 + url, {
      method,
      headers: Object.assign(requestHeader),
    })
      .then((res) => {
        if (
          res.status === 403 &&
          res.message === "Access Denied: Invalid Token"
        ) {
          // Token is invalid, remove it from client-side storage
          removeAuthToken(); // Replace with your logic to remove the token
          // Redirect to the home page if needed
          router.push("/");
          return Promise.reject("Invalid Token");
        }
        if (text === true) {
          return res.text();
        } else if (res) {
          return res.json();
        } else {
          return res.json();
        }
      })
      .catch((err) => {
        console.error(`Request Error ${url}: `, err);
        return err;
      });
  } else {
    return fetch(API_USER_URL2 + url, {
      method,
      headers: Object.assign(requestHeader),
      body: form === true ? payload : JSON.stringify(payload),
    })
      .then((res) => {
        if (text === true) {
          return res.text();
        } else if (res) {
          return res.json();
        } else {
          return res.json();
        }
      })
      .catch((err) => {
        console.error(`Request Error ${url}: `, err);
        // throw new Error(err);
        return err;
      });
  }
}
