export function Logout({ width = 24, height = 24, color = '#686A6C', strokeWidth = '1.5' }) {
  return (
    <svg
      className="icon icon-tabler icon-tabler-logout"
      fill="none"
      width={width}
      height={height}
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M0 0h24v24H0z"
        fill="none"
        stroke="none"
      />
      <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
      <path d="M7 12h14l-3 -3m0 6l3 -3" />
    </svg>
  );
}
