import { useEffect } from 'react';

export function useTitle(title) {
  useEffect(() => {
    document.title = title ? `Teclines - ${title}` : 'B2B Teclines';
  }, [title]);
};