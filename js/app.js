import {
  Scene,
  PerspectiveCamera,
  WebGL1Renderer,
  Vector2,
  Mesh,
  ShaderMaterial,
  PlaneBufferGeometry,
  TextureLoader,
  DoubleSide,
} from "three";
import vertexShader from "./shaders/vertexShader.glsl";
import fragmentShader from "./shaders/fragmentShader.glsl";

let scrollable = document.querySelector(".scrollable");

let current = 0;
let target = 0;
let ease = 0.075;
var elem = document.querySelectorAll(".imgg");
// for (var i = 0; i < elem.length; i++) {
//   (function () {
//     // console.log("le",elem)
//     elem[i].addEventListener("mouseenter", (event) => {
//       event.preventDefault();
//       let id_text = "#context" + event.target.id.slice(-1);
//       document.querySelector(id_text).classList.remove("animContextOut");
//       document.querySelector(id_text).classList.add("animContextIn");
//       document.querySelector(id_text).style.visibility = "visible";
//     });
//     elem[i].addEventListener("mouseleave", (event) => {
//       var ind = "#context";
//       let id_text = "#context" + event.target.id.slice(-1);
//       document.querySelector(id_text).classList.remove("animContextIn");
//       document.querySelector(id_text).classList.add("animContextOut");
//       document.querySelector(id_text).style.visibility = "hidden";
//     });
//   })(); // immediate invocation
// }

// document.querySelector(".bottom").addEventListener("click", (event) => {
//   event.preventDefault();
//   //
//   var decal_y1 =
//     document.querySelector("#img1").getBoundingClientRect().top +
//     window.scrollY;
//   var decal_y2 =
//     document.querySelector("#img2").getBoundingClientRect().top +
//     window.scrollY;
//   var decal_y3 =
//     document.querySelector("#img3").getBoundingClientRect().top +
//     window.scrollY;
//   var decal_y4 =
//     document.querySelector("#img4").getBoundingClientRect().top +
//     window.scrollY;

//   if (
//     window.scrollY < document.querySelector("#img1").getBoundingClientRect().top
//   ) {
//     window.scrollTo(0, decal_y1);
//   }

//   else if (
//     window.scrollY >
//       document.querySelector("#img1").getBoundingClientRect().top &&
//     window.scrollY < document.querySelector("#img2").getBoundingClientRect().top
//   ) {
//     window.scrollTo(0, decal_y2);
//   }

//   else if (
//     window.scrollY >
//       document.querySelector("#img2").getBoundingClientRect().top &&
//     window.scrollY < document.querySelector("#img3").getBoundingClientRect().top
//   ) {
//     window.scrollTo(0, decal_y3);
//   }

//  else if (
//     window.scrollY >
//       document.querySelector("#img3").getBoundingClientRect().top &&
//     window.scrollY < document.querySelector("#img4").getBoundingClientRect().top
//   ) {
//     window.scrollTo(0, decal_y4);
//   }

//   // img1
//   // let id_text="#context" + event.target.id.slice(-1);
//   // document.querySelector(id_text).classList.remove("animContextOut");
//   // document.querySelector(id_text).classList.add("animContextIn");
//   // document.querySelector(id_text).style.visibility="visible";
// });
// console.log(tt)

// document.getElementById("main1").addEventListener("click", function () {
//   document.cookie = "send-the-font=1";
//   // alert("gsf");
//   var style = document.querySelectorAll("style");

//   for (var q = 0; q < style.length; ++q) {
//     style[q].innerHTML += " ";
//   }
// });

const handleIntersection = (entries, observer) => {
  entries.forEach((entry) => {
    // console.log(entry);
    if (entry.isIntersecting) {
      const img = entry.target;
      const src = img.getAttribute("data-src");
      // Replace the placeholder with the actual image source
      img.src = src;
      // Stop observing the image
      observer.unobserve(img);
    }
  });
};

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// async function myFunc() {
//   var elem = document.getElementById("main1");
//   var elem2 = document.getElementById("main2");
//   var shiftedRight;
//   var shiftedRight2 = 1;
//   // console.log(getComputedStyle(elem2).left);
//   // for (let pas = 0; pas < 1000; pas++) {
//   while (parseFloat(getComputedStyle(elem2).left) > 0) {
//     shiftedRight = parseFloat(getComputedStyle(elem).left) - 10 + "px";
//     elem.style.left = shiftedRight;

//     shiftedRight2 = parseFloat(getComputedStyle(elem2).left) - 10 + "px";
//     elem2.style.left = shiftedRight2;
//     // console.log(getComputedStyle(elem2).left);
//     await sleep(10);
//   }
// }

// window.onload = function () {
//   setTimeout(myFunc, 1000);
// };

// Linear inetepolation used for smooth scrolling and image offset uniform adjustment

function lerp(start, end, t) {
  return start * (1 - t) + end * t;
}

// init function triggered on page load to set the body height to enable scrolling and EffectCanvas initialised
function init() {
  document.body.style.height = `${scrollable.getBoundingClientRect().height}px`;
}

// translate the scrollable div using the lerp function for the smooth scrolling effect.
function smoothScroll() {
  target = window.scrollY;
  current = lerp(current, target, ease);
  scrollable.style.transform = `translate3d(0,${-current}px, 0)`;
}

class EffectCanvas {
  constructor() {
    this.container = document.querySelector("main");
    this.images = [...document.querySelectorAll("img")];
    this.xpos = 0;
    // console.log(this.images);
    this.meshItems = []; // Used to store all meshes we will be creating.
    this.setupCamera();
    this.createMeshItems();
    this.render();
  }

  // Getter function used to get screen dimensions used for the camera and mesh materials
  get viewport() {
    let width = window.innerWidth;
    let height = window.innerHeight;
    let aspectRatio = width / height;
    return {
      width,
      height,
      aspectRatio,
    };
  }

  setupCamera() {
    window.addEventListener("resize", this.onWindowResize.bind(this), false);

    // Create new scene
    this.scene = new Scene();

    // Initialize perspective camera

    let perspective = 1000;
    const fov =
      (180 * (2 * Math.atan(window.innerHeight / 2 / perspective))) / Math.PI; // see fov image for a picture breakdown of this fov setting.
    this.camera = new PerspectiveCamera(
      fov,
      this.viewport.aspectRatio,
      1,
      1000
    );
    this.camera.position.set(0, 0, perspective); // set the camera position on the z axis.

    // renderer
    // this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer = new WebGL1Renderer({ antialias: true, alpha: true });
    this.renderer.setSize(this.viewport.width, this.viewport.height); // uses the getter viewport function above to set size of canvas / renderer
    this.renderer.setPixelRatio(window.devicePixelRatio); // Import to ensure image textures do not appear blurred.
    this.container.appendChild(this.renderer.domElement); // append the canvas to the main element
  }

  onWindowResize() {
    init();
    this.camera.aspect = this.viewport.aspectRatio; // readjust the aspect ratio.
    this.camera.updateProjectionMatrix(); // Used to recalulate projectin dimensions.
    this.renderer.setSize(this.viewport.width, this.viewport.height);
  }

  createMeshItems() {
    // Loop thorugh all images and create new MeshItem instances. Push these instances to the meshItems array.
    // if (window.innerWidth > 500) {q
    this.images.forEach((image) => {
      let meshItem = new MeshItem(image, this.scene);
      this.meshItems.push(meshItem);
    });
    // }
  }

  // Animate smoothscroll and meshes. Repeatedly called using requestanimationdrame
  render() {
    smoothScroll();
    for (let i = 0; i < this.meshItems.length; i++) {
      this.meshItems[i].render();
    }
    this.camera.position.set(this.xpos, 0, 1000);
    // console.log(this.camera.position);
    // this.xpos+=0.1;
    // this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(this.render.bind(this));
  }
}

class MeshItem {
  // Pass in the scene as we will be adding meshes to this scene.
  constructor(element, scene) {
    this.element = element;
    this.scene = scene;
    this.offset = new Vector2(0, 0); // Positions of mesh on screen. Will be updated below.
    this.sizes = new Vector2(0, 0); //Size of mesh on screen. Will be updated below.
    this.createMesh();
  }

  getDimensions() {
    const { width, height, top, left } = this.element.getBoundingClientRect();
    this.sizes.set(width, height);
    this.offset.set(
      left - window.innerWidth / 2 + width / 2,
      -top + window.innerHeight / 2 - height / 2
    );
  }

  createMesh() {
    this.geometry = new PlaneBufferGeometry(1, 1, 100, 100);
    this.imageTexture = new TextureLoader().load(this.element.src);
    this.uniforms = {
      uTexture: {
        //texture data
        value: this.imageTexture,
      },
      uOffset: {
        //distortion strength
        value: new Vector2(0.0, 0.0),
      },
      uAlpha: {
        //opacity
        value: 1,
      },
    };
    this.material = new ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      transparent: true,
      // wireframe: true,
      side: DoubleSide,
    });
    this.mesh = new Mesh(this.geometry, this.material);
    this.getDimensions(); // set offsetand sizes for placement on the scene
    this.mesh.position.set(this.offset.x, this.offset.y, 0);
    this.mesh.scale.set(this.sizes.x, this.sizes.y, 1);

    this.scene.add(this.mesh);
  }

  render() {
    // this function is repeatidly called for each instance in the aboce
    this.getDimensions();
    this.mesh.position.set(this.offset.x, this.offset.y, 0);
    this.mesh.scale.set(this.sizes.x, this.sizes.y, 1);
    this.uniforms.uOffset.value.set(
      this.offset.x * 0.0,
      -(target - current) * 0.0003
    );
  }
}

init();
new EffectCanvas();
