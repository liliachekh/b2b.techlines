import PropTypes from 'prop-types';

export function Account({ width = 24, height = 24, color = '#686A6C', strokeWidth = '1.5' }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15 17.9167C15 19.1912 12 20.0001 9 20.0001C5.5 20.0001 3 19.1912 3 17.9167C3 16.0578 6 15.0001 9 15.0001C12 15.0001 15 16.2501 15 17.9167Z"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 12.0001C11.2091 12.0001 13 10.2092 13 8.00006C13 5.79092 11.2091 4.00006 9 4.00006C6.79086 4.00006 5 5.79092 5 8.00006C5 10.2092 6.79086 12.0001 9 12.0001Z"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

Account.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  color: PropTypes.string,
  strokeWidth: PropTypes.string,
};

Account.defaultProps = {
  width: 24,
  height: 24,
  color: '#686A6C',
  strokeWidth: '1.5',
};