const Annotation = (props) => {
  const { color = "#CED4E0", width = 42, height = 42 } = props;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 42 42"
      fill="none"
      {...props}
    >
      <rect
        width={36}
        height={36}
        x={3.927}
        y={2}
        stroke={color}
        strokeWidth={4}
        rx={18}
      />
      <path
        fill={color}
        stroke={color}
        strokeWidth={1.3}
        d="M20.936 8.9c.346-.929 1.684-.911 1.995.045v.001l1.827 5.621v.001a2.358 2.358 0 0 0 2.24 1.626h5.912c1.023 0 1.452 1.311.622 1.915l-4.781 3.474a2.358 2.358 0 0 0-.908 2.456l.05.18 1.828 5.622c.316.972-.798 1.786-1.63 1.181L23.31 27.55v-.001a2.358 2.358 0 0 0-2.77 0l-4.782 3.474c-.828.602-1.944-.207-1.628-1.182l1.827-5.622a2.36 2.36 0 0 0-.857-2.636l-4.78-3.472c-.829-.603-.4-1.914.621-1.915h5.91a2.36 2.36 0 0 0 2.178-1.452l.065-.175 1.827-5.622.015-.048Z"
      />
      <path
        fill={color}
        d="M4.815 37.66a1 1 0 0 1-1.196-1.228l1.396-5.284a1 1 0 0 1 1.683-.442l3.923 4.029a1 1 0 0 1-.487 1.67l-5.319 1.256Z"
      />
    </svg>
  );
}
export default Annotation;
