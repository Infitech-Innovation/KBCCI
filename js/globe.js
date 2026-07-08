// Global Map
import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";
import { feature } from "https://cdn.jsdelivr.net/npm/topojson-client@3/+esm";

const visual = document.getElementById("kbcciGlobalVisual");
const canvas = document.getElementById("kbcciGlobalCanvas");

if (visual && canvas) {
  const cards = [...visual.querySelectorAll(".kbcci-global-card")];
  const members = [
    [
      "Bio Invest",
      "https://fx.iguanyalabs.com/images/kbcci/logo/bio-invest.png",
    ],
    [
      "Belgian Scrap Terminal",
      "https://fx.iguanyalabs.com/images/kbcci/logo/belgian-scrap-terminal.png",
    ],
    ["Bosaq", "https://fx.iguanyalabs.com/images/kbcci/logo/bosaq.png"],
    ["CBL-ACP", "https://fx.iguanyalabs.com/images/kbcci/logo/CBL-ACP.png"],
    [
      "Circular It Group",
      "https://fx.iguanyalabs.com/images/kbcci/logo/circular-it-group.png",
    ],
    ["Deme", "https://fx.iguanyalabs.com/images/kbcci/logo/deme.png"],
    ["Ecosteryl", "https://fx.iguanyalabs.com/images/kbcci/logo/ecosteryl.png"],
    ["Flynth", "https://fx.iguanyalabs.com/images/kbcci/logo/flynth.png"],
    ["Ghelamco", "https://fx.iguanyalabs.com/images/kbcci/logo/ghelamco.png"],
    ["Greenyard", "https://fx.iguanyalabs.com/images/kbcci/logo/greenyard.png"],
    [
      "Jules Destooper",
      "https://fx.iguanyalabs.com/images/kbcci/logo/jules-destooper.png",
    ],
    ["KENINVEST", "https://fx.iguanyalabs.com/images/kbcci/logo/KENINVEST.png"],
    ["KEPSA", "https://fx.iguanyalabs.com/images/kbcci/logo/KEPSA.png"],
    [
      "Lufthansa Group",
      "https://fx.iguanyalabs.com/images/kbcci/logo/lufthansa-group.png",
    ],
    [
      "Natural State",
      "https://fx.iguanyalabs.com/images/kbcci/logo/natural-state.png",
    ],
    ["Odoo", "https://fx.iguanyalabs.com/images/kbcci/logo/odoo.png"],
    [
      "Protex Healthcare",
      "https://fx.iguanyalabs.com/images/kbcci/logo/protex-healthcare.png",
    ],
    ["Puratos", "https://fx.iguanyalabs.com/images/kbcci/logo/puratos.png"],
    ["Sirona", "https://fx.iguanyalabs.com/images/kbcci/logo/sirona.png"],
    ["Televic", "https://fx.iguanyalabs.com/images/kbcci/logo/televic.png"],
    ["Texaf", "https://fx.iguanyalabs.com/images/kbcci/logo/texaf.png"],
    ["Vliruos", "https://fx.iguanyalabs.com/images/kbcci/logo/vliruos.png"],
    ["Vyncke", "https://fx.iguanyalabs.com/images/kbcci/logo/vyncke.png"],
    ["Zetes", "https://fx.iguanyalabs.com/images/kbcci/logo/zetes.png"],
  ];

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
  camera.position.z = 5.35;

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const globeGroup = new THREE.Group();
  const initialGlobeRotationY = -0.42;
  const globeSpinSpeed = 0.16;
  globeGroup.position.x = 0.18;
  globeGroup.rotation.set(-0.08, initialGlobeRotationY, 0.03);
  scene.add(globeGroup);

  const radius = 1.72;
  const globe = new THREE.Mesh(
    new THREE.SphereGeometry(radius, 96, 96),
    new THREE.MeshStandardMaterial({
      color: 0xf3f4f1,
      roughness: 0.48,
      metalness: 0.08,
    }),
  );
  globeGroup.add(globe);

  function drawRing(ctx, ring, width, height) {
    ring.forEach(([lon, lat], index) => {
      const x = ((lon + 180) / 360) * width;
      const y = ((90 - lat) / 180) * height;
      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    ctx.closePath();
  }

  async function addWorldMapTexture() {
    const response = await fetch(
      "https://cdn.jsdelivr.net/npm/world-atlas@2/land-110m.json",
    );
    const topology = await response.json();
    const land = feature(topology, topology.objects.land);
    const landFeatures =
      land.type === "FeatureCollection" ? land.features : [land];
    const textureCanvas = document.createElement("canvas");
    const textureWidth = 2048;
    const textureHeight = 1024;
    textureCanvas.width = textureWidth;
    textureCanvas.height = textureHeight;

    const ctx = textureCanvas.getContext("2d");
    ctx.clearRect(0, 0, textureWidth, textureHeight);
    ctx.fillStyle = "#2f7a43";
    ctx.strokeStyle = "#2f7a43";
    ctx.lineWidth = 2.4;

    landFeatures.forEach((landFeature) => {
      const geometry = landFeature.geometry;
      const polygons =
        geometry.type === "Polygon"
          ? [geometry.coordinates]
          : geometry.coordinates;

      polygons.forEach((polygon) => {
        ctx.beginPath();
        polygon.forEach((ring) =>
          drawRing(ctx, ring, textureWidth, textureHeight),
        );
        ctx.fill("evenodd");
        ctx.stroke();
      });
    });

    const texture = new THREE.CanvasTexture(textureCanvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
    texture.needsUpdate = true;

    globeGroup.add(
      new THREE.Mesh(
        new THREE.SphereGeometry(radius * 1.014, 128, 128),
        new THREE.MeshBasicMaterial({
          map: texture,
          transparent: true,
          opacity: 1,
          alphaTest: 0.05,
          depthWrite: false,
          side: THREE.FrontSide,
        }),
      ),
    );
  }

  addWorldMapTexture().catch((error) => {
    console.warn("Could not load world map texture", error);
  });

  globeGroup.add(
    new THREE.Mesh(
      new THREE.SphereGeometry(radius * 1.01, 96, 96),
      new THREE.MeshBasicMaterial({
        color: 0x111111,
        transparent: true,
        opacity: 0.12,
        side: THREE.BackSide,
      }),
    ),
  );

  scene.add(new THREE.AmbientLight(0xffffff, 1.4));
  const keyLight = new THREE.DirectionalLight(0xffffff, 2.25);
  keyLight.position.set(-3, 2.8, 4.2);
  scene.add(keyLight);

  const fillLight = new THREE.DirectionalLight(0xb9d8d4, 1.15);
  fillLight.position.set(3.6, -0.8, 2.5);
  scene.add(fillLight);

  const clock = new THREE.Clock();
  const cardSlots = cards
    .slice(0, 2)
    .map((el, index) => ({ el, index, memberIndex: -1 }));
  const projectedCardPosition = new THREE.Vector3();
  let visualWidth = 1;
  let visualHeight = 1;

  function smoothstep(edge0, edge1, value) {
    const x = THREE.MathUtils.clamp((value - edge0) / (edge1 - edge0), 0, 1);
    return x * x * (3 - 2 * x);
  }

  function setCardMember(slot, memberIndex) {
    if (slot.memberIndex === memberIndex) return;
    const [name, logo] = members[memberIndex];
    const image = slot.el.querySelector("img");
    slot.el.setAttribute("aria-label", `${name} KBCCI member`);
    image.src = logo;
    image.alt = `${name} logo`;
    slot.memberIndex = memberIndex;
  }

  function updateCards(time) {
    const speed = 0.085;

    cardSlots.forEach((slot) => {
      const raw = time * speed + slot.index * 0.5;
      const progress = raw % 1;
      const lap = Math.floor(raw);
      const memberIndex =
        (lap * cardSlots.length + slot.index) % members.length;
      setCardMember(slot, memberIndex);

      const orbitAngle = THREE.MathUtils.lerp(-2.28, -7.16, progress);
      const orbitRadius = radius * 0.82;
      const localPoint = new THREE.Vector3(
        Math.cos(orbitAngle) * orbitRadius,
        THREE.MathUtils.lerp(-0.42, 0.42, progress) * radius,
        Math.sin(orbitAngle) * orbitRadius,
      );

      localPoint.applyMatrix4(globeGroup.matrixWorld);
      projectedCardPosition.copy(localPoint).project(camera);

      const x = (projectedCardPosition.x * 0.5 + 0.5) * visualWidth;
      const y = (-projectedCardPosition.y * 0.5 + 0.5) * visualHeight;
      const fadeIn = smoothstep(0.04, 0.28, progress);
      const fadeOut = 1 - smoothstep(0.72, 0.96, progress);
      const visibleArc = Math.sin(progress * Math.PI);
      const backFade = THREE.MathUtils.lerp(0.44, 1, visibleArc);
      const opacity = fadeIn * fadeOut * backFade;
      const scale = THREE.MathUtils.lerp(0.7, 1.06, visibleArc);

      slot.el.style.zIndex = String(18 + Math.round(visibleArc * 10));
      slot.el.style.opacity = opacity.toFixed(3);
      slot.el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) scale(${scale})`;
    });
  }

  function resizeGlobalVisual() {
    const rect = visual.getBoundingClientRect();
    visualWidth = Math.max(1, rect.width);
    visualHeight = Math.max(1, rect.height);
    camera.aspect = visualWidth / visualHeight;
    camera.position.z = visualWidth < 520 ? 5.8 : 5.35;
    camera.updateProjectionMatrix();
    renderer.setSize(visualWidth, visualHeight, false);
    globeGroup.updateMatrixWorld(true);
    updateCards(clock.getElapsedTime());
  }

  function animateGlobalVisual() {
    requestAnimationFrame(animateGlobalVisual);
    const elapsed = clock.getElapsedTime();
    globeGroup.rotation.y = initialGlobeRotationY + elapsed * globeSpinSpeed;
    globeGroup.updateMatrixWorld(true);
    updateCards(elapsed);
    renderer.render(scene, camera);
  }

  resizeGlobalVisual();
  animateGlobalVisual();

  if ("ResizeObserver" in window) {
    new ResizeObserver(resizeGlobalVisual).observe(visual);
  } else {
    window.addEventListener("resize", resizeGlobalVisual);
  }
}
