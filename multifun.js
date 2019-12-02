"use module"
import Phases from "./phases.js"

function syncNext(){
}

async function asyncNext( ctx){
	// get phase, advance
	ctx.phase= ctx.multifun.phases[ ctx.position]
	++ctx.position

	// run phase
	try{
		ctx.output= phase.call( ctx, ...args)
		// synchronously resolve before continuing
		if( ctx.output&& ctx.output.then){
			ctx.output= await ctx.output
		}
	}catch( fault){
		ctx.fault= fault
	}
	if( ctx.fault){
		throw ctx.fault
	}
	if( ctx.position>= ctx.multifun.phases.length){
		return ctx.output
	}
	return asyncNext( ctx)
}

export function Multifun( fn, opts= {}){
	const
	  name= typeof fn=== "string"? fn: fn&& fn.name|| "multifunc"
	  fn= ({ [ name]: function( ...args){
		// I would love some convenient way to turn this into a history-preserving object
		const ctx= {
			args: args,
			multifun: fn,
			output: undefined,
			fault: undefined
			i: 0
		}
		function next(){
			
		}
		return ctx.output
	  })[ name]
	fn.phases= opts.phases|| Phases
	fn.async= opts.async|| false
	
	return fn
}
