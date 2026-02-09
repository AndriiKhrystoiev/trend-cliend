const Eye = (props) => {
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
        fill="#57637B"
        stroke="#57637B"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9.414 9.414a2 2 0 1 0-2.828-2.828 2 2 0 0 0 2.828 2.828Z"
      />
      <path
        stroke="#57637B"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M1.639 8A6.67 6.67 0 0 1 14.36 8 6.67 6.67 0 0 1 1.64 8Z"
      />
    </svg>
  );
}
export default Eye;
