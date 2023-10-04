import { Helmet } from 'react-helmet-async';

export function Title({ title }) {

  return (
    <Helmet>
      {title
        ? <title>{`Teclines${' - ' + title}`}</title>
        : <title>{`B2B Teclines`}</title>}
    </Helmet>
  );
}