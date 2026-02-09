const CursorClick = (props) => {
  const { width = 16, height = 16 } = props;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
      {...props}
    >
      <g
        stroke="#57637B"
        strokeLinecap="round"
        strokeWidth={1.5}
        clipPath="url(#a)"
      >
        <path strokeDasharray="2 2" d="M7 1.333v13.334M14.667 7H1.334" />
        <path
          strokeLinejoin="round"
          d="m12.2 12.2-1.067 2.667L9 9l5.867 2.133L12.2 12.2Zm0 0 2.667 2.667"
        />
      </g>
      <defs>
        <clipPath id="a">
          <rect width={16} height={16} fill="#fff" rx={2} />
        </clipPath>
      </defs>
    </svg>
  );
}
export default CursorClick;
