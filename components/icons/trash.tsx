const Trash = (props) => {
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
        d="M6.667 7.333v4m2.666-4v4M2.667 4.667h10.666m-.666 0-.578 8.094A1.334 1.334 0 0 1 10.759 14H5.24a1.334 1.334 0 0 1-1.33-1.239l-.578-8.094h9.334Zm-2.667 0v-2A.667.667 0 0 0 9.333 2H6.667A.667.667 0 0 0 6 2.667v2h4Z"
      />
    </svg>
  );
}
export default Trash;
