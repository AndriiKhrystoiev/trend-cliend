const Calendar = (props) => {
  const { width = 14, height = 14 } = props;
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
        d="M4.333 3.667V1m5.334 2.667V1m-6 5.333h6.666m-8 6.667h9.334A1.334 1.334 0 0 0 13 11.667v-8a1.334 1.334 0 0 0-1.333-1.334H2.333A1.333 1.333 0 0 0 1 3.667v8A1.333 1.333 0 0 0 2.333 13Z"
      />
    </svg>
  );
}

export default Calendar;
