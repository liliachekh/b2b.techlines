import PropTypes from 'prop-types';

export function ArrowRight({ width, height, color }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M3 12.0001H21'
        stroke={color}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M13 4.00006L21 12.0001L13 20.0001'
        stroke={color}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}

ArrowRight.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  color: PropTypes.string,
};

ArrowRight.defaultProps = {
  width: 24,
  height: 24,
  color: '#686A6C',
};
