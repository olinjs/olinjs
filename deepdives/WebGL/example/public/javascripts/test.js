window.addEventListener("load", init);

function createGLContext(canvas) {
  //because names can differ on some browsers
  var names = ["webgl", "experimental-webgl"];
  var context = null;
  for (var i=0; i < names.length; i++) {
    try {
      context = canvas.getContext(names[i]);
    } catch(e) {}
    if (context) {
      break;
    }
  }
  if (context) {
    context.viewportWidth = canvas.width;
    context.viewportHeight = canvas.height;
  } else {
    alert("Failed to create WebGL context!");
  }
  return context;
}

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

function createProgramFromDOM(gl, vsId, fsId) {
  var vs = loadShaderFromDOM(gl, vsId);
  var fs = loadShaderFromDOM(gl, fsId);
  var prog = createProgram(gl, vs, fs);
  if (prog) {
    return prog;
  }

  console.log("ERROR creating program");
  return null;
}

function init() {
  console.log("LOADED");
  //get gl context
  var canvas = document.getElementById("view");
  var gl = createGLContext(canvas);
  //create program
  var programObj = createProgramFromDOM(gl, "shader-vs", "shader-fs");

  if (!programObj) {
    console.log("ERROR creating program");
    return;
  }
  //get attrib locations
  var vPositionAttrLoc = gl.getAttribLocation(programObj, "aVertexPosition");
  var vColorAttrLoc = gl.getAttribLocation(programObj, "aVertexColor");

  //get uniform locations
  var mvMatrixUniLoc = gl.getUniformLocation(programObj, "MVMatrix");
  var pMatrixUniLoc = gl.getUniformLocation(programObj, "PMatrix");  

  //setup buffers and attributes for Position
  var vPositionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vPositionBuffer);
  gl.enableVertexAttribArray(vPositionAttrLoc);
  gl.vertexAttribPointer(vPositionAttrLoc, 3, gl.FLOAT, false, 0, 0);

  //setup buffers and attributes for Color
  var vColorBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vColorBuffer);  
  gl.enableVertexAttribArray(vColorAttrLoc);
  gl.vertexAttribPointer(vColorAttrLoc, 4, gl.FLOAT, false, 0, 0);

  gl.useProgram(programObj);

  console.log("DRAWING");
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
}