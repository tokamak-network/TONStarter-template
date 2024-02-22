function HeadTitle(props: { title: string; style?: React.CSSProperties }) {
  const { title, style } = props;
  const formattedTitle = title.charAt(0).toUpperCase() + title.slice(1);
  return <h1 style={{ fontSize: 60, ...style }}>{formattedTitle}</h1>;
}

export default HeadTitle;
