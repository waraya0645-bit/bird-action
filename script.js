const config = {
    type: Phaser.AUTO
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
        create: create
    }
};

const game = new Phaser.Game(config);

function create() {
    this.add.text(
        225,
        400,
        "縦長画面の確認",
        {
            fontSize: "24px",
            color: "#ffffff"
        }
    ).setOrigin(0.5);
}
