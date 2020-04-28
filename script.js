document.addEventListener("DOMContentLoaded", () => {
  var sliderAudioSpeed = document.querySelector("#sliderAudioSpeed");
  sliderAudioSpeed.value = localStorage.getItem("@MEDIA_SPEED") || 1;

  var inputAudioSpeed= document.querySelector("#inputAudioSpeed");
  inputAudioSpeed.value = localStorage.getItem("@MEDIA_SPEED") || 1;

  var UpdateSelectors = (value) => {
    inputAudioSpeed.value = value;
    sliderAudioSpeed.value = value;
  }

  var UpdateDOM = (value) => {
    UpdateSelectors(value)
    chrome.tabs.executeScript(null, {
      code : `
        const audios = document.getElementsByTagName('audio');
        for (let audio of audios)
          audio.playbackRate = ${value};
        const videos = document.getElementsByTagName('video');
        for (let video of videos)
          videos.playbackRate = ${value};
        const selects = document.getElementsById('WS_audioSpeed');
        for (let select of selects)
          select.value = ${value};
        `
    }, function(e) {
      localStorage.setItem("@MEDIA_SPEED", value)
    });
  }

  document.querySelector("#sliderAudioSpeed").addEventListener("change", () => UpdateDOM(sliderAudioSpeed.value), false);
  document.querySelector("#inputAudioSpeed").addEventListener("change", () => UpdateDOM(inputAudioSpeed.value), false);

  chrome.tabs.executeScript(null, {
    code : `
      const WS_onPlay = (media) => {
        console.log('entrei no onplay', media)
        console.log('kk')
        const selects = document.querySelector('#WS_audioSpeed');
        console.log('eai selects', selects)
        console.log('selects[0].value', selects[0].selectedIndex)
        media.target.playbackRate = selects[0].options[selects[0].selectedIndex].value;
      }

      const WS_onChangeSpeed = (value) => {
        audios = document.getElementsByTagName('audio');
        for (let audio of audios) {
          audio.playbackRate = value;
          audio.onplay = WS_onPlay(audio);
        }
        videos = document.getElementsByTagName('video');
        for (let video of videos) {
          video.playbackRate = value;
          video.onplay = WS_onPlay(video);
        }
        const selects = document.getElementsById('WS_audioSpeed');
        for (let select of selects)
          select.value = value;
      }

      const WS_onMutation = (mutations) => {
        for (const mutation of mutations) {
          if (mutation.type === 'childList') {
            for (const addedNode of mutation.addedNodes) {
              const addedNodeWithMessages = addedNode.getElementsByClassName("MVjBr _3e2jK")
              if (addedNodeWithMessages) {
                const messages = document.getElementsByClassName("MVjBr _3e2jK")
                for (let message of messages) {
                  let hasAudio = message.querySelector('audio')
                  let alreadyUpdated = message.querySelector('#WS_audioSpeed')
                  if (hasAudio && !alreadyUpdated) {
                    const auxElement = document.createElement('div')
                    auxElement.innerHTML = "<div style='right: 125px; position: absolute; bottom: 3px;'><label for='WS_audioSpeed'><span class='_1DZAH'>Speed:</span></label><select id='WS_audioSpeed' onChange='WS_onChangeSpeed(value)' class='_1DZAH _2hrew' style='line-height: normal; padding: 0px !important; width: auto !important; margin-left: 3px; text-align-last:center;'><option class='_3EFt_' value='0.25'>0.25</option><option class='_3EFt_' value='0.5'>0.5</option><option class='_3EFt_' value='0.75'>0.75</option><option class='_3EFt_' value='1' selected>Normal</option><option class='_3EFt_' value='1.25'>1.25</option><option class='_3EFt_' value='1.5'>1.5</option><option class='_3EFt_' value='1.75'>1.75</option><option class='_3EFt_' value='2'>2.0</option></select></div>";
                    message.appendChild(auxElement.firstChild);
                  }
                }
              }
            }
          }
        }
      }

      (new MutationObserver(WS_onMutation))
      .observe(document.querySelector("body"), {
        childList: true,
        subtree: true
      })
    `
  }, function(e) {
    localStorage.setItem("@MEDIA_SPEED", value)
  });
}, false);
