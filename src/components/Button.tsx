import "./Button.scss";

function Button({
  theme = "light",
  circle = false,
  className = "",
  tooltip,
  children,
  uppercase = false,
  ...otherProps
}: {
  theme?: string;
  circle?: boolean;
  children: React.ReactNode;
  tooltip?: string;
  ariaLabel?: string;
  className?: string;
  onClick?: () => void;
  uppercase?: boolean;
}) {
  let builtClassName = "btn shadow-2 " + className;
  if (theme === "dark") builtClassName += " btn-dark";
  else if (theme === "light") builtClassName += " btn-light";
  if (circle) builtClassName += " btn-circle";
  if (uppercase) builtClassName += " text-uppercase";
  return (
    <button className={builtClassName} title={tooltip} role="button" {...otherProps}>
      {children}
    </button>
  );
}
export default Button;
