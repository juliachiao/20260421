let capture;

function setup() {
  // 1. 產生一個全螢幕的畫布
  createCanvas(windowWidth, windowHeight);
  
  // 2. 擷取攝影機影像
  capture = createCapture(VIDEO);
  
  // 隱藏預設產生的 HTML 攝影機元件，我們只需要在畫布上繪製它
  capture.hide();
}

function draw() {
  // 3. 設定背景顏色為 cdb4db
  background('#cdb4db');

  // 4. 計算影像的大小 (寬度與高度皆為畫布的 50%)
  let imgW = width * 0.5;
  let imgH = height * 0.5;

  // 5. 計算置中座標
  // 畫布寬度的一半減去影像寬度的一半，即可得到置中的 X 座標
  let x = (width - imgW) / 2;
  let y = (height - imgH) / 2;

  // 6. 將攝影機影像繪製在畫布中間 (使用 scale 進行水平翻轉以修正左右顛倒)
  push();
  translate(width, 0); // 將座標原點移至畫布右側
  scale(-1, 1);        // 水平翻轉畫布 X 軸
  image(capture, x, y, imgW, imgH);
  pop(); // 恢復原本的畫布設定
}

// 當視窗大小改變時，自動調整畫布大小以維持全螢幕
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
