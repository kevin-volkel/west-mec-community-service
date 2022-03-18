import axios from "axios";
import { baseURL } from "./auth";
import Cookies from "js-cookie";

const serviceAxios = axios.create({
  baseURL: `${baseURL}/api/v1/service`,
  headers: {
    Authorization: `Bearer ${Cookies.get("token")}`,
  },
});

export const createService = async (
  title,
  hours,
  description,
  picURL,
  setError
) => {
  try {
    const res = await serviceAxios.post("/", {
      title,
      hours,
      description,
      proof: picURL,
    });
  } catch (err) {
    console.error(err);
    setError(err);
  }
};

export const getServices = async (userId) => {
  try {
    const res = await serviceAxios.get("/");
    return res.data.services.filter((service) => service.user === userId);
  } catch (err) {
    console.error(err);
  }
};

export const deleteService = async (serviceId, setServices) => {
  try {
    const res = await serviceAxios.delete(`/${serviceId}`)
    setServices( (prev) => (
      prev.filter( (service) => service._id.toString() !== serviceId)
    ))
    return res.data;
  } catch (err) {
    console.error(err)
  }
};

export const updateApproval = async (serviceId, setServices, newValue) => {
  try {
    const res = await serviceAxios.patch(`/${serviceId}`, {reviewed: newValue})
    setServices( (prev) => (
      prev.map( (service) => {
        if(service._id === serviceId) {
          return res.data;
        }
        return service;
      })
    ))
    return res.data;
  } catch (err) {
    console.error(err)
  }
}