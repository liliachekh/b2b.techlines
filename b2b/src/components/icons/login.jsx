import PropTypes from 'prop-types';

export function LogIn({ width = 24, height = 24, color = '#686A6C', strokeWidth = '1.5' }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14 4.00006C19.5 4.00006 20 5.00006 20 12.0001C20 19.0001 19.5 20.0001 14 20.0001"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4 12.0001L15 12.0001"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11 16.0001L15 12.0001L11 8.00006"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round" />
    </svg>
  );
}

LogIn.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  color: PropTypes.string,
  strokeWidth: PropTypes.string,
};

LogIn.defaultProps = {
  width: 24,
  height: 24,
  color: '#686A6C',
  strokeWidth: '1.5',
};
