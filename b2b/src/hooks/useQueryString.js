import { useSearchParams } from "react-router-dom";

export function useQueryString() {
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get('search');
  const sort = searchParams.get('sort');
  const perPage = searchParams.get('perPage') || 25;
  const page = searchParams.get('startPage') || 1;
  const categories = searchParams.get('categories');
  const brand = searchParams.get('brand');

  return { categories, brand, search, sort, perPage, page, setSearchParams }
}