const Clock = (props) => {
  const { color = "#192B9D", width = 12, height = 12 } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
      {...props}
    >
      <path
        fill={color}
        fillRule="evenodd"
        d="M5.6 11.2A5.6 5.6 0 1 0 5.6 0a5.6 5.6 0 0 0 0 11.2Zm.7-8.4a.7.7 0 1 0-1.4 0v2.8a.7.7 0 0 0 .205.495l1.98 1.98a.7.7 0 0 0 .99-.99L6.3 5.31V2.8Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export default Clock;
