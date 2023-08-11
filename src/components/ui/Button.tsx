// Assuming your existing ButtonModel interface looks like this:
interface ButtonModel {
  value: React.ReactNode;
  type?: "submit" | "button" | "reset";
  onClick?: () => void;
  background: string;
  classNameStyle: string;
  size?: "sm" | "md" | "lg" | "xl";
}

// Add the `disabled` prop to the ButtonModel interface:
interface ButtonModelWithDisabled extends ButtonModel {
  disabled?: boolean;
}

// Update the Button component:
function Button(props: ButtonModelWithDisabled) {
  const { value, type, onClick, background, classNameStyle, size, disabled } =
    props;

  const btnSize = () => {
    if (size === "sm") return "25%";
    if (size === "md") return "50%";
    if (size === "lg") return "75%";
    if (size === "xl") return "100%";
  };

  return (
    <button
      className={`rounded-md ${classNameStyle} ${background} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
      style={{ width: `${btnSize()}` }}
      type={type}
      onClick={!disabled ? onClick : undefined}
      disabled={disabled}
    >
      {value}
    </button>
  );
}

export default Button;
