const DocumentText = (props) => {
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
        d="M6 8h4m-4 2.667h4M11.333 14H4.667a1.334 1.334 0 0 1-1.334-1.333V3.333A1.333 1.333 0 0 1 4.667 2H8.39c.176 0 .346.07.471.195l3.61 3.61a.667.667 0 0 1 .195.471v6.39A1.333 1.333 0 0 1 11.333 14Z"
      />
    </svg>
  );
}
export default DocumentText;
