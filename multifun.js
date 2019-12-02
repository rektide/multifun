"use module"
import Phases from "./phases.js"

export function Multifun( fn, phases= Phases){
	const
	  name= typeof fn=== "string"? fn: fn&& fn.name|| "multifunc"
	  fn= ({ [ name]: function( ...args){
		const ctx= {
			args: args,
			multifun: fn,
			output: undefined,
			fault: undefined
		}
		for( const let i= 0; i< phases.length; ++i){
			phases.call( ctx, ...args)
			if( ctx.fault){
				throw ctx.fault
			}
		}
		return ctx.output
	  })[ name]
	fn.phases= phases
	
	return fn
}
