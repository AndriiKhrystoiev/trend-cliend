const Maximize = (props) => {
  const { width = 16, height = 16 } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
      {...props}
    >
      <mask id="a" fill="#fff">
        <rect width={13.6} height={13.6} x={1.6} y={1.6} rx={1} />
      </mask>
      <rect
        width={13.6}
        height={13.6}
        x={1.6}
        y={1.6}
        stroke="#57637B"
        strokeDasharray="4 4"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={4}
        mask="url(#a)"
        rx={1}
      />
      <path
        fill="#57637B"
        fillRule="evenodd"
        d="M4.8 7.003a3.002 3.002 0 1 1 5.45 1.739l2.41 2.41a.5.5 0 0 1-.708.708l-2.41-2.41A3.002 3.002 0 0 1 4.8 7.003ZM7.802 5a2.002 2.002 0 1 0 0 4.003 2.002 2.002 0 0 0 0-4.003Z"
        clipRule="evenodd"
      />
      <path
        fill="#fff"
        d="M7.802 5.001a2.002 2.002 0 1 0 0 4.003 2.002 2.002 0 0 0 0-4.003Z"
      />
      <path
        fill="#57637B"
        d="M6.59 7.074a.4.4 0 0 1 .4-.4h.4v-.4a.4.4 0 1 1 .8 0v.4h.4a.4.4 0 1 1 0 .8h-.4v.4a.4.4 0 1 1-.8 0v-.4h-.4a.4.4 0 0 1-.4-.4Z"
      />
    </svg>
  );
}

export default Maximize;
