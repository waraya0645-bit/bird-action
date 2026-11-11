// ================================
// マップの描画処理
// ================================

function drawMap(scene, tileSize) {

    // タイルをまとめる物理グループ
    scene.mapTiles = scene.physics.add.staticGroup();

    // マップデータを上から順番に読み込む
    for (let y = 0; y < mapData.length; y++) {
        for (let x = 0; x < mapData[y].length; x++) {

            const tileNumber = mapData[y][x];

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
            tile.body.checkCollision.left = false;

            // 鳥より後ろに表示
            tile.setDepth(-1);
        }
    }

    // 鳥とマップの衝突判定
    scene.physics.add.collider(scene.bird, scene.mapTiles);

    // マップ全体の大きさ
    const mapWidth = Math.max(
        ...mapData.map(row => row.length)
    ) * tileSize;

    const mapHeight = mapData.length * tileSize;

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

    // 鳥の右側にあるマスを調べる
    for (let x = firstColumn; x <= lastColumn; x++) {
        for (let y = firstRow; y <= lastRow; y++) {

            const row = mapData[y];

            if (!row) continue;

            const tileNumber = row[x];

            // 0以外で画像が登録されているマスは壁
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
