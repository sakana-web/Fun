import { loadGLTF, loadAudio } from "./libs/loader.js";
const THREE = window.MINDAR.IMAGE.THREE;

function makeSphere() {
  // 球体を作成
  const geometry = new THREE.SphereGeometry(0.5, 30, 30);
  geometry.scale(-1, 1, 1);
  // 画像を読み込む
  const texture = new THREE.TextureLoader().load('./assets/imgs/pixage_panorama02.jpg');
  // マテリアルにテクスチャーを設定
  const material = new THREE.MeshStandardMaterial({ map: texture, color: 0xffffff });
  // メッシュを作成
  const mesh = new THREE.Mesh(geometry, material);
  return mesh;
}

function jumpgoogle(){
    location.href = "https://rin-sanity.github.io/africafe22-vr//sp/index.html";
}
function jumpgoogle2() {
    location.href = "https://rin-sanity.github.io/africafe22-vr/sp/dance.html";
}


document.addEventListener('DOMContentLoaded', () => {
    const start = async () => {
        const mindarThree = new window.MINDAR.IMAGE.MindARThree({
            container: document.body,
            imageTargetSrc: './assets/targets/scenery.mind',
        });
        const { renderer, scene, camera } = mindarThree;
        const anchor = mindarThree.addAnchor(0);

        const house = await loadGLTF('./assets/models/house/scene.gltf');
        house.scene.scale.set(0.05, 0.05, 0.05);
        house.scene.position.set(-0.5, 0, 0);
        house.scene.rotation.set(180, 0, 0);

        const houseAncor = mindarThree.addAnchor(0);
        houseAncor.group.add(house.scene);

        // const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
        // scene.add(light);

         // 3D空間にメッシュを追加
        // const sphere = makeSphere();
        // anchor.group.add(sphere);
        // const anchor = mindarThree.addAnchor(0);
     
        // anchor.group.add(sphere);
        // const light = new THREE.AmbientLight(0xFFFFFF, 1.0);
        // scene.add(light);



        // const raccoon = await loadGLTF('./assets/models/musicband-raccoon/house.gltf');
        const sphere = await makeSphere();
        const light = new THREE.AmbientLight(0xFFFFFF, 1.0);
        scene.add(light);
        // sphere.geometry.scale(-1, 1, 1);
        // sphere.geometry.SphereGeometry(0.5, 30, 30);
        sphere.userData.clickable = true;
        sphere2.userData.clickable = true;

        anchor.group.add(sphere);


        // anchor.group.add(raccoon.scene);


        const listener = new THREE.AudioListener();
        camera.add(listener);

        // const sound = new THREE.Audio(listener);
        // const audio = await loadAudio('./assets/sounds/musicband-drum-set.mp3');
        // sound.setBuffer(audio);


        document.body.addEventListener("click",(e) => {
            const mouseX = (e.clientX / window.innerWidth) * 2 - 1;
            const mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
            const mouse = new THREE.Vector2(mouseX,mouseY);

            const raycaster = new THREE.Raycaster();
            raycaster.setFromCamera(mouse,camera);

            const intersects = raycaster.intersectObjects(scene.children,true);

            

            if(intersects.length > 0){
                let o = intersects[0].object;

                while(o.parent && !o.userData.clickable){
                    o = o.parent;
                }
                if(o.userData.clickable){
                    if(o === sphere){
                        jumpgoogle();
                    }else if(o === sphere2)
                }
            }
        });

        await mindarThree.start();
        renderer.setAnimationLoop(() => {
            renderer.render(scene, camera);
        });
    }
    start();
});
