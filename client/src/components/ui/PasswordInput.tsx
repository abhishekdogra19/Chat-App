import * as React from "react";
import { RxEyeClosed, RxEyeOpen } from "react-icons/rx";
import { Input } from "./input";

export interface PasswordInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);
    return (
      <Input
        className={className}
        {...props}
        ref={ref}
        type={showPassword ? "text" : "password"}
        suffix={
          showPassword ? (
            <RxEyeClosed
              className="select-none"
              onClick={() => setShowPassword(false)}
              size={25}
            />
          ) : (
            <RxEyeOpen
              className="select-none"
              onClick={() => setShowPassword(true)}
              size={25}
            />
          )
        }
      />
    );
  }
);
PasswordInput.displayName = "Input";

export { PasswordInput };
