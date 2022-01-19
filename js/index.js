(() => {
  let yOffset = 0; // window.pageYOffset 대신 사용할 변수!
  let prevScrollHeight = 0; // 현재 스크롤 위치보다  이전에 위치한 scroll section들의 스크롤 높이의 합
  let currentScene = 0; // 현재 활성화된 section
  const sceneInfo = [
    {
      // 0
      type: "sticky",
      heightNum: 5,
      scrollHeight: 0,
      objs: {
        container: document.querySelector("#scroll-section-1"),
        messageH1: document.querySelector("#scroll-section-1 h1"),
        messageH4: document.querySelector("#scroll-section-1 h4"),
        messageH5: document.querySelector("#scroll-section-1 h5"),
        canvas: document.querySelector("#video-canvas-1"),
        context: document.querySelector("#video-canvas-1").getContext("2d"),
        videoImages:[],
      },
      values: {
        videoImageCount: 480,
        imageSequence : [0,479],
      }
    },

    {
      // 1
      type: "normal",
      scrollHeight: 0,
      objs: {
        container: document.querySelector(".static-section"),
      }
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
        imagePath: ["../image/blend-image-1.jpg", "../image/blend-image-2.png"],
        images:[],
      }
    }
  ];

  function setLayout() {
    for (let i = 0; i < sceneInfo.length; i++){
      if (sceneInfo[i].type === "sticky") {
        sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * innerHeight;
      } else if (sceneInfo[i].type === "normal") {
        sceneInfo[i].scrollHeight = sceneInfo[i].objs.container.offsetHeight;
      }

      sceneInfo[i].objs.container.style.heihgt = `${sceneInfo[i].scrollHeight}`;
    }

    let totalScrollHeight = 0;
    yOffset = window.pageYOffset;
    for (let i = 0; i < sceneInfo.length; i++){
      totalScrollHeight += sceneInfo.scrollHeight;
      if (totalScrollHeight >= yOffset) {
        currentScene = i;
        break;
      }
    }

    const heightRatio = window.innerHeight / 1080;
    sceneInfo[0].objs.canvas.style.tansform = `translate3d(-50%, -50%, 0) scale(${heightRatio})`;
  }

  setLayout();
})();