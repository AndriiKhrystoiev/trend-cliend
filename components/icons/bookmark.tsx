const Bookmark = (props) => {
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
        d="M10.667 2.667v8L8 9.332l-2.667 1.333v-8h5.334ZM4 13.332h8A1.333 1.333 0 0 0 13.333 12V4A1.333 1.333 0 0 0 12 2.667H4A1.333 1.333 0 0 0 2.667 4v8A1.333 1.333 0 0 0 4 13.333Z"
      />
    </svg>
  );
}

export default Bookmark;
