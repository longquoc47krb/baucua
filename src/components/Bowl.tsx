/* eslint-disable react-refresh/only-export-components */
import { LegacyRef, forwardRef } from "react"

function Bowl(ref: LegacyRef<HTMLImageElement> | undefined) {
    return (
        <img src="/images/bowl.png" className={`bowl circle close`} ref={ref} />
    )
}

export default forwardRef(Bowl); 