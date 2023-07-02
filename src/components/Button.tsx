import "./Button.scss";

function Button({
  theme = "light",
  circle = false,
  className = "",
  tooltip,
  ariaLabel,
  children,
  uppercase = false,
  resizable = false,
  neon = false,
  ...otherProps
}: {
  theme?: "light" | "dark";
  circle?: boolean;
  children: React.ReactNode;
  tooltip?: string;
  ariaLabel?: string;
  className?: string;
  uppercase?: boolean;
  resizable?: boolean;
  neon?: boolean;
  [key: string]: any;
}) {
  let builtClassName = "btn shadow-2 " + className;
  if (theme === "dark") builtClassName += " btn-dark";
  else if (theme === "light") builtClassName += " btn-light";
  if (circle) builtClassName += " btn-circle";
  if (neon) builtClassName += " neon";
  if (uppercase) builtClassName += " text-uppercase";
  if (resizable) builtClassName += " btn-resizable";
  return (
    <button
      className={builtClassName}
      title={tooltip}
      role="button"
      aria-label={ariaLabel}
      {...otherProps}
    >
      {children}
    </button>
  );
}
export default Button;
