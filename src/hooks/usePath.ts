import axios from "axios";
import { Status } from "../types/Status";
import { useState } from "react";
import { SuccessResult } from "../types/PathDetails";
import { formatCoordinates } from "../utils/formatUtils";

export const useFetchPath = () => {
  const [error, setError] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [result, setResult] = useState<SuccessResult | null>(null);

  const getPath = async (token: string) => {
    try {
      const response = await axios.get(
        "https://sg-mock-api.lalamove.com/route/:" + token
      );

      if (response.data.status === Status.IN_PROGRESS) {
        setTimeout(() => {
          getPath(token);
        }, 1000);
        return;
      }
      if (response.data.status === Status.FAILURE) {
        setError(response.data.error);
      }

      if (response.data.status === Status.SUCCESS) {
        const { path, total_distance, total_time } = response.data;
        setResult({
          path: formatCoordinates(path),
          distance: total_distance,
          time: total_time,
        });
      }
      setIsLoading(false);
    } catch (error) {
      setError("An error occurred.Please try again.");
      setIsLoading(false);
    }
  };

  const handleLocationSearch = async (
    pickUpLocation: string,
    dropLocation: string
  ) => {
    setError("");
    setResult(null);
    setIsLoading(true);
    const requestBody = {
      origin: pickUpLocation,
      destination: dropLocation,
    };
    try {
      const {
        data: { token },
      } = await axios.post<{ token: string }>(
        "https://sg-mock-api.lalamove.com/route",
        requestBody
      );
      getPath(token);
    } catch (error) {
      setError("An error occurred.Please try again.");
      setIsLoading(false);
    }
  };

  const reset = () => {
    setError("");
    setResult(null);
    setIsLoading(false);
  };

  return { error, isLoading, result, handleLocationSearch, reset };
};
