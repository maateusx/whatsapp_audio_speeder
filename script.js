document.addEventListener("DOMContentLoaded", () => {
  chrome.tabs.executeScript(null, {
    code : `
      const WS_init() = () => {
        window.addEventListener("play", function() {
          const selects = document.getElementsByClassName('WS_selectSpeed _1DZAH _2hrew');
          const storageSpeed = localStorage.getItem('@WS_SELECTED_SPEED')
          let value = 1

          if (storageSpeed) value = Number(storageSpeed)
          else if (selects[0] && selects[0].value) value = selects[0].value
          WS_onChangeSpeed(value)
        }, true);

        const WS_onChangeSpeed = (value = 1) => {
          audios = document.getElementsByTagName('audio');
          for (let audio of audios) audio.playbackRate = value;
          videos = document.getElementsByTagName('video');
          for (let video of videos) video.playbackRate = value;

          WS_setSelectSpeed(value)
        }

        const WS_setSelectSpeed = (value = 1) => {
          const selects = document.getElementsByClassName('WS_selectSpeed _1DZAH _2hrew');
          for (let select of selects) select.value = value;
          localStorage.setItem('@WS_SELECTED_SPEED', value)
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
                      auxElement.innerHTML = "<div style='right: 125px; position: absolute; bottom: 3px;'><label for='WS_audioSpeed'><span class='_1DZAH'>Speed:</span></label><select id='WS_audioSpeed' onChange='WS_onChangeSpeed(value)' class='WS_selectSpeed _1DZAH _2hrew' style='line-height: normal !important; padding: 0px !important; width: auto !important; margin-left: 3px !important; text-align-last: center !important;'><option class='_3EFt_' value='0.25'>0.25</option><option class='_3EFt_' value='0.5'>0.5</option><option class='_3EFt_' value='0.75'>0.75</option><option class='_3EFt_' value='1' selected>Normal</option><option class='_3EFt_' value='1.25'>1.25</option><option class='_3EFt_' value='1.5'>1.5</option><option class='_3EFt_' value='1.75'>1.75</option><option class='_3EFt_' value='2'>2.0</option></select></div>";
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
      }

      if (window.location.host === 'web.whatsapp.com') WS_init();
    `
  }, function(e) {
  });
}, false);
