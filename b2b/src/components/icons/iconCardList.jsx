import PropTypes from 'prop-types';

export function IconCardList({ height, width, fill }) {
  return (
    <svg fill={fill} width={width} height={height} viewBox="0 0 52 52" >
      <path d="M14.5,4h-9C4.7,4,4,4.7,4,5.5v17C4,23.3,4.7,24,5.5,24h9c0.8,0,1.5-0.7,1.5-1.5v-17C16,4.7,15.3,4,14.5,4z"
      />
      <path d="M30.5,4h-9C20.7,4,20,4.7,20,5.5v17c0,0.8,0.7,1.5,1.5,1.5h9c0.8,0,1.5-0.7,1.5-1.5v-17
	C32,4.7,31.3,4,30.5,4z"/>
      <path d="M46.5,4h-9C36.7,4,36,4.7,36,5.5v17c0,0.8,0.7,1.5,1.5,1.5h9c0.8,0,1.5-0.7,1.5-1.5v-17
	C48,4.7,47.3,4,46.5,4z"/>
      <path d="M14.5,28h-9C4.7,28,4,28.7,4,29.5v17C4,47.3,4.7,48,5.5,48h9c0.8,0,1.5-0.7,1.5-1.5v-17
	C16,28.7,15.3,28,14.5,28z"/>
      <path d="M30.5,28h-9c-0.8,0-1.5,0.7-1.5,1.5v17c0,0.8,0.7,1.5,1.5,1.5h9c0.8,0,1.5-0.7,1.5-1.5v-17
	C32,28.7,31.3,28,30.5,28z"/>
      <path d="M46.5,28h-9c-0.8,0-1.5,0.7-1.5,1.5v17c0,0.8,0.7,1.5,1.5,1.5h9c0.8,0,1.5-0.7,1.5-1.5v-17
	C48,28.7,47.3,28,46.5,28z"/>
    </svg>
  );
}

IconCardList.defaultProps = {
  height: 16,
  width: 19,
  fill: '#f7fbfa',
};

IconCardList.propTypes = {
  height: PropTypes.number,
  width: PropTypes.number,
  fill: PropTypes.string,
};