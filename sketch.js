let capture;
let pg;
let hearts = []; // 用來儲存愛心泡泡的陣列

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

  // 初始化或在視窗縮放時重設 createGraphics 的大小
  if (!pg || pg.width !== imgW || pg.height !== imgH) {
    pg = createGraphics(imgW, imgH);
  }
  
  // 利用 pg 產生與 video 視訊一樣的內容
  pg.image(capture, 0, 0, imgW, imgH);

  // 6. 將攝影機影像繪製在畫布中間 (使用 scale 進行水平翻轉以修正左右顛倒)
  push();
  translate(width, 0); // 將座標原點移至畫布右側
  scale(-1, 1);        // 水平翻轉畫布 X 軸
  
  image(capture, x, y, imgW, imgH);
  // 將 pg 畫面顯示在視訊畫面的上方 (這裡將 Y 座標向上偏移 50 像素方便觀察)
  // 若您的「上方」是指圖層上層且完全重疊，請將 y - 50 改為 y
  image(pg, x, y - 50);
  
  pop(); // 恢復原本的畫布設定

  // 7. 產生與繪製愛心泡泡
  // 每隔 10 個 frame 就產生一個新的愛心泡泡
  if (frameCount % 10 === 0) {
    hearts.push(new HeartBubble());
  }

  // 倒序迴圈更新與顯示愛心泡泡 (倒序是為了方便在陣列中安全地移除元素)
  for (let i = hearts.length - 1; i >= 0; i--) {
    hearts[i].update();
    hearts[i].display();

    // 如果泡泡飄出螢幕上方，就將它從陣列中移除以節省效能
    if (hearts[i].y < -100) {
      hearts.splice(i, 1);
    }
  }
}

// 當視窗大小改變時，自動調整畫布大小以維持全螢幕
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// 定義愛心泡泡的類別
class HeartBubble {
  constructor() {
    this.x = random(width);
    this.y = height + random(50, 100); // 從畫面底部之外開始產生
    this.size = random(15, 40); // 愛心大小
    this.speedY = random(2, 5); // 上升速度
    this.alpha = random(150, 255); // 隨機透明度
    this.c = color(random(200, 255), random(50, 150), random(150, 200), this.alpha); // 隨機粉紫/紅色調
    this.noiseOffsetX = random(1000); // 左右飄移的噪聲偏移量
  }

  update() {
    this.y -= this.speedY; // 往上移動
    this.x += map(noise(this.noiseOffsetX), 0, 1, -2, 2); // 利用 noise 讓泡泡左右自然飄移
    this.noiseOffsetX += 0.01;
  }

  display() {
    push();
    translate(this.x, this.y);
    fill(this.c);
    noStroke();
    
    // 利用貝茲曲線繪製愛心
    beginShape();
    vertex(0, 0);
    bezierVertex(-this.size / 2, -this.size / 2, -this.size, this.size / 3, 0, this.size);
    bezierVertex(this.size, this.size / 3, this.size / 2, -this.size / 2, 0, 0);
    endShape(CLOSE);
    
    // 在左上角加上半透明的白色高光，增加泡泡質感
    fill(255, 150);
    ellipse(-this.size / 4, this.size / 6, this.size / 4, this.size / 4);
    pop();
  }
}
