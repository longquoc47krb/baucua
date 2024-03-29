/* eslint-disable react-refresh/only-export-components */
import { LegacyRef, forwardRef } from "react"
interface BowlProps {
    transparent: boolean;
}
function Bowl({ transparent }: BowlProps, ref: LegacyRef<HTMLImageElement> | undefined) {
    return (
        <img src="/images/bowl.png" className={`bowl circle close`} ref={ref} style={{ opacity: transparent ? 0.5 : 1 }} />
    )
}

export default forwardRef(Bowl); 