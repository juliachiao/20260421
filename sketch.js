let y2kFont;
let angle = 0;
let decorations = []; // 儲存漂浮圖案的陣列

function setup() {
  // 產生全螢幕畫布
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  
  // 產生 15 個漂浮裝飾物
  for (let i = 0; i < 15; i++) {
    decorations.push({
      x: random(width),
      y: random(height),
      size: random(10, 25),
      speed: random(0.5, 1.5),
      type: random() > 0.5 ? 'star' : 'heart' // 隨機產生星號或愛心
    });
  }
}

function draw() {
  // 1. 使用你指定的顏色 #cdb4db
  background('#cdb4db');

  // 2. 繪製漂浮圖案
  drawDecorations();

  // 3. 繪製背景裝飾：像素點陣感 (Y2K 元素)
  drawGrid();

  // 4. 計算中間區塊的大小 (50%)
  let boxW = width * 0.5;
  let boxH = height * 0.5;

  // 5. 繪製中間的「影像掃描框」
  push();
  translate(width / 2, height / 2);
  
  // 外框呼吸燈特效 (霓虹藍)
  // 使用 sin 函數讓透明度 (Alpha) 在 100 到 255 之間循環
  let glowAlpha = map(sin(frameCount * 0.03), -1, 1, 100, 255);
  stroke(189, 224, 254, glowAlpha); // #bde0fe 的 RGBA 格式
  strokeWeight(6);
  noFill();
  rect(0, 0, boxW, boxH, 15); // 稍微增加圓角

  // 內部裝飾細線 (更復古)
  strokeWeight(1);
  stroke(255, 50);
  rect(0, 0, boxW - 20, boxH - 20, 10);

  // 6. 模擬掃描線 (動態效果)
  // 速度加快一點，讓它更動感
  let scanY = map(sin(frameCount * 0.08), -1, 1, -boxH/2 + 10, boxH/2 - 10);
  stroke('#ffc8dd'); // 使用淡粉色作為掃描線
  strokeWeight(2);
  line(-boxW/2 + 20, scanY, boxW/2 - 20, scanY);

  // 7. 原始文字提示 (保留)
  noStroke();
  fill(255);
  textAlign(CENTER);
  textSize(16);
  text("SYSTEM READY: PLEASE SCAN QR CODE", 0, boxH / 2 + 30);
  
  pop();
  
  // 8. 新增操作說明文字 (放在掃描框下方較遠處)
  drawInstructions();
}

// 繪製格線
function drawGrid() {
  stroke(255, 20);
  for (let i = 0; i < width; i += 40) {
    line(i, 0, i, height);
  }
  for (let j = 0; j < height; j += 40) {
    line(0, j, width, j);
  }
}

// 繪製漂浮裝飾物
function drawDecorations() {
  noStroke();
  for (let dec of decorations) {
    fill(189, 224, 254, 80); // 淡藍色，低透明度
    
    // 讓圖案上下漂浮
    dec.y += sin(frameCount * 0.02 + dec.x) * dec.speed;
    
    if (dec.type === 'star') {
      drawPixelStar(dec.x, dec.y, dec.size);
    } else {
      drawPixelHeart(dec.x, dec.y, dec.size);
    }
    
    // 檢查邊界，讓圖案循環
    if (dec.y > height + dec.size) dec.y = -dec.size;
    if (dec.y < -dec.size) dec.y = height + dec.size;
  }
}

// 繪製操作說明
function drawInstructions() {
  noStroke();
  fill(255, 200); // 稍微透明的白色
  textAlign(CENTER, TOP);
  textSize(18);
  
  let instrY = height * 0.82; // 放在畫布下方約 1/5 處
  text("— 操作說明 —", width / 2, instrY);
  
  textSize(14);
  fill(255, 150);
  text("1. 請將擴充功能產生的 QR Code 圖片", width / 2, instrY + 30);
  text("下載並開啟在手機或紙本上。", width / 2, instrY + 50);
  text("2. 將 QR Code 對準視窗中間的掃描框。", width / 2, instrY + 70);
  text("3. 系統偵測到碼後將自動跳轉至排課畫面。", width / 2, instrY + 90);
}

// 像素風星號函數
function drawPixelStar(x, y, s) {
  push();
  translate(x, y);
  rect(0, 0, s, s); // 中心
  rect(s, 0, s, s); rect(-s, 0, s, s); // 左右
  rect(0, s, s, s); rect(0, -s, s, s); // 上下
  pop();
}

// 像素風愛心函數
function drawPixelHeart(x, y, s) {
  push();
  translate(x, y);
  // Y2K 像素心形
  rect(-s, 0, s, s); rect(0, 0, s, s); rect(s, 0, s, s);
  rect(-2*s, -s, s, s); rect(-s, -s, s, s); rect(s, -s, s, s); rect(2*s, -s, s, s);
  rect(-2*s, -2*s, s, s); rect(2*s, -2*s, s, s);
  rect(0, s, s, s); rect(-s, s, s, s); rect(s, s, s, s);
  rect(0, 2*s, s, s);
  pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}