import "./Icon.scss";

function Icon({
  children,
  size = "normal",
  className = "",
  outlined = true,
}: {
    children: string;
  size?: "small" | "normal" | "large";
  className?: string;
  outlined?: boolean;
}) {
  if (!children) return null;
  let clsName = `material-icons icon icon-${size} ${className}`;
  if (outlined) clsName += " material-icons-outlined";
  return <span className={clsName}>{children}</span>;
}

export default Icon;
