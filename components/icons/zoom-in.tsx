const ZoomIn = (props) => {
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
        d="M4 6.4a.8.8 0 0 1 .8-.8h.8v-.8a.8.8 0 0 1 1.6 0v.8H8a.8.8 0 0 1 0 1.6h-.8V8a.8.8 0 0 1-1.6 0v-.8h-.8a.8.8 0 0 1-.8-.8Z"
      />
      <path
        fill="#57637B"
        fillRule="evenodd"
        d="M1.6 6.4a4.8 4.8 0 1 1 8.712 2.78l3.854 3.854a.8.8 0 0 1-1.132 1.132l-3.852-3.853A4.8 4.8 0 0 1 1.6 6.4Zm4.8-3.2a3.2 3.2 0 1 0 0 6.4 3.2 3.2 0 0 0 0-6.4Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export default ZoomIn;
