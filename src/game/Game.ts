import {
  WebGLRenderer,
  Scene,
  Camera,
  PerspectiveCamera,
  BoxGeometry,
  MeshBasicMaterial,
  Mesh,
} from 'three';
import { Entity } from '@/utils';

export class Game extends Entity {

  private _lastTimestamp: number = 0;
  private _renderer: WebGLRenderer;
  private _scene: Scene;
  private _camera: Camera;

  public Entities: Entity[] = [];

  public Awake(): void {
    super.Awake();

    for (const entity of this.Entities) {
      entity.Awake();
    }

    requestAnimationFrame(() => {
      this._lastTimestamp = Date.now();

      //TODO: Move the rendering out of this class

      this._renderer = new WebGLRenderer({ antialias: true });

      this._renderer.setPixelRatio(window.devicePixelRatio);
      this._renderer.setSize(window.innerWidth, window.innerHeight);

      document.body.appendChild(this._renderer.domElement);

      this._scene = new Scene();
      this._camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

      const geometry = new BoxGeometry();
      const material = new MeshBasicMaterial( { color: 0x00ff00 } );
      const cube = new Mesh( geometry, material );
      this._scene.add( cube );

      this._camera.position.z = 5;

      this.Update();
    });
  }

  public Update(): void {
    const deltaTime = (Date.now() - this._lastTimestamp) / 1000;
    super.Update(deltaTime);

    for (const entity of this.Entities) {
      entity.Update(deltaTime);
    }

    this._lastTimestamp = Date.now();

    this._renderer.render(this._scene, this._camera);

    requestAnimationFrame(() => this.Update());
  }


  private _Initialize() {
    // document.title = config.title;

    // this._renderer = new WebGLRenderer({ antialias: true });

    // this._renderer.setPixelRatio(window.devicePixelRatio);
    // this._renderer.setSize(window.innerWidth, window.innerHeight);

    // document.body.appendChild(this._renderer.domElement);

    // this._scene = new Scene();
    // this._camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    // this._LoadMeshs();

    // this._camera.position.z = 5;

    // this._Render();
  }

  private _Render() {
    // this._renderer.render(this._scene, this._camera);
    // requestAnimationFrame(this._Render.bind(this));
  }
}