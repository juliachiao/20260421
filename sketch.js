let capture;

function setup() {
  // 第一步驟：產生一個全螢幕的畫布
  createCanvas(windowWidth, windowHeight);

  // 取得攝影機影像
  capture = createCapture(VIDEO);
  
  // 隱藏預設產生的 HTML 影片元素，這樣我們才能純粹將影像繪製在畫布上
  capture.hide(); 
}

function draw() {
  // 設定畫布背景顏色為 cdb4db
  background('#cdb4db');

  // 設定顯示的影像寬度與高度為整個畫布寬高的 50%
  let imgWidth = width * 0.5;
  let imgHeight = height * 0.5;

  // 計算讓影像置中於畫布的 X 與 Y 座標
  let x = (width - imgWidth) / 2;
  let y = (height - imgHeight) / 2;

  // 將攝影機的即時影像繪製在畫布中間
  image(capture, x, y, imgWidth, imgHeight);
}

// 當瀏覽器視窗大小改變時，自動調整畫布尺寸以維持全螢幕
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
}
