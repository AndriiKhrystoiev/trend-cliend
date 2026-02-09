const ChartPie = (props) => {
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
        d="M4.262 3.306a6 6 0 0 1 3.071-1.27v6.63h6.63a6 6 0 1 1-9.701-5.36Z"
      />
      <path
        stroke="#57637B"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M10 6h3.659A6.017 6.017 0 0 0 10 2.341V6Z"
      />
    </svg>
  );
}
export default ChartPie;
