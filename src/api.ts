import axios from "axios";
import { User, UserListItem } from "./interfaces";

const instance = axios.create({
  baseURL: "https://api.github.com",
  headers: {
    Authorization: "Bearer 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",
  }
});

export const getUser = async (username: string): Promise<User> => {
  const response = await instance.get(`/users/${username}`);
  return response.data;
};

export const getUsers = async (
  search: string,
  perPage?: number,
  page?: number
): Promise<{
  total_count: number;
  items: User[];
  incomplete_results: boolean;
}> => {
  const perPageQuery = perPage ? `&per_page=${perPage}` : "";
  const pageQuery = page ? `&page=${page}` : "";

  const response = await instance.get(
    `/search/users?q=${search}${perPageQuery}${pageQuery}`
  );

  const promises = response.data.items.map(({ login} : UserListItem) => getUser(login));
  const users = await Promise.all(promises);
  return {
    ...response.data,
    items: users,
  };
};
