const config = {
    type: Phaser.AUTO,

    // ゲーム画面のサイズ
    width: 450,
    height: 800,

    // ゲームを表示するHTML要素
    parent: "game",

    backgroundColor: "#c0c0c0",

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
    this.add.image(
        225,
        400,
        "bird"
    ).setDisplaySize(100, 100);
}
