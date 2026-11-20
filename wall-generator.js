// ================================
// 壁の自動生成
// ================================

function generateWallMap(baseMap, patternCount = 8) {

    // 元のマップをコピー
    const generatedMap = baseMap.map(row => [...row]);

    const mapHeight = generatedMap.length;

    // マップの右端を調べる
    const baseWidth = Math.max(
        ...generatedMap.map(row => row.length)
    );

    // 乱数を整数で取得
    function randomInt(min, max) {
        return Math.floor(
            Math.random() * (max - min + 1)
        ) + min;
    }

    // 元のマップの右端から3マス空けて開始
    let baseColumn = baseWidth + 3;

    // 生成する範囲まで、各行の長さをそろえる
    const totalWidth = baseColumn + patternCount * 17;

    for (const row of generatedMap) {
        while (row.length < totalWidth) {
            row.push(0);
        }
    }

    // パターンを指定回数生成
    for (let i = 0; i < patternCount; i++) {

        // 基本パターンをランダムに選択
        const pattern = wallPatterns[
            randomInt(0, wallPatterns.length - 1)
        ];

        // パターン内の壁を配置
        for (const wall of pattern.walls) {

            // 通路の高さをランダムに変更
            const gapHeight = Math.min(
                wall.gapHeight + randomInt(0, 1),
                mapHeight - 4
            );

            // 通路の位置を少しランダムに変更
            const gapTop = Math.max(
                2,
                Math.min(
                    wall.gapTop + randomInt(-1, 1),
                    mapHeight - gapHeight - 2
                )
            );

            // 壁の横幅分だけ繰り返す
            for (let x = 0; x < wall.width; x++) {

                const column = baseColumn + wall.x + x;

                // 通路以外の場所に壁を配置
                for (let y = 0; y < mapHeight; y++) {

                    if (
                        y < gapTop ||
                        y >= gapTop + gapHeight
                    ) {
                        generatedMap[y][column] = 1;
                    }
                }
            }
        }

        // 次のパターンまでの距離をランダムにする
        baseColumn += pattern.width + randomInt(2, 4);
    }

    return generatedMap;
}
