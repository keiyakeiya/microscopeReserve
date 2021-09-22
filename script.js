// date ↓
let actingInput  = document.querySelector('#date #actingin');
let dateSpan   = document.querySelector('#date div');
let yearInput  = document.querySelector('#takeYear');
let monthInput = document.querySelector('#takeMonth');
let dayInput   = document.querySelector('#takeDay');
let fullInput  = document.querySelector('#takefull');

const now = new Date();
const dispYear  = now.getFullYear();
const dispMonth = Number(1+now.getMonth())<10? '0'+Number(1+now.getMonth()):Number(1+now.getMonth());
const dispDate  = now.getDate()<10? '0'+now.getDate():now.getDate();
actingInput.value  = dispYear +'-' +dispMonth +'-' +dispDate;
yearInput.value  = Number(dispYear);
monthInput.value = Number(dispMonth);
dayInput.value   = Number(dispDate);
fullInput.value  = now.getTime();

dateSpan.innerHTML = dispYear +'/' +dispMonth +'/' +dispDate;
// dateSpan.innerHTML = '日付';

actingInput.addEventListener("input", () => {
  const result = actingInput.value;
  const yyyy = result.substr(0, 4);
  const mm = result.substr(5, 2);
  const dd = result.substr(8, 2);
  dateSpan.innerHTML = yyyy +'/' + mm+'/' + dd;
  yearInput.value  = Number(yyyy);
  monthInput.value = Number(mm);
  dayInput.value   = Number(dd);
  const full = new Date(yyyy +'-' +mm +'-' +dd);
  fullInput.value  = full.getTime();
},false);
// date ↑


// iframe ↓
const calendarElem = `<iframe src="https://calendar.google.com/calendar/embed?height=600&wkst=1&bgcolor=%23ffffff&ctz=Asia%2FTokyo&src=NnNoNmQ2ZW51bmptMmQ4ODlmN3MycnYxcW9AZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&color=%23AD1457&showTitle=0&showTz=0&mode=WEEK&showPrint=0&showNav=1&showDate=0&showTabs=0&showCalendars=0" width="${innerWidth*0.9}" height="${(innerWidth>=600)?(innerHeight*0.85):(innerHeight*0.55)}" frameborder="0" scrolling="no"></iframe>`;
// const calendarElem = `<iframe src="https://calendar.google.com/calendar/embed?height=600&wkst=1&bgcolor=%23ffffff&ctz=Asia%2FTokyo&src=NnNoNmQ2ZW51bmptMmQ4ODlmN3MycnYxcW9AZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&color=%23AD1457&showTitle=0&showTz=0&mode=WEEK&showPrint=0&showNav=1&showDate=0&showTabs=0&showCalendars=0" width="${innerWidth*0.9}" height="${innerHeight*0.55}" frameborder="0" scrolling="no"></iframe>`;
document.body.querySelector('#cal').insertAdjacentHTML('afterBegin', calendarElem);
// iframe ↑


// form height ↓
let resizeForm = () => {
  let formElem = document.querySelector('form');
  formElem.style.height = innerHeight*0.86 + 'px';
  formElem.style.marginTop = innerHeight*0.02 + 'px';
  formElem.style.marginBottom = innerHeight*0.02 + 'px';
  let calElem = document.querySelector('#cal');
  // calElem.style.marginTop = innerHeight*0.04 + 'px';
  calElem.style.marginTop = (innerWidth>=600)?(innerHeight*0.02):(innerHeight*0.04) + 'px';
  calElem.style.marginBottom = innerHeight*0.02 + 'px';
  calElem.querySelector('iframe').height =  (innerWidth>=600)?(innerHeight*0.85):(innerHeight*0.55);
  let mainElem = document.querySelector('#main');
  mainElem.style.marginTop = innerHeight*0.1 + 'px';
};
resizeForm();
window.addEventListener("resize", () => resizeForm(),false);
// form height ↑


// start & end time list ↓
let startTimeElm = document.querySelector('#startTime select');
let endTimeElm   = document.querySelector('#endTime select');
for(let i=0; i <15; i++) {
  const h   = 10+ Math.floor(i/2);
  const min = (i%2 === 0)? '00': '30';
  const insertElem = `<option value="${h}:${min}">${h}:${min}</option>`;
  startTimeElm.insertAdjacentHTML('beforeEnd', insertElem);
  endTimeElm.insertAdjacentHTML('beforeEnd', insertElem);
}
// start & end time list ↑


// user name ↓
const members = ['user1', 'user2', 'user3', 'user4'];
let userSelector = document.querySelector('#userNameList select');
let returnOption = (name) => `<option value="${name}">${name}</option>`;
for(let i=0; i<members.length; i++) {
  userSelector.insertAdjacentHTML('beforeEnd',returnOption(members[i]));
}
const yourName = JSON.parse(window.localStorage.getItem('lastUsedName'));
if (yourName !== null) {
  userSelector.value = yourName;
}
// user name ↑


// device ↓
const devices = ['device1', 'device2', 'device3', 'device4', 'device5', 'device6', 'device7', 'device8'];
let deviceSelector = document.querySelector('#deviceList select');
for(let i=0; i<devices.length; i++) {
  deviceSelector.insertAdjacentHTML('beforeEnd',returnOption(devices[i]));
}
let usingDevice = [];
const yourDevice = JSON.parse(window.localStorage.getItem('lastUsedDevice'));
if (yourDevice !== null) {
  let deviceOptions  = document.querySelectorAll('#deviceList select option');
  deviceOptions[0].selected = false;
  let hiddenInputs = document.querySelector('#hiddenInputs');
  while (hiddenInputs.firstChild) {
    hiddenInputs.removeChild(hiddenInputs.firstChild);
  }
  for(let i=0; i<yourDevice.length; i++) {
    if (yourDevice[i]) {
      const inputElem = `<input type="text" name="entry.783354646" value="${devices[i-1]}">`;
      hiddenInputs.insertAdjacentHTML('beforeEnd',inputElem);
      deviceOptions[i+1].selected = true;
    }
  }
  usingDevice = yourDevice.concat();
}
deviceSelector.addEventListener("input", () => {
  let deviceOptions  = document.querySelectorAll('#deviceList select option');
  let hiddenInputs = document.querySelector('#hiddenInputs');
  while (hiddenInputs.firstChild) {
    hiddenInputs.removeChild(hiddenInputs.firstChild);
  }
  for(let i=1; i<=devices.length; i++) {
    usingDevice[i-1] = false;
    if (deviceOptions[i].selected) {
      const inputElem = `<input type="text" name="entry.783354646" value="${devices[i-1]}">`;
      hiddenInputs.insertAdjacentHTML('beforeEnd',inputElem);
      usingDevice[i-1] = true;
    }
  }
},false);
// device ↑


// schedule color ↓
let cname2Hex = (cname) => {
  let result;
  switch(cname) {
    case 'トマト':
      result = '#D50000';
      break;
    case 'ミカン':
      result = '#F4511E';
      break;
    case 'バナナ':
      result = '#F6BF26';
      break;
    case 'バジル':
      result = '#0B8043';
      break;
    case 'セージ':
      result = '#33B679';
      break;
    case 'ピーコック':
      result = '#039BE5';
      break;
    case 'ブルーベリー':
      result = '#3F51B5';
      break;
    case 'ラベンダー':
      result = '#7986CB';
      break;
    case 'ブドウ':
      result = '#8E24AA';
      break;
    case 'フラミンゴ':
      result = '#E67C73';
      break;
    case 'グラファイト':
      result = '#616161';
      break;
  }
  return result;
};

let colorSelector = document.querySelector('#color select');
colorSelector.addEventListener("input", () => {
  colorSelector.style.backgroundColor = cname2Hex(colorSelector.value);
},false);
const yourColor = JSON.parse(window.localStorage.getItem('lastUsedColor'));
if (yourColor !== null) {
  colorSelector.value = yourColor;
  colorSelector.style.backgroundColor = cname2Hex(yourColor);
}
// schedule color ↑


// key ↓
let keyElem = document.querySelector('#keyInput');
let key = JSON.parse(window.localStorage.getItem('validation'));
if (key !== null) {
  keyElem.value = key;
} else {
  key = prompt('Password');
  window.localStorage.setItem('validation', JSON.stringify(key));
}
// key ↑


// submition ↓
let submitForm = () => {
  window.localStorage.setItem('lastUsedName', JSON.stringify(userSelector.value));
  window.localStorage.setItem('lastUsedDevice', JSON.stringify(usingDevice));
  window.localStorage.setItem('lastUsedColor', JSON.stringify(colorSelector.value));
  // setTimeout( () => location.reload(), 100);
};
// submition ↑
