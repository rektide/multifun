"use module"
import Phases from "./phases.js"

function syncNext(){
	// get phase, advance
	ctx.phase= ctx.multifun.phases[ ctx.position]
	++ctx.position

	// run phase
	try{
		ctx.output= phase.call( ctx, ...args)
		// this synchronous invocation will not resolve out intermediary steps
		// (but perhaps output is still a promise)
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
	  name= typeof fn=== "string"? fn: fn&& fn.name|| "multifun"
	  multifun= ({ [ name]: function( ...args){
		// I would love some convenient way to turn this into a history-preserving object
		const ctx= {
			args,
			multifun,
			output: undefined,
			fault: undefined
			position: 0
		}
		if( fn.async){
			return asyncNext( ctx)
		}else{
			return syncNext( ctx)
		}
	  })[ name]
	multifun.phases= opts.phases|| Phases
	multifun.async= opts.async|| false
	return multifun
}
