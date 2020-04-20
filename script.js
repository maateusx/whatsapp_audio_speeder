document.addEventListener("DOMContentLoaded", function() {
  var sliderAudioSpeed = document.getElementById("sliderAudioSpeed");
  sliderAudioSpeed.value = localStorage.getItem("@MEDIA_SPEED") || 1;

  var inputAudioSpeed= document.getElementById("inputAudioSpeed");
  inputAudioSpeed.value = localStorage.getItem("@MEDIA_SPEED") || 1;

  var UpdateSelectors = function(value) {
    inputAudioSpeed.value = value;
    sliderAudioSpeed.value = value;
  }

  var UpdateDOM = function(value) {
    UpdateSelectors(value)
    chrome.tabs.executeScript(null, {       
      code : "audios = document.getElementsByTagName('audio'); for (var i = 0; i < audios.length; i++) audios[i].playbackRate = " + value + "; videos = document.getElementsByTagName('video'); for (var i = 0; i < videos.length; i++) videos[i].playbackRate = " + value + ";"
    }, function(e) {
      localStorage.setItem("@MEDIA_SPEED", value)
    });
  }

  document.querySelector("#sliderAudioSpeed").addEventListener("change", () => UpdateDOM(sliderAudioSpeed.value), false);
  document.querySelector("#inputAudioSpeed").addEventListener("change", () => UpdateDOM(inputAudioSpeed.value), false);
}, false);