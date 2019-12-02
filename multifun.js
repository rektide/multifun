"use module"
import Phases from "./phases.js"

function syncCall( phase, ctx){
	
}

async function syncCall( phase, ctx){
}

export function Multifun( fn, opts= {}){
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
			let val= phases.call( ctx, ...args)
			if( fn.async){
				try{
					val= await val
				}catch( fault){
					ctx.fault= fault
				}
			}
			if( ctx.fault){
				throw ctx.fault
			}
		}
		return ctx.output
	  })[ name]
	fn.phases= opts.phases|| Phases
	fn.async= opts.async|| false
	
	return fn
}
