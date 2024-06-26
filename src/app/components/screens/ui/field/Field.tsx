import cn from "clsx";
import { forwardRef } from "react";
import { TypeInputProps } from "./field.types";
import cl from './Field.module.scss';

export const Field = forwardRef<HTMLInputElement, TypeInputProps>(
  ({ error, style, Icon, className, ...rest }, ref) => {

    return (
     <label className={cn(cl.field,className)} style={style}>
        {Icon && (
            <div className={cl.icon}>
                <Icon/>
            </div>
        )}
        <input ref={ref} {...rest}/>
       {error && <div className={cl.error}>{error.message}</div>}
     </label>
    )
  }
);

Field.displayName = "Field"
export default Field