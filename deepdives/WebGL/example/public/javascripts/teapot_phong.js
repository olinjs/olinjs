var attibs = {
  position: {numComponents: 3},
  normal: {numComponents: 3}
}
var dataObj;

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

function getObj(path, callback) {  
  var request = new XMLHttpRequest();
  request.open('GET', path, true);

  request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
      // Success!
      var data = JSON.parse(request.responseText);
      return callback(null, data);
    } else {
      // We reached our target server, but it returned an error
      var err = new Error('Bad Request:' + request.status);
      return callback(err, null);
    }
  };

  request.onerror = function() {
    // There was a connection error of some sort
    var err = new Error('Bad Request: getting CAD');
    return callback(err, null)
  };

  request.send();
}

function init() {
  getObj('/obj', function(err, data) {
    run(data);
  });
}

function run(data) {
  console.log("LOADED");
  dataObj = data;
  //get gl context
  var canvas = document.getElementById("view");
  var gl = createGLContext(canvas);
  // gl.viewport(0.0, 0.0, gl.viewportWidth, gl.viewportHeight);
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  //create program
  var programObj = createProgramFromDOM(gl, "shader-vs", "shader-fs");

  if (!programObj) {
    console.log("ERROR creating program");
    return;
  }
  //get attrib locations
  var vPositionAttrLoc = gl.getAttribLocation(programObj, "position");
  var vNormAttrLoc = gl.getAttribLocation(programObj, "normal");

  //get uniform locations
  var modelLoc = gl.getUniformLocation(programObj, "model");
  var viewLoc = gl.getUniformLocation(programObj, "view");  
  var projectionLoc = gl.getUniformLocation(programObj, "projection");
  var invModelLoc = gl.getUniformLocation(programObj, "inverseModel");
  var invViewLoc = gl.getUniformLocation(programObj, "inverseView");
  var invProjectionLoc = gl.getUniformLocation(programObj, "inverseProjection");
  var lightPositionLoc = gl.getUniformLocation(programObj, "lightPosition");
  var ambientLoc = gl.getUniformLocation(programObj, "ambient");
  var diffuseLoc = gl.getUniformLocation(programObj, "diffuse");
  var shininessLoc = gl.getUniformLocation(programObj, "shininess");
  var specularLoc = gl.getUniformLocation(programObj, "specular");
  //setup buffers and attributes for Position
  var vPositionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vPositionBuffer);
  gl.enableVertexAttribArray(vPositionAttrLoc);
  gl.vertexAttribPointer(vPositionAttrLoc, 3, gl.FLOAT, false, 0, 0);

  //setup buffers and attributes for Color
  var vNormBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vNormBuffer);  
  gl.enableVertexAttribArray(vNormAttrLoc);
  gl.vertexAttribPointer(vNormAttrLoc, 3, gl.FLOAT, false, 0, 0);

  gl.useProgram(programObj);
  console.log(data);
  console.log("DRAWING");
  gl.bindBuffer(gl.ARRAY_BUFFER, vPositionBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data.vertices), 
                                gl.STATIC_DRAW);
 
  gl.bindBuffer(gl.ARRAY_BUFFER, vNormBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data.normals),
                                gl.STATIC_DRAW);

  var mMat = mat4.create();
  var translateVec = vec3.create();
  translateVec[0] = 0;
  translateVec[1] = -0.5;
  translateVec[2] = 0;
  mat4.translate(mMat, mMat, translateVec);
  var vMat = mat4.create();
  var pMat = mat4.create();

  gl.uniformMatrix4fv(modelLoc, false, mMat);
  console.log(mMat);
  gl.uniformMatrix4fv(viewLoc, false, vMat);
  gl.uniformMatrix4fv(projectionLoc, false, pMat);

  gl.uniformMatrix4fv(invModelLoc, false, mMat);
  gl.uniformMatrix4fv(invViewLoc, false, vMat);
  gl.uniformMatrix4fv(invProjectionLoc, false, pMat);

  var lightVec = [1, 1, -1];
  gl.uniform3fv(lightPositionLoc, lightVec);

  var ambVec = [0.792157, 0.819608, 0.933333];
  gl.uniform3fv(ambientLoc, ambVec);

  var diffVec = [0.792157, 0.819608, 0.933333];
  gl.uniform3fv(diffuseLoc, diffVec);

  var shinF = 0.4;
  gl.uniform1f(shininessLoc, shinF);

  var specVec = [0.396078, 0.409804, 0.466667];
  gl.uniform3fv(specularLoc, specVec);
  console.log(data.vertices[0], data.vertices[1], data.vertices[2]);
  gl.drawArrays(gl.TRIANGLES, 0, data.length);
  console.log("DONE");
}