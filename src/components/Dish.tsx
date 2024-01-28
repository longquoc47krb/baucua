/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */
import { LegacyRef, forwardRef } from 'react';

const Dish = (props, ref: LegacyRef<HTMLImageElement> | any) => {
    return (
        <img ref={ref} src="/images/dish.png" className={`dish circle`} />
    )
}

export default forwardRef(Dish)