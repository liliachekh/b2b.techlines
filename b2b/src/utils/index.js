import { baseUrl } from "./vars";

export const scrollToTop = (e) => {
  !e?.ctrlKey && window.scrollTo({ top: 0, behavior: 'smooth' });
};

export const scrollToRef = (ref) => {
  ref.current.scrollIntoView({ block: "start", behavior: "smooth" })
};

export async function fetchData(url, reqBody) {
  try {
    const response = await fetch(url, reqBody);
    if (!response.ok) {
      // handleError(response, 401);
      const error = await response.json();
      throw new Error(error?.loginOrEmail || error?.password || error?.message || error?.email || error);
    }
    return await response.json();
  } catch (error) {
    throw new Error(error?.message);
  }
}

export function areObjectsEqual(obj1, obj2) {
  if (typeof obj1 !== 'object' || typeof obj2 !== 'object') {
    return false;
  }

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (const key of keys1) {
    if (obj1[key] !== obj2[key]) {
      return false;
    }
  }

  return true;
}

export async function deleteDiscountCode(code) {
  await fetch(`${baseUrl}discounts/${code}`, {
    method: 'PUT',
    credentials: 'include',
  });
}