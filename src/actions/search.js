import {
  SEARCHING,
} from "./types";

export const search = (data) => ({
  type: SEARCHING,
  ...data,
});