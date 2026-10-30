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
    const bird = this.physics.add.image(
        225,
        400,
        "bird"
    );

    bird.setDisplaySize(100, 100);
    bird.setCollideWorldBounds(true);
}
