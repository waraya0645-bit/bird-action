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
    // 当たり判定を64x64ピクセルにする
this.bird.body.setSize(31, 32);
    // 画面端との衝突を無効にする
    this.bird.setCollideWorldBounds(false);
    // カメラを鳥に横方向だけ追従させる
    this.cameras.main.startFollow(this.bird, true, 1, 0);

    this.gameOver = false;

    this.started = false;

    // スタミナ
this.maxStamina = 100;
this.stamina = 100;

// マップを描画（1マス64×64）
drawMap(this, 64);
    
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
function update(time, delta) {

    // ゲーム開始後の横移動
    if (this.started && !this.gameOver) {

        // 右側に壁があれば停止
        if (isWallAhead(this, delta)) {
            this.bird.setVelocityX(0);
        } else {
            this.bird.setVelocityX(300);
        }
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
