import { useEffect } from 'react';

export function useTitle(title) {
  useEffect(() => {
    document.title = title ? `B2B Techlines - ${title}` : 'B2B Techlines';
  }, [title]);
};