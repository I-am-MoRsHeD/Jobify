import useAxiosPrivate from "../../hooks/useAxiosPrivate";

// eslint-disable-next-line react-hooks/rules-of-hooks
const axiosPrivate = useAxiosPrivate();

export const clearToken = async () => {
  const { data } = await axiosPrivate.get("/auth/logout");
  console.log("Token clear ------> ", data);
  return data;
};

// get token from the server
export const getToken = async (email) => {
  const { data } = await axiosPrivate.post("/auth/jwt", { email });
  // console.log(data);
  console.log("Token recived from the server ------> ", data);
  return data;
};
