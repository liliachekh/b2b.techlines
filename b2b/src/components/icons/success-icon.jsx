import PropTypes from 'prop-types';

export function Success({ width = 100, height = 100, color = '#000000' }) {
  return (
    <svg
     fill={color}
     height={height}
     width={width}
     version="1.1"
     xmlns="http://www.w3.org/2000/svg"
	 viewBox="0 0 511.755 511.755"
     >
	<g>
	 <path d="M436.891,74.867c-99.819-99.819-262.208-99.819-362.027,0c-99.819,99.797-99.819,262.229,0,362.027
		c49.899,49.92,115.456,74.859,181.013,74.859s131.093-24.939,181.013-74.859C536.709,337.096,536.709,174.664,436.891,74.867z
		M398.96,185.629L249.627,334.963c-4.16,4.16-9.621,6.251-15.083,6.251c-5.461,0-10.923-2.091-15.083-6.251l-85.333-85.333
		c-8.341-8.341-8.341-21.824,0-30.165c8.341-8.341,21.824-8.341,30.165,0l70.251,70.251l134.251-134.251
		c8.341-8.341,21.824-8.341,30.165,0C407.301,163.805,407.301,177.288,398.96,185.629z"/>
	</g>
    </svg>
  );
}

Success.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  color: PropTypes.string,
};

Success.defaultProps = {
  width: 100,
  height: 100,
  color: '#000000',
};