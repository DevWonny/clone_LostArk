(() => {
  let yOffset = 0; // window.pageYOffset 대신 사용할 변수
  let prevScrollHeight = 0; // 현재 스크롤 위치(yOffset)보다 이전에 위치한 스크롤 섹션들의 스크롤 높이값의 합
  let currentScene = 0; // 현재 활성화된(눈 앞에 보고있는) 씬(scroll-section)
  let enterNewScene = false; // 새로운 scene이 시작되는 순간 true로 변경
  // 부드러운 Animation 역할을 위한 변수 지정
  let acc = 0.1;
  let delayedYOffset = 0;
  let rafId;
  let rafState;

  const info = [
    {
      // 0
      type: "sticky",
      heightNum: 5,
      scrollHeight: 0,
      objs: {
        container: document.querySelector("#scroll-section-0"),
        messageA: document.querySelector("#scroll-section-0 .main-message.a"),
        messageB: document.querySelector("#scroll-section-0 .main-message.b"),
        messageC: document.querySelector("#scroll-section-0 .main-message.c"),
        canvas: document.querySelector("#video-canvas-0"),
        context: document.querySelector("#video-canvas-0").getContext("2d"),
        videoImages: []
      },
      values: {
        videoImageCount: 480,
        imageSequence: [0, 479],
        canvas_opacity: [1, 0, { start: 0.9, end: 1 }],
        messageA_opacity_in: [0, 1, { start: 0.1, end: 0.2 }],
        messageB_opacity_in: [0, 1, { start: 0.3, end: 0.4 }],
        messageC_opacity_in: [0, 1, { start: 0.5, end: 0.6 }],
        messageA_translateY_in: [20, 0, { start: 0.1, end: 0.2 }],
        messageB_translateY_in: [20, 0, { start: 0.3, end: 0.4 }],
        messageC_translateY_in: [20, 0, { start: 0.5, end: 0.6 }],
        messageA_opacity_out: [1, 0, { start: 0.25, end: 0.3 }],
        messageB_opacity_out: [1, 0, { start: 0.45, end: 0.5 }],
        messageC_opacity_out: [1, 0, { start: 0.65, end: 0.7 }],
        messageA_translateY_out: [0, -20, { start: 0.25, end: 0.3 }],
        messageB_translateY_out: [0, -20, { start: 0.45, end: 0.5 }],
        messageC_translateY_out: [0, -20, { start: 0.65, end: 0.7 }],
      }
    },

    {
      // 1
      type: "normal",
      scrollHeight: 0,
      objs: {
        container : document.querySelector("#scroll-section-1"),
      },
    },

    {
      // 2
      type: "sticky",
      heightNum: 5,
      scrollHeight: 0,
      objs: {
        container: document.querySelector("#scroll-section-2"),
        canvasCaption: document.querySelector(".canvas-caption"),
        canvas: document.querySelector(".image-blend-canvas"),
        context: document.querySelector(".image-blend-canvas").getContext("2d"),
        imagesPath: ["../image/blend-image-1.jpg", "../image/blend-image-2.png"],
        images:[]
      },
      values: {
        rect1X: [0, 0, { start: 0, end: 0 }],
        rect2X: [0, 0, { start: 0, end: 0 }],
        blendHeight: [0, 0, { start: 0, end: 0 }],
        canvas_scale: [0, 0, { start: 0, end: 0 }],
        canvasCaption_opacity: [0, 1, { start: 0, end: 0 }],
        canvasCaption_translateY: [20, 0, {start: 0, end: 0}],
        rectStartY: 0,
      }
    }
  ]
  // info

  function setLayout() {
    for (let i = 0; i < info.length; i++){
      if (info[i].type === "sticky") {
        info[i].scrollHeight = info[i].heightNum * innerHeight;
      } else if (info[i].type === "normal") {
        info[i].scrollHeight = info[i].objs.container.offsetHeight;
      }

      info[i].objs.container.style.height = `${info[i].scrollHeight}px`;
    }
  }
  // setLayout

  function scrollLoop() {
    prevScrollHeight = 0;

    for (let i = 0; i < currentScene; i++){
      prevScrollHeight += info[i].scrollHeight;
    }

    if (yOffset > prevScrollHeight + info[currentScene].scrollHeight) {
      currentScene ++;
    }
    if (yOffset < prevScrollHeight) {
      if (currentScene === 0) return;
      currentScene--;
    }
    document.body.setAttribute("id", `show-scene-${currentScene}`);
  }

  window.addEventListener("scroll", () => {
    yOffset = window.pageYOffset;
    scrollLoop();
  })
  window.addEventListener("resize", setLayout());
  setLayout();
})();