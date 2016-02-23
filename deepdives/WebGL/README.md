#3D Graphics in the Browser - WebGL

To see some cool examples of what you can do with WebGl look [here](https://www.chromeexperiments.com/webgl) or [here](http://madebyevan.com/webgl-water/) to see my favorite.

Note that this is a vanilla javascript lesson, as in I will not use jquery to select elements or make requests. 

##Canvas and Setting Context
Before we do anything, lets talk about how to make graphics in the broswer. There are two common ways of doing so. Probably the most common is the `<svg>` tag, which when manipulated using D3 can create some powerful interfaces, but we will not talk about that in this lesson. The other method is through the `<canvas>` tag, which allows for you to programmatically create graphics through javascript. This is done by setting a context for the canvas like so:
```javascript
var canvas = document.getElementById("canvasId");
var ctx = canvas.getContext("2d");
```
Pretty simple to set up, and by changing this context string, we can set the canvas to use webgl to create more powerful graphics using our computer's graphics card. This looks like the following:
```javascript
var gl = canvas.getContext("webgl");
```
In some cases the context string will instead contain `"experimental-webgl"` because different browsers have different names for the canvas context. 

##Structure of Graphics Pipeline
While webgl gives us the ability to create cool 3D graphics, it is not a 3D library, but, for better or worse, gives us full control of the graphics pipeline instead. When people mention the graphics pipeline, this image is what they are talking about.

![I know the arrow on the left is upside down. Blame John C. Hart at University of Illinois.](./images/rendering_pipeline.png)

Its job is to take a buffer containing the model's coordinates and convert it to colored pixels on the screen. As you can see there are a lot of steps to this, and most of them are directly controlled by code we write. Lets go through the steps quickly:  
1. The modeling transform converts the coordinate system of our model into world coordinates.  
2. The viewing transform converts the coordinate system of the world to camera coordinates.  
3. The perspective transform applies a distortion that gives the image depth.  
   The next steps are handled for us by the graphics hardware, so we do not have to worry about how the clipped perspective coordinates are transfered into fragments.  

4. Fragments are shaded or given a color vector.

The rest of the pipeline is also handled by the graphics hardware so we do not need to worry generally about how fragments' colors are interpolated. 

Based on this pipeline, you can sort of see that we are dealing with two types of information: Coordinates (vertices) and Fragments. You will soon see that we will need to write individual blocks of code or shaders to handle them. 

##Shaders and GLSL
As was previewed above, shaders are where the majority of the graphics pipeline is controlled. Shaders are written in a language called the OpenGL Shading Language(GLSL), which has a c-like syntax similar to javascript. However, has a few different parts.

###GLSL
First, like C it is staticly typed, meaning you have to specify the variable type when you declare a variable and functions must be specified either as void or the data type they return; all lines must terminate in a semicolon; void main is the entry point into the shader; arrays are static; and structures can be created to house members. However, some data types that exist in C do not exist in GLSL, and different key words are used to express the precision of a variable. An example of some syntactly correct but dull GLSL looks like this:
```
precision mediump float;

struct light{
	vec3 diffuse;
	vec3 specular;
	vec3 position;
	float shininess;
}

const highp pi = 3.14159;
void main() {
	int lambert = 1;
	bool wat = false;
	mat4 I = mat4(1.0);
}
```

Secondly, as you probably could guess from above, sort of like matlab, matrix manipulation is built into the language. However, unlike matlab, the largest a dimension can be is 4, which is large enough for all graphics purposes (If you are confused why 4 and not 3 see Appendix A's section on homogenous coordinates). This means functions like `dot()` will take the dot product of two vectors, `normalize()` will make a vector have a length of 1, and the standard `* + / -` operators do linear algebra operations. Matrix creatation tends to be a little tricky as it is done in column major order which means 
```
mat3 M = mat3(1, 0, 0,
			  1, 0, 0,
			  1, 0, 0);
```
actually creates a matrix with this form
```
[1, 1, 1,
 0, 0, 0,
 0, 0, 0]
```

Finally, it has additional key words to describe data passed to and from the shader. These are:
* `attribute` - Links vertex data from Javascript to shader.
* `uniform` - Links data that does not change across a primative from Javascript to shader. 
* `varying`  - Links data between Vertex and Fragment shader. 

And that is pretty much all you need to know to write your shaders. But, if you want more info on GLSL in a quick to digest form, [this](https://www.khronos.org/files/webgl/webgl-reference-card-1_0.pdf) reference card is good for consultation. 

###Vertex Shader
If you look back at the graphics pipeline above, you see that jobs 1, 2, and 3 are done on coordinates or vertices, so naturally the code that does these tasks is called the vertex shader. 

Here is an example of a vertex shader that takes a vertex's position and normal vector and uses them to compute `gl_Position` the perspective coordinate that is used by the GPU. 
```
precision mediump float;

attribute vec3 position;
attribute vec3 normal;

uniform mat4 model;
uniform mat4 view;
uniform mat4 projection;

void main(void) {
  gl_Position = projection*view*model*vec4(position,1);;
}
```
And that's it. However, if we want to render things with lighting and color we generally will need to add some additional calculations to our vertex shader. If we want to impliment the Blinn-Phong lighting model, a relative good-looking photo realisic lighting model, we would replace `void main()` with the following to our vertex shader: 
```
uniform mat4 inverseModel;
uniform mat4 inverseView;
uniform mat4 inverseProjection;

uniform vec3 lightPosition;

varying vec3 lightDirection;
varying vec3 viewNormal;
varying vec3 eyeDirection;

void main(void) {
  vec4 viewPos = view*model*vec4(position, 1);
  vec4 surfPos = projection*viewPos;
  gl_Position = surfPos;

  eyeDirection = normalize(viewPos.xyz);
  lightDirection = normalize((view*vec4(lightPosition,1.0)).xyz - (viewPosition).xyz);
  viewNormal = normalize((vec4(normal, 0.0) * inverseModel * inverseView).xyz);
}
```
The `.x .xy` allow for selecting vector components without using array numeric syntax. This makes more sense as it is more representative of what the vector represents. {r, g, b, a}, {s, t, p, q}, compliment {x,y,z,w} but are generally used to select color vectors and texture vectors respectively.

The varying vecs will be passed to the fragment shader, which will then use them to compute the actual blinn-phong lighting. 

###Fragment Shader
Looking back to the pipeline again, number 4 is all that is left for the fragment shader to complete. This means the fragment shader is responsible for computing the lighting or coloring of the fragment. An extremely basic shader just assigns a constant color vector to the `gl_FragColor` which is used by the graphics hardware to determine the color of the pixels on the screen.
```
precision mediump float;

void main(void) {
	gl_FragColor = vec4(1, 1, 1, 1);
}
```
Here is what that looks like.

INSERT IMAGE

However, if we were to complete our blinn-phong model from before our shader would look something like this:
```
precision mediump float;

uniform mat4 model;
uniform mat4 view;
uniform mat4 projection;

uniform mat4 inverseModel;
uniform mat4 inverseView;
uniform mat4 inverseProjection;

uniform vec3 ambient;
uniform vec3 diffuse;
uniform vec3 specular;

uniform vec3 lightPosition;

uniform float shininess;

varying vec3 lightDirection;
varying vec3 viewNormal;
varying vec3 eyeDirection;

void main(void) {
	float lambert = max(dot(viewNormal, lightDirection),0.0);
	float phong = pow(max(dot(reflect(lightDirection, viewNormal), eyeDirection), 0.0), shininess);

	vec3 light = (ambient+diffuse*lambert+specular*phong);
	gl_FragColor = vec4(light, 1);
}
```
Much more complicated, but this is the result.

INSERT IMAGE.

And there you have it, a much better looking object. If you want to understand the physics and math behind lighting see Appendix B. If you would like a more in-depth tutorial on shading, [this](https://github.com/stackgl/shader-school) tutorial from nodeschool is really good. 

NOTE: functions written in the shader are not designed to run for a long time. Shaders are good for doing a small set of things repeatedly for a huge number of times. This means that looping is also strictly controlled, so be aware of that. 

##WebGl...Finally 
Now that we know how to write shaders, which handle most of the graphics pipeline, how do we incorporate them into our app? This turns out to be much more difficult that just writing shaders. 

The first step to incorporating our shaders is to get the shader source code as a string to the client. There are two ways of doing this: make a request, read from DOM. I am going to assume you understand how to do the first method, and instead talk about the second one. 

To load a shader from the DOM, we can use a script tag to house our shader code. This looks like this:
```html
<script id="shader-vs" type="x-shader/x-vertex">
	attribute vec4 aVertexColor;
	attribute vec3 aVertexPosition;
	uniform mat4 MVMatrix;
    uniform mat4 PMatrix;

	varying vec4 vColor;

	void main(void) {
	    gl_Position = PMatrix*MVMatrix*vec4(aVertexPosition, 1.0);
	    vColor = aVertexColor;
	}
</script>
	  
<script id="shader-fs" type="x-shader/x-fragment">
	precision mediump float;
	varying vec4 vColor;
	void main(void) {
	    gl_FragColor = vColor;
	}
</script>
```
We can then select each shader using its id. However, this just gives use the element, so we need some way of selecting the text between a script tag. This is easily done using `elem.innerHTML` if we have nothing else in our script tag. However, you may also use `elem.firstChild.textContent` or just `elem.text`. So our javascript so far looks something like this:
```javascript
function loadShaderFromDOM(gl, id) {
	var shaderScript = document.getElementById(id);

	if (!shaderScript) {
		return null;
	}

	var child = shaderScript.firstChild;
	if (child.nodeType != 3) {
		return null;
	}

	var shaderSource = child.textContent;
	var shader;

	if (shaderScript.type == "x-shader/x-fragment") {
		shader = gl.createShader(gl.FRAGMENT_SHADER);
	} else if (shaderScript.type == "x-shader/x-vertex") {
		shader = gl.createShader(gl.VERTEX_SHADER);
	} else {
		return null;
	}

	gl.shaderSource(shader, shaderSource);
	gl.compileShader(shader);

	if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
		alert(gl.getShaderInfoLog(shader));
		return null;
	} 
	return shader;

}

``` 
Good thing this is reuseable, as we will need something like this on every webgl app we make. The keys to creating the shader are the lines `target = gl.createShader(ENUM)`, `gl.shaderSource(target, sourceString)`, and `gl.compileShader(target)`. If you need a refresher, `gl` is the context of the canvas element from the very first section of the lesson. The method of the context `createShader` creates a shader object from an enum (read: a c data-type that is just an expressive name for a specific numeric value), which have the form `gl.SOMETHING_IN_CAPS`. The new shader object is passed into the method `shaderSource` followed by a string representing the shader. The shader object with its new shader source is then compiled usign the method `compileShader`. Errors with this method unfortunately are not easily accessed which is why the methods `getShaderParameter` and `getShaderInfoLog` are used above. 

So now that we have a compiled shader object, we still need to attach it our app so it can be used. This is done through the creation of a "program"; shaders are attached to this "program," which is then used by the app. Theoretically we could have multiple programs with different shaders attached to them if we wanted to render some objects differently from others, and the code to accomplish that would be similar. So, lets make a function that creates a program and attaches our shaders.
```javascript
function createProgram(gl, vs, fs) {
	if (!gl || !vs || !fs) {
		return null;
	}

	var prog = gl.createProgram();
	gl.attachShader(prog, vs);
	gl.attachShader(prog, fs);
	gl.linkProgram(prog);

	if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
		alert("failed to setup shaders");
		return null;
	}
	return prog;
}
```
Cool. So now we have a program linked with our shaders attached. All we have left to do is call `gl.useProgram(programObj)` and we are all set to start specifying the values of the uniforms and attributes in our shaders. 

##Actually Drawing Something
Finally, we have most of the webgl overhead out of the way, so we can now actually work on putting objects on the screen. Well, after we tell gl where the attributes and uniforms live plus where the buffers that fill them with information go. 

So lets make a javascript function to do this. From our shader program, we need to set up the following:
* attribute vec4 aVertexColor;
* attribute vec3 aVertexPosition;
* uniform mat4 MVMatrix;
* uniform mat4 PMatrix;

Given a program with the name `programObj` our code looks like this:
```javascript
var programObj = createProgram(gl, vShader, fShader);

var vPositionAttrLoc = gl.getAttribLocation(programObj, "aVertexPoistion");
var vColorAttrLoc = gl.getAttribLocation(programObj, "aVertexColor");

var mvMatrixUniLoc = gl.getUniformLocation(programObj, "MVMatrix");
var pMatrixUniLoc = gl.getUniformLocation(programObj, "PMatrix");

gl.useProgram(programObj);
```
These attribute and uniform locations will be used to tell gl what to send to the shaders. But first, we need to set up the structures to hold the data. For the attributes, gl uses a buffer (read: typed array) to house data. Whereas for the uniforms, gl is less strict. So for our program, we need to create and specify what buffers belong to each attribute. 
```javascript
var vPositionBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, vPositionBuffer);
gl.enableVertexAttribArray(vPositionAttrLoc);
gl.vertexAttribPointer(vPositionAttrLoc, 3, gl.FLOAT, false, 0, 0);

var vColorBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, vColorBuffer);  
gl.enableVertexAttribArray(vColorAttrLoc);
gl.vertexAttribPointer(vColorAttrLoc, 4, gl.FLOAT, false, 0, 0);
```
Let's walk through these lines, as they are important. The method `createBuffer` creates a gl buffer object and assigns it to a varriable. Binding the buffer tells gl the next commands will be done on this buffer. In this case, we are attaching the attribute to the buffer, so we need to enable the attribute by passing in its location, then describe how gl will move through the attached buffer. To describe how gl moves through the attached buffer, we use the method `vertexAttribPointer` which has the form 

```
gl.vertexAttribPointer(
    location,
    numComponents,
    typeOfData,
    normalizeFlag,
    strideToNextPieceOfData,
    offsetIntoBuffer);
```
Because our position attribute was a `vec3`, we set the second input to 3; we are dealing with floats so type of data is `gl.FLOAT`; there is no normalization, and we are not reusing this buffer for multiple attributes, so the last arguments are `false, 0, 0`.   

So now our attributes have buffers attached to them. All we need to do now is fill them with data, set up our uniforms and call draw and stuff should appear on the screen. 
```javascript
gl.bindBuffer(gl.ARRAY_BUFFER, vPositionBuffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
									0.0, 1.0, 0.0,
									1.0, -1.0, 0.0,
									-1.0, -1.0, 0.0]), 
								gl.STATIC_DRAW);

gl.bindBuffer(gl.ARRAY_BUFFER, vColorBuffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
									1.0, 0.0, 0.0, 1.0,
									0.0, 1.0, 0.0, 1.0,
									0.0, 0.0, 1.0, 1.0]),
								gl.STATIC_DRAW);

var mvMat = mat4.create();
var pMat = mat4.create();

gl.uniformMatrix4fv(mvMatrixUniLoc, false, mvMat);
gl.uniformMatrix4fv(pMatrixUniLoc, false, pMat);

gl.drawArrays(gl.TRIANGLES, 0, 3);
``` 
Now we should see a triangle take up most of the canvas with different color vertices interpolated across the triangle. The `bufferData` method fills the last bound buffer with data. We have to use a javascript typed array which is why `new Float32Array(arr)`js is used. We needed to rebind the buffers to fill them as the last bound buffer was the color buffer, and I wanted to put the position code before the color. The `mat4.create()` uses a library included in this lesson called gl-matrix to create an 4x4 identity matrix. The library allows for matrix manipulation in javascript, so is very useful.
Finally we set our uniforms and call draw. There are many different functions to set uniforms. The one we used sets a 4x4 matrix of floats from an array, and in general the name of the method reflects the data it creates. The `drawArrays` method tells gl how it should draw the values in the buffer, where to start in the buffer, and how many times it should move pointer.  


##And Now the Model Part

#Appendix A: Mathematical Concepts

##Transformations 
There are four major transformations that are common in graphics: translation, rotation, reflection, and scaling. 

##Homogenous Coordinates

##Transformations in Homogenous Coordinate Systems

#Appendix B: Lighting and Shading

##Color and Images
something about how the physics of seeing works

###Rendering Equation
At a particular position and direction, the outgoing light (Lo) is the sum of the emitted light (Le) and the reflected light. The reflected light being the sum of the incoming light (Li) from all directions, multiplied by the surface reflection and incoming angle. 
##Ray Tracing
Hah lol. 

##Common Shading Algorithms

##Flat Shading

##Gouraud Shading

##Phong Shading

#Appendix C: Drawing in GL
