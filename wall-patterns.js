// ================================
// 壁の基本パターン
// ================================

const wallPatterns = [

    // パターン1：中央に通路がある壁
    {
        width: 9,
        walls: [
            { x: 3, width: 2, gapTop: 4, gapHeight: 4 }
        ]
    },

    // パターン2：高さの違う壁が2つ
    {
        width: 12,
        walls: [
            { x: 2, width: 1, gapTop: 3, gapHeight: 4 },
            { x: 8, width: 2, gapTop: 5, gapHeight: 4 }
        ]
    },

    // パターン3：壁が3つ続く
    {
        width: 13,
        walls: [
            { x: 2, width: 2, gapTop: 5, gapHeight: 4 },
            { x: 8, width: 1, gapTop: 3, gapHeight: 4 },
            { x: 11, width: 1, gapTop: 4, gapHeight: 4 }
        ]
    }

];
