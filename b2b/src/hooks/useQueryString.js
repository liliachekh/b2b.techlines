import { useSearchParams } from "react-router-dom";

export function useQueryString() {
  const [searchParams, setSearchParams] = useSearchParams();
  
  let params = [...searchParams.entries()]
    .map(([key, value]) => ({ [key]: value }))
    .reduce((acc, cur) => ({ ...acc, ...cur }), []);

  const perPage = searchParams.get('perPage') || 25;
  const startPage = searchParams.get('startPage') || 1;

  params = { ...params, perPage, startPage }

  return { params, setSearchParams }
}