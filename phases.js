"use module"
import PhasedRun from "phased-run"

export const phaseNames= [ "guard", "run"]

export const phases= new PhasedRun( phaseNames)
export default phases
