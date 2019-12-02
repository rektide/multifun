"use module"
import Phases from "./phases.js"

function syncCall( phase, ctx){
	
}

async function asyncCall( phase, ctx){
	let val= phase.call( ctx, ...args)
	try{
		val= await val
	}catch( fault){
		ctx.fault= fault
	}
	if( ctx.fault){
		throw ctx.fault
	}
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
		}
		return ctx.output
	  })[ name]
	fn.phases= opts.phases|| Phases
	fn.async= opts.async|| false
	
	return fn
}
