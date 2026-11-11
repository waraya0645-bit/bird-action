const config = {
    type: Phaser.AUTO,
    // ゲーム画面のサイズ
    width: 450,
    height: 800,
    // ゲームを表示するHTML要素
    parent: "game",
    backgroundColor: "#c0c0c0",
    pixelArt: true,

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
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);

// 画像の読み込み
function preload() {
    this.load.image("bird", "images/bird.png");
    this.load.image("gray_block", "images/gray_block.png");
}

// ゲーム開始時の処理
function create() {
    this.bird = this.physics.add.image(
        225,
        100,
        "bird"
    );

    this.bird.setScale(2);
    // 画面端との衝突を無効にする
    this.bird.setCollideWorldBounds(false);
    // カメラを鳥に横方向だけ追従させる
    this.cameras.main.startFollow(this.bird, true, 1, 0);

    this.gameOver = false;

    this.started = false;

    // スタミナ
this.maxStamina = 100;
this.stamina = 100;

// スタート地点の地面
const ground = this.add.rectangle(
    225,
    165,
    450,
    30,
    0x555555
);

// 地面に固定の物理ボディを追加
this.physics.add.existing(ground, true);

// 鳥が地面に着地できるようにする
this.physics.add.collider(this.bird, ground);
    
// テスト用の障害物
const obstacle = this.add.rectangle(
    650,
    400,
    100,
    250,
    0x333333
);

// 障害物に物理ボディを追加（固定）
this.physics.add.existing(obstacle, true);

// 鳥と障害物の接触を検出
this.physics.add.overlap(this.bird, obstacle, () => {

    // 障害物を赤色にする
    obstacle.setFillStyle(0xff0000);

    // 物理演算を停止する
    this.physics.pause();
    this.gameOver = true;
        // GAME OVERを画面中央に表示
    this.add.text(
        this.scale.width / 2,
        this.scale.height / 2,
        "GAME OVER",
        {
            fontSize: "48px",
            color: "#ffffff",
            backgroundColor: "#000000",
            padding: {
                x: 12,
                y: 8
            }
        }
    )
    .setOrigin(0.5)
    .setScrollFactor(0);
});
    
// タッチ操作
this.input.on("pointerdown", () => {

    // ゲームオーバーならステージを再開
    if (this.gameOver) {
        this.scene.restart();
        return;
    }

        // スタミナが足りなければジャンプしない
    if (this.stamina < 10) {
        return;
    }

    // スタミナを10消費
    this.stamina -= 10;

    // 移動開始
    this.started = true;

    // 上方向にジャンプ
    this.bird.setVelocityY(-500);
});

// 指を離したとき
const stopJump = () => {

    // まだ上昇中ならジャンプを弱める
    if (!this.gameOver && this.bird.body.velocity.y < 0) {
        this.bird.setVelocityY(
            this.bird.body.velocity.y * 0.45
        );
    }
};

// 指を離したことを検出
this.input.on("pointerup", stopJump);
this.input.on("pointerupoutside", stopJump);
}

// 毎フレーム実行する処理
function update() {

    // ゲーム開始後は横移動速度を一定にする
    if (this.started && !this.gameOver) {
        this.bird.setVelocityX(300);
    }
    // 鳥が画面下端から完全に出たか確認
    if (
        !this.gameOver &&
        this.bird.y > this.scale.height + this.bird.displayHeight / 2
    ) {
        // ゲームオーバーにする
        this.gameOver = true;

        // 物理演算を停止
        this.physics.pause();

        // GAME OVERを画面中央に表示
        this.add.text(
            this.scale.width / 2,
            this.scale.height / 2,
            "GAME OVER",
            {
                fontSize: "48px",
                color: "#ffffff",
                backgroundColor: "#000000",
                padding: {
                    x: 12,
                    y: 8
                }
            }
        )
        .setOrigin(0.5)
        .setScrollFactor(0);
    }
}
