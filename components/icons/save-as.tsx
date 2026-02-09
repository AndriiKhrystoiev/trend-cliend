const SaveAs = (props) => {
  const { width = 14, height = 13 } = props;
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
        d="M10.083 9.417v1.333a1.333 1.333 0 0 1-1.333 1.333H2.083A1.333 1.333 0 0 1 .75 10.75V6.083A1.333 1.333 0 0 1 2.083 4.75h1.334m2-2.667H4.75a1.333 1.333 0 0 0-1.333 1.334v4.666A1.333 1.333 0 0 0 4.75 9.417h6.667a1.333 1.333 0 0 0 1.333-1.334V3.417a1.334 1.334 0 0 0-1.333-1.334h-.667m-.667 2.667-2 2m0 0-2-2m2 2v-6"
      />
    </svg>
  );
}

export default SaveAs;
