import { useState, useEffect } from "react";
import axios from "axios";

export const useAxios = () => {
  const baseUrl =
    (process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000") + "/api";
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const get = async (url) => {
    try {
      setLoading(true);
      const response = await axios.get(`${baseUrl}${url}`);
      setData(response.data);
      return response;
    } catch (err) {
      setError(err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const post = async (url, body) => {
    try {
      setLoading(true);
      const response = await axios.post(`${baseUrl}${url}`, body);
      setData(response.data);
      return response;
    } catch (err) {
      setError(err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const patch = async (url, body) => {
    try {
      setLoading(true);
      const response = await axios.patch(`${baseUrl}${url}`, body);
      setData(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const remove = async (url) => {
    try {
      setLoading(true);
      const response = await axios.delete(`${baseUrl}${url}`);
      setData(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, get, post, patch, remove };
};
