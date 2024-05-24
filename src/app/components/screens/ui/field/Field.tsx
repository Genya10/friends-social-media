import cn from "clsx";
import { Eye, EyeOff } from "lucide-react";
import { HTMLInputTypeAttribute, forwardRef, useState } from "react";
import { TypeInputProps } from "./field.types";
import cl from './Field.module.scss';

export const Field = forwardRef<HTMLInputElement, TypeInputProps>(
  ({ error, type: initialType, style, Icon, className, ...rest }, ref) => {

    return (
     <div className={cn(cl.field,className)} style={style}>
        {Icon && (
            <div className={cl.icon}>
                <Icon/>
            </div>
        )}
        <input ref={ref} {...rest}/>
       {error && <div className={cl.error}>{error.message}</div>}
     </div>
    )
  }
);

Field.displayName = "Field"