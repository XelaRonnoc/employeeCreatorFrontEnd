import { forwardRef, InputHTMLAttributes } from "react";
import {
    StyledInput,
    StyledRadio,
} from "../../StyledComponents/StyledForm/StyledForm";
import { FieldError } from "react-hook-form";
import { ErrorP } from "../../StyledComponents/StyledForm/StyledForm";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    error: FieldError | undefined;
}

const FullInput = forwardRef<HTMLInputElement, InputProps>(
    ({ error, ...rest }, ref) => {
        return (
            <div>
                <StyledInput
                    ref={ref}
                    error={Boolean(error?.message)}
                    {...rest}
                />
                {error?.message && <ErrorP>{error.message}</ErrorP>}
            </div>
        );
    }
);

export const FullRadio = forwardRef<HTMLInputElement, InputProps>(
    ({ error, ...rest }, ref) => {
        return (
            <div>
                <StyledRadio
                    ref={ref}
                    error={Boolean(error?.message)}
                    {...rest}
                />
                {error?.message && <ErrorP> {error.message}</ErrorP>}
            </div>
        );
    }
);

export default FullInput;
