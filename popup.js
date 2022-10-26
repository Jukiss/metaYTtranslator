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
var memory;
chrome.storage.local.get(["myVariable1"], ({ myVariable1 }) => {
  memory=myVariable1;
  memory.forEach(element => {
   
  });
});

chrome.storage.local.get(["API"], ({ API }) => {
  document.querySelector("#languages > div:nth-child(1) > span > label > input[type=text]").value=API;
  
});
/*
document.querySelector('#all').checked = (localStorage.getItem('all') == "true");
          document.querySelector('#all').addEventListener('change', (event) => {
              if(document.querySelector('#all').checked) {
                  Array.from(document.querySelectorAll('#languages input[type="checkbox"]')).forEach(checkbox=>{
                      checkbox.checked=true;
                      localStorage.setItem('all', true);
                  })
              } else {
                  Array.from(document.querySelectorAll('#languages input[type="checkbox"]')).forEach(checkbox=>{
                      checkbox.checked=false;
                      localStorage.setItem('all', false);
                  })
              }})
              Array.from(document.querySelectorAll('#languages input[type="checkbox"]')).forEach(checkbox => {
                checkbox.addEventListener('change', (event) => {
                    var checked = Array.from(document.querySelectorAll('#languages input[type="checkbox"]:checked'));
                    var all = Array.from(document.querySelectorAll('#languages input[type="checkbox"]'));
                    var selectedAll =(checked.length == all.length)
                    document.querySelector('#all').checked = selectedAll;
                    localStorage.setItem('all', selectedAll);
                    
                });
          });*/
var vse=document.querySelector("#all");
vse.addEventListener('click', function() {
  if(document.querySelector("input[type=checkbox][name=settings]").checked==false){
    for (var i = 0; i < (document.querySelectorAll("input[type=checkbox][name=settings]").length); i++) {
    document.querySelectorAll("input[type=checkbox][name=settings]")[i].checked=true;
   }
  }
  else{for (var i = 0; i < (document.querySelectorAll("input[type=checkbox][name=settings]").length); i++) {
    document.querySelectorAll("input[type=checkbox][name=settings]")[i].checked=false;
   }}
})
          var apikkey = document.querySelector("#languages > div:nth-child(1) > span > label > input[type=text]");        
          var apikeystorage = []
          apikkey.addEventListener('change', function() {
            chrome.storage.local.set({ API: apikkey.value })
                });
          
var checkboxes = document.querySelectorAll("input[type=checkbox][name=settings]");
var enabledSettings = []
var memento = []
checkboxes.forEach(function(checkbox) {
  checkbox.addEventListener('change', function() {
    memento=
    Array.from(checkboxes) // Convert checkboxes to an array to use filter and map.
    .filter(i => i.checked)
    chrome.storage.local.set({ myVariable1: memento });
    enabledSettings = 
      Array.from(checkboxes) // Convert checkboxes to an array to use filter and map.
      .filter(i => i.checked) // Use Array.filter to remove unchecked checkboxes.
      .map(i => i.value) // Use Array.map to extract only the checkbox values from the array of objects.
      chrome.storage.local.set({ myVariable: enabledSettings });
    //alert(enabledSettings)
    
  })
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
var cifri;
var apitoken;
async function SUBTITLES() {
  
  chrome.storage.local.get(["API"], ({ API }) => {
    apitoken=API;
    
  });
  console.log(apitoken);
  
  
  chrome.storage.local.get(["myVariable"], ({ myVariable }) => {
    cifri=myVariable;
    console.log(myVariable);
  });
  
  
   async function delay(ms) {
    return new Promise((res) => setTimeout(res, ms));
  }

  var orig = document.querySelectorAll("#textbox");
  
  document.querySelector("#menu-paper-icon-item-4 > div.nav-item-text.style-scope.ytcp-navigation-drawer").click();
  await delay(300);
 // var re = ";.";
  var originaltitle = orig[0].textContent.trim();
  var originaldescription=orig[1].textContent.trim();
  document.getElementById("add-translations-button").click();
  //var elements = document.getElementsByClassName("tp-yt-paper-item  style-scope ytcp-text-menu style-scope ytcp-text-menu");


await delay(300);
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

  var objject = { Text: originaltitle };
  var massiv = [objject];
  var objject1 = { Text: originaldescription };
  var massiv1 = [objject1];
  var ttitle=JSON.stringify(massiv);
  var ddescr=JSON.stringify(massiv1);
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
      'X-RapidAPI-Key': `${apitoken}`,
      'X-RapidAPI-Host': 'microsoft-translator-text.p.rapidapi.com'
    },
    body: ttitle
  };
  
  const pereveden = codes.map(code => {
    const responce = fetch(`https://microsoft-translator-text.p.rapidapi.com/translate?to%5B0%5D=${code}&api-version=3.0&profanityAction=NoAction&textType=plain`, options)
    .then(response => response.json())
    .then(response => response);
    console.log(responce);
    return responce;
    
  })
  
  const options1 = {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'X-RapidAPI-Key': `${apitoken}`,
      'X-RapidAPI-Host': 'microsoft-translator-text.p.rapidapi.com'
    },
    body: ddescr
  };
  
  const pereveden1 = codes.map(code => {
    const responce1 = fetch(`https://microsoft-translator-text.p.rapidapi.com/translate?to%5B0%5D=${code}&api-version=3.0&includeAlignment=true&profanityAction=NoAction&textType=plain`, options1)
    .then(response => response.json())
    .then(response => response);
    console.log(responce1);
    return responce1;
    
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

    pereveden[i].then((value) => {title[i].value = truncate(value[0].translations[0].text, 100)})

    await delay(500);
    title[i].dispatchEvent(event);
    await delay(400);
    pereveden1[i].then((value) => {descript[i].value = value[0].translations[0].text})
    await delay(500);
    descript[i].dispatchEvent(event);
    await delay(400);
    public[i].click();
    await delay(400);
  }
}

// END 