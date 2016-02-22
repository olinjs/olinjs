#3D Graphics in the Browser - WebGL

To see some cool examples of what you can do with WebGl look [here](https://www.chromeexperiments.com/webgl) or [here](http://madebyevan.com/webgl-water/) to see my favorite.


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

Its job is to take a buffer containing the model's coordinates transfer and convert it to colored pixels on the screen. As you can see there are a lot of steps to this, and most of them are directly controlled by code we write. Lets go through the steps quickly:
1. The modeling transform converts the coordinate system of our model into world coordinates.
2. The viewing transform converts the coordinate system of the world to camera coordinates.
3. The perspective transform applies a distortion that gives the image depth.

   The next steps are handled for us by the graphics card, so we do not have to worry about how the clipped perspective coordinates are transfered into fragments.

4. Fragments are shaded or given a color vector.

The rest of the pipeline is also handled by the graphics card so we do not need to worry generally about how fragments' colors are interpolated. 

Based on this pipeline, you can sort of see that we are dealing with two types of information: Coordinates (vertices) and Fragments. You will soon see that we will need to write individual blocks of code or shaders to handle them. 

##Shaders and GLSL
As was previewed above, shaders are where the majority of the graphics pipeline is controlled. Shaders are written in a language called the OpenGL Shading Language(GLSL), which has a c-like syntax similar to javascript. However, has a few different parts.

###GLSL
First, like C it is staticly typed, meaning you have to specify the variable type when you declare a variable and functions must be specified either as void or the data type they return; all lines must terminate in a semicolon; void main is the entry point into the shader; arrays are 1d and static; and structures can be created to house members. However, some data types that exist in C do not exist in GLSL, and different key words are used to express the precision of a variable. An example of some syntactly correct but dull GLSL looks like this:
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

Secondly, as you probably guessed from above, sort of like matlab matrix manipulation is built into the language. However, unlike matlab, the largest a dimension can be is 4, which is large enough for all graphics purposes (If you are confused why 4 and not 3 see Appendix A's section on homogenous coordinates). This means functions like `dot()` will take the dot product of two vectors, `normalize()` will make a vector have a length of 1, and the standard `* + / -` operators linear algebra operations. Matrix creatation tends to be a little tricky as it is done in column major order which means 
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

Thirdly, it has additional key words to describe data passed to and from the shader. These are:
* `attribute` - Links vertex data from Javascript to shader.
* `uniform` - Links data that does not change across a primative from Javascript to shader. 
* `varying`  - Links data between Vertex and Fragment shader. 

If you want more info on GLSL in a quick to digest form, [this](https://www.khronos.org/files/webgl/webgl-reference-card-1_0.pdf) reference card is good for consultation. 

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

void main() {
  gl_Position = projection*view*model*vec4(position,1);;
}
```
And that's it. However, if we want to render things with lighting and color we generally will need to add some additional calculations to our vertex shader. If we want to impliment the Blinn-Phong lighting model, a relative good-looking photo realisic lighting model, we would add the following to our vertex shader: 
```
uniform mat4 inverseModel;
uniform mat4 inverseView;
uniform mat4 inverseProjection;

uniform vec3 lightPosition;

varying vec3 lightDirection;
varying vec3 viewNormal;
varying vec3 eyeDirection;

void main() {
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
Looking back to the pipeline again, number 4 is left to the fragment shader. This means the fragment shader is responsible for computing the lighting or coloring of the fragment. An extremely basic shader just assigns a constant color vector to the `gl_FragColor`.
```
precision mediump float;

void main() {
	gl_FragColor = vec4(1, 1, 1, 1);
}
```
Here is what that looks like.

INSERT IMAGE

However, if we were to complete our blinn-phong model from before our shader would look something like this:
```

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

void main() {
	float lambert = max(dot(viewNormal, lightDirection),0.0);
	float phong = pow(max(dot(reflect(lightDirection, viewNormal), eyeDirection), 0.0), shininess);

	vec3 light = (ambient+diffuse*lambert+specular*phong);
	gl_FragColor = vec4(light, 1);
}
```
Much more complicated, but this is the result.

INSERT IMAGE.

And there you have it a much better looking object. If you want to understand the physics and math behind lighting see Appendix B. If you would like a more in-depth tutorial on shading, [this](https://github.com/stackgl/shader-school) tutorial from nodeschool is really good. 

NOTE: functions written in the shader are not designed to run for a long time. Shaders are good for doing a small set of things repeatedly for a huge number of times. This means that looping is also strictly controlled, so be aware of that. 

##WebGl...Finally 

load
compile
attach
link
used

#Appendix A: Mathematical Concepts

##Transformations 

##Homogenous Coordinates

##Transformations in Homogenous Coordinate Systems

