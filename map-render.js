// ================================
// マップの描画処理
// ================================

function drawMap(scene, tileSize) {
    scene.tileSize = tileSize;

    // タイルをまとめる物理グループ
    scene.mapTiles = scene.physics.add.staticGroup();

    // 生成後のマップデータを上から順番に読み込む
    for (let y = 0; y < scene.mapData.length; y++) {
        for (let x = 0; x < scene.mapData[y].length; x++) {

            const tileNumber = scene.mapData[y][x];

            // 0は空白
            if (tileNumber === 0) {
                continue;
            }

            // 番号に対応する画像キーを取得
            const imageKey = tileImageKeys[tileNumber];

            // 対応する画像がなければ配置しない
            if (!imageKey) {
                continue;
            }

            // タイルを配置
            const tile = scene.mapTiles.create(
                x * tileSize + tileSize / 2,
                y * tileSize + tileSize / 2,
                imageKey
            );

            // タイルの大きさを64×64にする
            tile.setDisplaySize(tileSize, tileSize);

            // 当たり判定の大きさを更新
            tile.refreshBody();

            // タイルの左側面の通常衝突を無効にする
            // 右側の衝突は isWallAhead() で判定する
            tile.body.checkCollision.left = false;

            // 鳥より後ろに表示
            tile.setDepth(-1);
        }
    }

    // 鳥とマップの上面・下面などの衝突判定
    scene.physics.add.collider(scene.bird, scene.mapTiles);

    // 生成後のマップ全体の大きさ
    const mapWidth = Math.max(
        ...scene.mapData.map(row => row.length)
    ) * tileSize;

    const mapHeight = scene.mapData.length * tileSize;

    // マップの幅を保存
    scene.mapWidth = mapWidth;
    scene.mapHeight = mapHeight;

    // カメラの移動範囲
    scene.cameras.main.setBounds(
        0,
        0,
        Math.max(mapWidth, scene.scale.width),
        Math.max(mapHeight, scene.scale.height)
    );
}

// ================================
// 右側の壁を確認
// ================================

function isWallAhead(scene, delta) {

    const body = scene.bird.body;
    const tileSize = scene.tileSize;

    // 次のフレームで進む位置を予測
    const nextRight =
        body.right + 300 * delta / 1000 + 1;

    // 調べるマスの範囲
    const firstColumn = Math.floor(
        (body.right + 1) / tileSize
    );

    const lastColumn = Math.floor(
        nextRight / tileSize
    );

    const firstRow = Math.floor(
        body.top / tileSize
    );

    const lastRow = Math.floor(
        (body.bottom - 1) / tileSize
    );

    // 生成後のマップデータを調べる
    for (let x = firstColumn; x <= lastColumn; x++) {
        for (let y = firstRow; y <= lastRow; y++) {

            const row = scene.mapData[y];

            if (!row) continue;

            const tileNumber = row[x];

            // 画像が登録されているタイルなら壁
            if (
                tileNumber !== 0 &&
                tileImageKeys[tileNumber]
            ) {
                return true;
            }
        }
    }

    return false;
}
