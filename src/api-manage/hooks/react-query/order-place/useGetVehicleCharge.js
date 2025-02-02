import { useQuery } from "react-query";
import MainApi from "../../../MainApi";
import { onSingleErrorResponse } from "../../../api-error-response/ErrorResponses";

const getData = async (pageParams) => {
  const { tempDistance, tempWeight } = pageParams;
  console.log(tempWeight);
  if (tempDistance === 0 || tempDistance) {
    const { data } = await MainApi.get(
      `/api/v1/vehicle/extra_charge?distance=${tempDistance}&weight=${tempWeight}`
    );
    return data;
  }
};

export default function useGetVehicleCharge(pageParams) {
  return useQuery("vehicle", () => getData(pageParams), {
    enabled: false,
    onError: onSingleErrorResponse,
  });
}
