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
function makeSphere2() {
    // 球体を作成
    const geometry = new THREE.SphereGeometry(0.5, 30, 30);
    geometry.scale(-1, 1, 1);
    // 画像を読み込む
    const texture = new THREE.TextureLoader().load('./assets/imgs/U.jpg');
    // マテリアルにテクスチャーを設定
    const material = new THREE.MeshStandardMaterial({ map: texture, color: 0xffffff });
    // メッシュを作成
    const mesh = new THREE.Mesh(geometry, material);
    return mesh;
}
function makeSphere3() {
    // 球体を作成
    const geometry = new THREE.SphereGeometry(0.5, 30, 30);
    geometry.scale(-1, 1, 1);
    // 画像を読み込む
    const texture = new THREE.TextureLoader().load('./assets/imgs/P.jpg');
    // マテリアルにテクスチャーを設定
    const material = new THREE.MeshStandardMaterial({ map: texture, color: 0xffffff });
    // メッシュを作成
    const mesh = new THREE.Mesh(geometry, material);
    return mesh;
}

function jumpgoogle() {
    location.href = "https://sakana-web.github.io/360ga/";
}
function jumpgoogle2() {
    location.href = "https://rin-sanity.github.io/africafe22-vr//sp/index.html";
}
function jumpgoogle3() {
    location.href = "https://sakana-web.github.io/360ga/";
}

document.addEventListener('DOMContentLoaded', () => {
    const start = async () => {
        const mindarThree = new window.MINDAR.IMAGE.MindARThree({
            container: document.body,
            imageTargetSrc: './assets/targets/scenery.mind',
        });
        const { renderer, scene, camera } = mindarThree;
        const anchor = mindarThree.addAnchor(0);
        // const anchor1 = mindarThree.addAnchor(1);

        // const group = new THREE.Group();

        const house = await loadGLTF('./assets/models/musicband-raccoon/27goukan.gltf');
        house.scene.scale.set(0.05, 0.05, 0.05);
        house.scene.position.set(-0.5, 0, 0);
        house.scene.rotation.set(180, 0, 0);

        const houseAncor = mindarThree.addAnchor(0);
        houseAncor.group.add(house.scene);




        // const raccoon = await loadGLTF('./assets/models/musicband-raccoon/house.gltf');
        const sphere = await makeSphere();
        const light = new THREE.AmbientLight(0xFFFFFF, 1.0);
        scene.add(light);
        sphere.scale.set(0.3, 0.3, 0.3);
        sphere.position.set(0, -0.4, 0);
        sphere.userData.clickable = true;

        const sphere2 = await makeSphere2();
        const light2 = new THREE.AmbientLight(0xFFFFFF, 1.0);
        scene.add(light2);
        sphere2.scale.set(0.3, 0.3, 0.3);
        sphere2.position.set(0.5, -0.8, 0.5);
        sphere2.userData.clickable = true;

        const sphere3 = await makeSphere3();
        const light3 = new THREE.AmbientLight(0xFFFFFF, 1.0);
        scene.add(light3);
        sphere3.scale.set(0.3, 0.3, 0.3);
        sphere3.position.set(0.4, 1.0, 0.5);
        sphere3.userData.clickable = true;


        // scene.add(group);


        anchor.group.add(sphere,sphere2,sphere3);
        // anchor.group.add(sphere2);



        const listener = new THREE.AudioListener();
        camera.add(listener);

        // const sound = new THREE.Audio(listener);
        // const audio = await loadAudio('./assets/sounds/musicband-drum-set.mp3');
        // sound.setBuffer(audio);

        document.body.addEventListener("click", (e) => {
            const mouseX = (e.clientX / window.innerWidth) * 2 - 1;
            const mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
            const mouse = new THREE.Vector2(mouseX, mouseY);

            const raycaster = new THREE.Raycaster();
            raycaster.setFromCamera(mouse, camera);

            const intersects = raycaster.intersectObjects(scene.children, true);

            if (intersects.length > 0) {
                let o = intersects[0].object;

                // while (o.parent && !o.userData.clickable) {
                //     o = o.parent;
                // }

                console.log(o.userData);
                if (o.userData.clickable) {
                    if (o === sphere) {
                        jumpgoogle();
                    }else if(o === sphere2){
                        jumpgoogle2();
                    }else if(o === sphere3){
                        jumpgoogle3();
                    }
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