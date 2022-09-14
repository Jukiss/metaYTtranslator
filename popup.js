let translate = document.getElementById("translate");
let remove = document.getElementById("remove");
translate.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: SUBTITLES,
  });
});

remove.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: REMOVE,
  });
});

async function REMOVE() {
 
 
 let strokka = Array.from(document.querySelectorAll("ytgn-video-translation-row"));
  for (let k = strokka.length; k > 0 ; k--) {
  async function delay(ms) {
    return new Promise((res) => setTimeout(res, ms));
  }
  document.querySelector("#metadata-actions-menu > tp-yt-iron-icon").click();
  await delay(200);
   document.querySelector("#text-item-1").click();
   await delay(200);
   document.querySelectorAll("#confirm-button")[k-1].click();
   await delay(200);
 }
    }

async function SUBTITLES() {

  async function delay(ms) {
    return new Promise((res) => setTimeout(res, ms));
  }

  var origdescription = document.querySelectorAll("#textbox");
  document.querySelector("#menu-paper-icon-item-4 > div.nav-item-text.style-scope.ytcp-navigation-drawer").click();
  await delay(300);
  var re = /1337/;
  var original = document.querySelector("#entity-name").textContent.trim() + re + origdescription[1].textContent.trim();
  
  document.getElementById("add-translations-button").click();
  //var elements = document.getElementsByClassName("tp-yt-paper-item  style-scope ytcp-text-menu style-scope ytcp-text-menu");

  var cifri = [4, 29, 203, 134, 7, 12, 16, 21, 40, 41, 42, 58, 59, 60, 67, 68, 72, 86, 88, 93, 94, 95, 100, 105, 109, 111, 113, 115, 133, 140, 143, 144, 149, 174, 182, 188, 195];


  var codes = [];
  var langes = [];
  await delay(300);

  cifri.forEach((cifr) => {
    codes.push(document.querySelector(`#text-item-${cifr}`).getAttribute('test-id'));
  })

  cifri.forEach((cifr) => {
    langes.push(document.querySelector(`#text-item-${cifr} > ytcp-ve > div > div > yt-formatted-string`).innerText)
  })
  
  document.getElementById("add-translations-button").click();
  setTimeout(function () {
    for (let i = 0; i < cifri.length; i++) {
      document.getElementById(`text-item-${cifri[i]}`).click();
    }
  }, 500); //добавляет языки перевода,нужно добавить чекбоксы языков привязанные к массиву

  var objject = { Text: original };
  var massiv = [objject];
  // var pereveden;

  // function parsing(responce) {
  //   console.log(responce);
  //   pereveden = JSON.parse(responce);
  //   return pereveden;
  // };

  function findRowForLanguage(langFullName) {
    return Array.from(document.querySelectorAll("ytgn-video-translation-row")).find(item => {
      return item.querySelector(".tablecell-language .language-text").innerText == langFullName;
    });
  }

  const options = {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'X-RapidAPI-Key': 'b9767a063cmsh7eea5123c1a7280p1b49cbjsn047639fc0c09',
      'X-RapidAPI-Host': 'microsoft-translator-text.p.rapidapi.com'
    },
    body: JSON.stringify(massiv)
  };
  
  const pereveden = codes.map(code => {
    const responce = fetch(`https://microsoft-translator-text.p.rapidapi.com/translate?to%5B0%5D=${code}&api-version=3.0&profanityAction=NoAction&textType=plain`, options)
    .then(response => response.json())
    .then(response => response);
    console.log(responce);
    return responce;
    
  })

  await delay(2400);

  // const data = JSON.stringify(massiv);
  // const xhr = new XMLHttpRequest();
  // xhr.withCredentials = true;
  // xhr.onload = parsing;
  // let url = new URL(`https://microsoft-translator-text.p.rapidapi.com/translate?to%5B0%5D=${String(codes)}&api-version=3.0&profanityAction=NoAction&textType=plain`);
  // xhr.open("POST", url);
  // xhr.setRequestHeader("content-type", "application/json");
  // xhr.setRequestHeader("X-RapidAPI-Key", "b9767a063cmsh7eea5123c1a7280p1b49cbjsn047639fc0c09");
  // xhr.setRequestHeader("X-RapidAPI-Host", "microsoft-translator-text.p.rapidapi.com");
  // xhr.send(data);
    //отправка серверу jsona  и получение ответа

  let stroka = Array.from(document.querySelectorAll("ytgn-video-translation-row"));
  const event = new Event('input', {
    bubbles: true
  });

  //console.log(stroka);

  function truncate(str, n) {
    //TODO: make it normal
    
  return (str.length > n) ? str.substr(0, n-1 )+'…' : str;
}
  
  for (let i = 0; i < stroka.length ; i++) {
    await delay(300);
    let row = findRowForLanguage(langes[i]);
    await delay(300);
    row.querySelector("ytgn-video-translation-cell-metadata #add-translation").click();
    await delay(400);
    let title = document.querySelectorAll("#translated-title > div > textarea");
    let descript = document.querySelectorAll("#translated-description > div > textarea");
    let public = document.querySelectorAll("#publish-button");

    pereveden[i].then((value) => {title[i].value = truncate(value[0].translations[0].text.split(re)[0].replace(/[/]/g,''), 100)})

    //str.replace(/[a-zа-яё]/gi, '');
    await delay(500);
    title[i].dispatchEvent(event);
    await delay(400);
    pereveden[i].then((value) => {descript[i].value = value[0].translations[0].text.split(re)[1].replace(/[/]/g,'');})
    await delay(500);
    descript[i].dispatchEvent(event);
    await delay(400);
    public[i].click();
    await delay(400);
  }
}

// END 