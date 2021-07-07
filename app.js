const resultDiv = document.querySelector('.result');
const wordEle = document.querySelector('#word');
const phonetics = document.querySelector('.phonetics');
const audio = document.querySelector('audio');

const wordMeaning = document.querySelector('.word-definition');
const handle = async (e) => {
  if (e.keyCode === 13) {
    const word = e.target.value;
    const result = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    );
    const data = await result.json();
    resultDiv.style.display = 'block';
    if (result.ok) {
      wordEle.innerText = data[0].word;
      phonetics.innerText = data[0].phonetics[0].text;
      audio.src = data[0].phonetics[0].audio;
      wordMeaning.innerText = data[0].meanings[0].definitions[0].definition;
      const synonyms = data[0].meanings[0].definitions[0].synonyms;
      let synonymsData = '';
      for (let i = 0; i < synonyms.length; i++) {
        synonymsData += `<p class="pills">${synonyms[i]}<p>`;
      }
      document.querySelector('.synonyms').innerHTML = synonymsData;
      return;
    } else {
      audio.style.display = 'none';
      document.querySelectorAll('.meaningheading')[0].style.display = 'none';
      document.querySelectorAll('.meaningheading')[1].style.display = 'none';
      wordEle.innerText = data.title;
      wordMeaning.innerText = data.message;
    }

    if (detectMob) {
      //your code here

      function updateViewportDimensions() {
        var w = window,
          d = document,
          e = d.documentElement,
          g = d.getElementsByTagName('body')[0],
          x = w.innerWidth || e.clientWidth || g.clientWidth,
          y = w.innerHeight || e.clientHeight || g.clientHeight;
        return { width: x, height: y };
      }
      // setting the viewport width
      var viewport = updateViewportDimensions();

      function detectMob() {
        viewport = updateViewportDimensions();
        if (viewport.width <= 768) {
          return true;
        } else {
          return false;
        }
      }
    }
  }
};
