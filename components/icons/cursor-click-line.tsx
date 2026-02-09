const CursorClickLine = (props) => {
  const { width = 16, height = 16 } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
      {...props}
    >
      <path
        stroke="#57637B"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M8.533 8.533 7.466 11.2 5.333 5.333 11.2 7.466 8.533 8.533Zm0 0L11.2 11.2"
      />
      <path
        stroke="#57637B"
        strokeDasharray="2 2"
        strokeLinecap="round"
        strokeWidth={1.5}
        d="M4.667 1.333v13.333"
      />
    </svg>
  );
}

export default CursorClickLine;
