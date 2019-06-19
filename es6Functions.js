1.判断对象的数据类型

const isType = type => target => `[object ${type}]` === Object.prototype.toString.call(target)

const selfIsArray = isType('Array')


2. ES5 实现数组 map 方法

Array.prototype.myMap = function(fn){
	var result = []
	this.forEach(v=>{
		result.push(fn(v))
	})
	return result
}

const selfMap = function(fn, context){
	let arr = Array.prototype.slice.call(this)
	let MappedArr = []
	for (var i = 0; i < arr.length; i++) {
		if(!arr.hasOwnProperty(i)) continue
		MappedArr.push(fn.call(context, arr[i], i, this))
	}
	return MappedArr
}

3. 使用 reduce 实现数组 map 方法

const selfMap = function(fn, context){
	let arr = Array.prototype.slice.call(this)
	return arr.reduce((pre, next, i)=>{
		return [...pre, fn.call(context, next, i, this)]
	}, [])
}

4. ES5 实现数组 filter 方法

Array.prototype.myFilter = function(fn, context){
	let arr = Array.prototype.slice.call(this)
	let resultArr = []
	arr.forEach((v, i)=>{
		fn.call(context, v, i, this) &&
			resultArr.push(v)
		
	})
	return resultArr
}

5. 使用 reduce 实现数组 filter 方法

Array.prototype.myFilter2 = function(fn, context){
	let arr = Array.prototype.slice.call(this)
	return arr.reduce((pre, next, i)=>{
		return fn.call(context, next, i, this) ? [...pre, next] : pre
	},[])
}

6. ES5 实现数组的 some 方法

Array.prototype.mySome = function(fn, context){
	let arr = [].slice.call(this)
	arr.forEach((v, i)=>{
		if(fn.call(context, v, i, this))
			return true
	})
	for(let i = 0; i<arr.length; i++){
		if(!arr.hasOwnProperty(i)) continue
		if(fn.call(context, arr[i], i, this)){
			return true
		}
	}
	return false
}

7. ES5 实现数组的 reduce 方法

Array.prototype.myReduce = function(fn, initVal){
	let arr = [].slice.call(this)
	let result = ''
	let i = 0
	if( initVal !== undefined) {
		result = initVal
	}else{
		i = 1
		result = arr[0]
	}
	for(; i<arr.length; i++){
		if(!arr.hasOwnProperty(i)) continue;
		result = fn.call(null, result, arr[i], i, this)
	}
	return result
}

Array.prototype.myReduce2 = function(fn, initVal){
	let arr = [].slice.call(this)
	let res
	let startIndex
	if(initVal === undefined){
		for(let i = 0; i< arr.length; i++){
			if(!arr.hasOwnProperty(i)) continue
			startIndex = i
			res = arr[i]
			break
		}
	}else{
		res = initVal
	}

	for(let i = ++startIndex || 0; i<arr.length; i++){
		if(!arr.hasOwnProperty(i)) continue
		res = fn.call(null, res, arr[i], i, this)
	}
	return res
}

*************************
****
8. 使用 reduce 实现数组的 flat 方法

Array.prototype.myFlat = function myFlat(depth){
	let arr = [].slice.call(this)
	if(depth === 0) return arr
	return arr.reduce((pre, cur)=>{
		if(Array.isArray(cur))
			return [...pre, ...myFlat.call(cur, depth -1)]
		else
			return [...pre, cur]
	}, [])
}
****
**************************

9. 实现 ES6 的 class 语法

function inherit(subType, superType){
	subType.prototype = Object.create(superType.prototype,{
		constructor: {
			enumerable: false,
			configurable: true,
			writable: true,
			value: subType
		}
	})

	Object.setPrototypeOf(subType, superType)
}
