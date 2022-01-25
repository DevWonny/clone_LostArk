(() => {
  let yOffset = 0;
  let prevScrollHeight = 0;
  let currentScene = 0;
  let enterNewScene = false;

  const info = [
    {
      // 0
      type: "sticky",
      heightNum: 5,
      scrollHeight: 0,
      objs: {
        container: document.querySelector("#scroll-section-0"),
        messageA: document.querySelector(".main-message.a"),
        messageB: document.querySelector(".main-message.b"),
        messageC: document.querySelector(".main-message.c"),
        canvas: document.querySelector("#video-canvas-0"),
        context: document.querySelector("#video-canvas-0").getContext("2d"),
        videoImages: []
      },
      values: {
        videoImageCount: 480,
        imageSequence: [0, 479],
        messageA_opacity_in: [0, 1, { start: 0.4, end: 0.5 }],
        messageB_opacity_in: [0, 1, { start: 0.6, end: 0.7 }],
        messageC_opacity_in: [0, 1, { start: 0.8, end: 0.9 }],
        messageA_translateY_in: [20, 0, { start: 0.4, end: 0.5 }],
        messageB_translateY_in: [20, 0, { start: 0.6, end: 0.7 }],
        messageC_translateY_in: [20, 0, { start: 0.8, end: 0.9 }],
        messageA_opacity_out: [1, 0, { start: 0.55, end: 0.6 }],
        messageB_opacity_out: [1, 0, { start: 0.75, end: 0.8 }],
        messageC_opacity_out: [1, 0, { start: 0.95, end: 1 }],
        messageA_translateY_out: [0, -20, { start: 0.55, end: 0.6 }],
        messageB_translateY_out: [0, -20, { start: 0.75, end: 0.8 }],
        messageC_translateY_out: [0, -20, { start: 0.95, end: 1 }],
      }
    },

    {
      // 1
      type: "normal",
      heightNum : 1,
      scrollHeight: 0,
      objs: {
        container: document.querySelector("#scroll-section-1"),
      }
    },

    {
      // 2
      type: "sticky",
      heightNum: 4,
      scrollHeight: 0,
      objs: {
        container: document.querySelector("#scroll-section-2"),
        canvasCaption: document.querySelector(".canvas-caption"),
        canvas: document.querySelector(".image-blend-canvas"),
        context: document.querySelector(".image-blend-canvas").getContext("2d"),
        imagesPath: ["../image/blend-image-1.jpg", "../image/blend-image-2.jpg"],
        images: [],
      },
      values: {
        rect1X: [0, 0, { start: 0, end: 0 }],
        rect2X: [0, 0, { start: 0, end: 0 }],
        blendHeight: [0, 0, { start: 0, end: 0 }],
        canvas_scale: [0, 0, { start: 0, end: 0 }],
        canvasCaption_opacity: [0, 1, { start: 0, end: 0 }],
        canvasCaption_translateY: [20, 0, {start: 0, end: 0}],
        rectStartY: 0,
      },
    }
  ];
  // info

  function menuFix() {
    if (yOffset > 50) {
      document.body.classList.add('bot-header-sticky');
    } else {
      document.body.classList.remove('bot-header-sticky');
    }
  }

  function setCanvasImages() {
    let imgElem;
    for (let i = 0; i < info[0].values.videoImageCount; i++){
      imgElem = new Image();
      imgElem.src = `../video/video_${1 + i}.jpg`;
      info[0].objs.videoImages.push(imgElem);
    }

    let imgElem2;
    for (let i = 0; i < info[2].objs.imagesPath.length; i++){
      imgElem2 = new Image();
      imgElem2.src = info[2].objs.imagesPath[i];
      info[2].objs.images.push(imgElem2);
    }
  }
  setCanvasImages();

  function setLayout() {
    for (let i = 0; i < info.length; i++){
      info[i].scrollHeight = info[i].heightNum * innerHeight;
      info[i].objs.container.style.height = `${info[i].scrollHeight}px`
    }

    let totalScrollHeight = 0;
    yOffset = window.pageYOffset;
    for (let i = 0; i < info.length; i++){
      totalScrollHeight += info[i].scrollHeight;
      if (totalScrollHeight >= yOffset) {
        currentScene = i;
        break;
      }
    }
    document.body.setAttribute("id", `show-scroll-section-${currentScene}`);
  }
  // setLayout

  function scrollLoop() {
    enterNewScene = false;
    prevScrollHeight = 0;
    for (let i = 0; i < currentScene; i++){
      prevScrollHeight += info[i].scrollHeight;
    }

    if (yOffset > prevScrollHeight + info[currentScene].scrollHeight) {
      enterNewScene = true;
      currentScene++;
      document.body.setAttribute("id", `show-scroll-section-${currentScene}`);
    }
    if (yOffset < prevScrollHeight) {
      enterNewScene = true;
      if (currentScene === 0) return;
      currentScene--;
      document.body.setAttribute("id", `show-scroll-section-${currentScene}`);
    }

    if (enterNewScene) return;
    playAnimation();
  }
  // scrollLoop

  function playAnimation() {
    const objs = info[currentScene].objs;
    const values = info[currentScene].values;
    const currentYOffset = yOffset - prevScrollHeight;
    const scrollHeight = info[currentScene].scrollHeight;
    const scrollRatio = currentYOffset / scrollHeight;

    switch (currentScene) {
      case 0:
        let sequence = Math.round(calcValues(values.imageSequence, currentYOffset));
        objs.context.drawImage(objs.videoImages[sequence], 0, 0);

        if (scrollRatio <= 0.55) {
          // in
          objs.messageA.style.opacity = calcValues(values.messageA_opacity_in, currentYOffset);;
          objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_in, currentYOffset)}%, 0)`;
        } else {
          // out
          objs.messageA.style.opacity = calcValues(values.messageA_opacity_out, currentYOffset);
          objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_out, currentYOffset)}%, 0)`;
        }

        if (scrollRatio <= 0.75) {
          // in
          objs.messageB.style.opacity = calcValues(values.messageB_opacity_in, currentYOffset);;
          objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_in, currentYOffset)}%, 0)`;
        } else {
          // out
          objs.messageB.style.opacity = calcValues(values.messageB_opacity_out, currentYOffset);
          objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_out, currentYOffset)}%, 0)`;
        }

        if (scrollRatio <= 0.85) {
          // in
          objs.messageC.style.opacity = calcValues(values.messageC_opacity_in, currentYOffset);;
          objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_in, currentYOffset)}%, 0)`;
        } else {
          // out
          objs.messageC.style.opacity = calcValues(values.messageC_opacity_out, currentYOffset);
          objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_out, currentYOffset)}%, 0)`;
        }
        
        break;
      
      case 1:

        if (scrollRatio > 0) {
        // currentScene 2 캔버스 미리 그리기
          const objs = info[2].objs;
          const values = info[2].values;
          const widthRatio = window.innerWidth / objs.canvas.width;
          const heightRatio = window.innerHeight / objs.canvas.height;
          let canvasScaleRatio;

          if (widthRatio <= heightRatio) {
            canvasScaleRatio = heightRatio;
          } else {
            canvasScaleRatio = widthRatio;
          }
          // console.log(objs.images);
          objs.canvas.style.transform = `scale(${canvasScaleRatio})`;
          objs.context.drawImage(objs.images[0], 0, 0, 1920, 1080);
          objs.context.fillStyle = "#d4cfb6";

          // canvas size에 맞춰 가정한 innerWidth와 innerHeight
          const recalculatedInnerWidth = document.body.offsetWidth / canvasScaleRatio;
          const recalculatedInnerHeight = document.body.offsetHeight / canvasScaleRatio;

          const whiteBoxWidth = recalculatedInnerWidth * 0.15;
          values.rect1X[0] = (objs.canvas.width - recalculatedInnerWidth) / 2;
          values.rect1X[1] = values.rect1X[0] - whiteBoxWidth;
          values.rect2X[0] = values.rect1X[0] + recalculatedInnerWidth - whiteBoxWidth;
          values.rect2X[1] = values.rect2X[0] + whiteBoxWidth;


          // 좌우 whiteBox 그리기
          objs.context.fillRect(
            parseInt(values.rect1X[0]),
            0,
            parseInt(whiteBoxWidth),
            objs.canvas.height
          );
          objs.context.fillRect(
            parseInt(values.rect2X[0]),
            0,
            parseInt(whiteBoxWidth),
            objs.canvas.height
          );
        }
          
        break;
      
      case 2:
        const widthRatio = window.innerWidth / objs.canvas.width;
        const heightRatio = window.innerHeight / objs.canvas.height;
        let canvasScaleRatio;

        if (widthRatio <= heightRatio) {
          canvasScaleRatio = heightRatio;
        } else {
          canvasScaleRatio = widthRatio;
        }

        objs.canvas.style.transform = `scale(${canvasScaleRatio})`;
        objs.context.drawImage(objs.images[0], 0, 0, 1920, 1080);
        objs.context.fillStyle = "#d4cfb6";

        // canvas size에 맞춰 가정한 innerWidth와 innerHeight
        const recalculatedInnerWidth = document.body.offsetWidth / canvasScaleRatio;
        const recalculatedInnerHeight = document.body.offsetHeight / canvasScaleRatio;
        
        if (!values.rectStartY) {
          // values.rectStartY = objs.canvas.getBoundingClientRect().top;
          values.rectStartY = objs.canvas.offsetTop + (objs.canvas.height - objs.canvas.height * canvasScaleRatio) / 2;
          values.rect1X[2].end = values.rectStartY / scrollHeight;
          values.rect2X[2].end = values.rectStartY / scrollHeight;
        }
        
        // rect1X: [0, 0, { start: 0, end: 0 }],
        // rect2X: [0, 0, { start: 0, end: 0 }],

        const whiteBoxWidth = recalculatedInnerWidth * 0.15;
        values.rect1X[0] = (objs.canvas.width - recalculatedInnerWidth) / 2;
        values.rect1X[1] = values.rect1X[0] - whiteBoxWidth;
        values.rect2X[0] = values.rect1X[0] + recalculatedInnerWidth - whiteBoxWidth;
        values.rect2X[1] = values.rect2X[0] + whiteBoxWidth;



        // 좌우 whiteBox 그리기
        objs.context.fillRect(
          parseInt(calcValues(values.rect1X, currentYOffset)),
          0,
          parseInt(whiteBoxWidth),
          objs.canvas.height
        );
        objs.context.fillRect(
          parseInt(calcValues(values.rect2X, currentYOffset)),
          0,
          parseInt(whiteBoxWidth),
          objs.canvas.height
        );

        if (scrollRatio < values.rect1X[2].end) {
          objs.canvas.classList.remove('sticky');
        } else {
          objs.canvas.classList.add('sticky');
          values.blendHeight[0] = 0;
          values.blendHeight[1] = objs.canvas.height;
          values.blendHeight[2].start = values.rect1X[2].end;
          values.blendHeight[2].end = values.blendHeight[2].start + 0.2;
          const blendHeight = calcValues(values.blendHeight, currentYOffset);

          objs.context.drawImage(objs.images[1],
            0, objs.canvas.height - blendHeight, objs.canvas.width, blendHeight,
            0, objs.canvas.height - blendHeight, objs.canvas.width, blendHeight,
          );

          if (scrollRatio > values.blendHeight[2].end) {
            values.canvas_scale[0] = canvasScaleRatio;
            values.canvas_scale[1] = document.body.offsetWidth / (objs.canvas.width * 1.5);
            values.canvas_scale[2].start = values.blendHeight[2].end;
            values.canvas_scale[2].end = values.canvas_scale[2].start + 0.2;

            objs.canvas.style.transform = `scale(${calcValues(values.canvas_scale, currentYOffset)})`;
            objs.canvas.style.marginTop = 0;
          }

          if (scrollRatio > values.canvas_scale[2].end && values.canvas_scale[2].end > 0) {
            objs.canvas.classList.remove('sticky');
            objs.canvas.style.marginTop = `${scrollHeight * 0.4}px`;

            values.canvasCaption_opacity[2].start = values.canvas_scale[2].end;
            values.canvasCaption_opacity[2].end = values.canvasCaption_opacity[2].start + 0.15;
            values.canvasCaption_translateY[2].start = values.canvasCaption_opacity[2].start;
            values.canvasCaption_translateY[2].end = values.canvasCaption_opacity[2].end;

            objs.canvasCaption.style.opacity = calcValues(values.canvasCaption_opacity, currentYOffset);
            objs.canvasCaption.style.transform = `translate3d(0,${calcValues(values.canvasCaption_translateY, currentYOffset)}%,0)`;
          }
        }

        break;
    }
  }
  // palyAnimation

  function calcValues(values, currentYOffset) {
    let rv;
    const scrollHeight = info[currentScene].scrollHeight;
    const scrollRatio = currentYOffset / scrollHeight;

    if (values.length === 3) {
      const partScrollStart = values[2].start * scrollHeight;
      const partScrollEnd = values[2].end * scrollHeight;
      const partScrollHeight = partScrollEnd - partScrollStart;

      if (currentYOffset >= partScrollStart && currentYOffset <= partScrollEnd) {
        rv = (currentYOffset - partScrollStart) / partScrollHeight * (values[1] - values[0]) + values[0];
      } else if (currentYOffset < partScrollStart) {
        rv = values[0];
      } else if (currentYOffset > partScrollEnd) {
        rv = values[1];
      }
      
    } else {
      rv = scrollRatio * (values[1] - values[0]) + values[0];
    }
    
    return rv;
  }

  window.addEventListener("load", () => {
    setLayout();
    info[0].objs.context.drawImage(info[0].objs.videoImages[0], 0, 0);
  });

  window.addEventListener("scroll", () => {
    yOffset = window.pageYOffset;
    scrollLoop();
    menuFix();
  });

  window.addEventListener("resize", setLayout);
})();