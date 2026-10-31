const config = {
    type: Phaser.AUTO,

    // ゲーム画面のサイズ
    width: 450,
    height: 800,

    // ゲームを表示するHTML要素
    parent: "game",

    backgroundColor: "#c0c0c0",

    // 物理エンジン
    physics: {
        default: "arcade",
        arcade: {
            gravity: {
                y: 800
            },
            debug: false
        }
    },

    // 画面に合わせて拡大・縮小する
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },

    scene: {
        preload: preload,
        create: create
    }
};

const game = new Phaser.Game(config);

// 画像の読み込み
function preload() {
    this.load.image("bird", "images/bird.png");
}

// ゲーム開始時の処理
function create() {
    this.bird = this.physics.add.image(
        225,
        100,
        "bird"
    );

    this.bird.setDisplaySize(100, 100);

    // 画面端との衝突を無効にする
    this.bird.setCollideWorldBounds(false);

    // カメラを鳥に横方向だけ追従させる
    this.cameras.main.startFollow(this.bird, true, 1, 0);

    // テスト用の障害物
    this.add.rectangle(650, 400, 100, 250, 0x333333);
    // タッチ操作
    this.input.on("pointerdown", (pointer) => {

        // 左半分をタップ
        if (pointer.x < this.scale.width / 2) {
            this.bird.setVelocity(-300, -500);
        }

        // 右半分をタップ
        else {
            this.bird.setVelocity(300, -500);
        }
    });
}
