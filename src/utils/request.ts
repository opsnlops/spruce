import axios, { AxiosResponse } from "axios";
import { getLoginDomain } from "./environmentalVariables";
import { reportError } from "./errorReporting";

type optionsType = {
  onFailure?: (e) => void;
  sameDomain?: boolean;
};

const defaultOptions: optionsType = {
  sameDomain: true,
};
export const post = async (url: string, body: unknown, opts?: optionsType) => {
  const options = { ...defaultOptions, ...opts };
  try {
    const baseDomain = options.sameDomain ? getLoginDomain() : "";
    const response = await axios.post(baseDomain + url, {
      body,
    });
    if (isBadResponse(response)) {
      throw new Error(getErrorMessage(response, "POST"));
    }
    return response;
  } catch (e) {
    if (options.onFailure) {
      options.onFailure(e);
    }
    handleError(e);
  }
};

export const get = async (url: string, opts?: optionsType) => {
  const options = { ...defaultOptions, ...opts };
  try {
    const baseDomain = options.sameDomain ? getLoginDomain() : "";
    const response = await axios.get(baseDomain + url);
    if (isBadResponse(response)) {
      throw new Error(getErrorMessage(response, "GET"));
    }
    return response;
  } catch (e) {
    if (options.onFailure) {
      options.onFailure(e);
    }
    handleError(e);
  }
};

const isBadResponse = (response: AxiosResponse) =>
  !response || (response && response.statusText !== "OK");

type responseType = {
  status: number;
  statusText: string;
};
const getErrorMessage = (response: responseType, method: string) =>
  response
    ? `${method} Error: ${response.status} - ${response.statusText}`
    : `${method} Error: Did not receive a response from the server`;

const handleError = (error: string) => {
  reportError(error).warning();
};
