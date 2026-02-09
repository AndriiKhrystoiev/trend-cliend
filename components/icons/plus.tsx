const Plus = (props) => {
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
        strokeWidth={2}
        d="M8 4v4m0 0v4m0-4h4M8 8H4"
      />
    </svg>
  );
}
export default Plus;
