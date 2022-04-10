const blessed = require('blessed');
const screen = blessed.screen();
const colors = require('colors/safe');

var form = blessed.form({
    parent: screen,
    keys: true,
    //left: 'center',
    top: 'center',
    width: 30,
    height: 8,
    bg: 'green',
    autoNext: true
});

var form1 = blessed.form({
    parent: screen,
    keys: true,
    width: 30,
    height: 8,
    autoNext: true,
    content: '1 - Green\n2 - Red\n3 - Blue\n4 - Yellow\n5 - Cyan\n6 - Magenta'
});

var greaterThanEdit = blessed.Textbox({
    parent: form,
    top: 3,
    height: 1,
    left: 2,
    right: 2,
    bg: 'black',
    keys: true,
    inputOnFocus: true,
    content: 'test'
});


var submit = blessed.button({
    parent: form,
    mouse: true,
    keys: true,
    shrink: true,
    padding: {
        left: 1,
        right: 1
    },
    left: 10,
    bottom: 2,
    name: 'submit',
    content: 'submit',
    style: {
        bg: 'blue',
        focus: {
            bg: 'red'
        },
        hover: {
            bg: 'red'
        }
    }
});

var cancel = blessed.button({
    parent: form,
    mouse: true,
    keys: true,
    shrink: true,
    padding: {
        left: 1,
        right: 1
    },
    left: 20,
    bottom: 2,
    name: 'cancel',
    content: 'cancel',
    style: {
        bg: 'blue',
        focus: {
            bg: 'red'
        },
        hover: {
            bg: 'red'
        }
    }
});

var table = blessed.table({
    //parent: screen,
    top: 1,
    left: 'center',
    data: null,
    border: 'line',
    align: 'center',
    tags: true,
    //width: '80%',
    width: 'shrink',
    style: {
      header: {
        fg: 'blue',
        bold: true
      },
      cell: {
        fg: 'magenta'
      }
    }
  });

function createGameOverBox (){
    return blessed.box({
       parent: screen,
       top: "center",
       left: "center",
       width: '20%',
       height: '20%',
       valign:'middle',
       align: 'center',
      content: `Game Over!\n Press q to exit`,
       border: {
         type: 'line'
       },
       style: {
         fg: 'black',
         bg: 'yellow',
       
       },
     })
   }

function createWinnerBox (){
    return blessed.box({
       parent: screen,
       top: "center",
       left: "center",
       width: '20%',
       height: '20%',
       valign:'middle',
       align: 'center',
      content: `You win!\n Press q to exit`,
       border: {
         type: 'line'
       },
       style: {
         fg: 'black',
         bg: 'yellow',
       
       },
     })
   }

var resultBull = 0;
var resultCows = 0;
var count = 1;
var result = [];
for(let i = 0; i < 4; i++){
    result.push(Math.floor(Math.random() * (6 - 1 + 1)) + 1);
}

//let score = String(result[0]) + String(result[1]) + String(result[2]) + String(result[3]);
var data1 = [[ '',  '',  '' , '' ,'Result'],
  [ '',  '',  '' , '' ,  resultBull + ' bull and ' + resultCows + ' cows' ],
  [ '',  '',  '' , '' ,  resultBull + ' bull and ' + resultCows + ' cows' ],
  [ '',  '',  '' , '' ,  resultBull + ' bull and ' + resultCows + ' cows' ],
  [ '',  '',  '' , '' ,  resultBull + ' bull and ' + resultCows + ' cows' ],
  [ '',  '',  '' , '' ,  resultBull + ' bull and ' + resultCows + ' cows' ],
  [ '',  '',  '' , '' ,  resultBull + ' bull and ' + resultCows + ' cows' ],
  [ '',  '',  '' , '' ,  resultBull + ' bull and ' + resultCows + ' cows' ],
  [ '',  '',  '' , '' ,  resultBull + ' bull and ' + resultCows + ' cows' ],
  [ '',  '',  '' , '' ,  resultBull + ' bull and ' + resultCows + ' cows' ],
  [ '',  '',  '' , '' ,  resultBull + ' bull and ' + resultCows + ' cows' ]
  ];

var Green = colors.green('Green');
var Red = colors.red('Red');
var Blue = colors.blue('Blue');
var Yellow = colors.yellow('Yellow');
var Cyan = colors.cyan('Cyan');
var Magenta = colors.magenta('Magenta');
for(let i = 0; i < 4; i++){
    switch(result[i]){
        case 1:
            result[i] = Green;
            break;
        case 2:
            result[i] = Red;
            break;
        case 3:
            result[i] = Blue;
            break;
        case 4:
            result[i] = Yellow;
            break;
        case 5:
            result[i] = Cyan;
            break;
        case 6:
            result[i] = Magenta;
            break;
    }
}

submit.on('press', function() {
    form.submit();
});

cancel.on('press', function() {
    form.reset();
});

form.on('submit', function(data) {
    resultBull = 0;
    resultCows = 0;      
    let getText = Number(greaterThanEdit.getValue());
    let array = [...''+getText].map(Number);

    for(let i = 0; i < 4; i++){
        if(array[i] < 1 || array[i] > 6){
            greaterThanEdit.setValue('');
            screen.render();
            return;
        }
    }

    for(let i = 0; i < 4; i++){
        switch(array[i]){
            case 1:
                array[i] = Green;
                break;
            case 2:
                array[i] = Red;
                break;
            case 3:
                array[i] = Blue;
                break;
            case 4:
                array[i] = Yellow;
                break;
            case 5:
                array[i] = Cyan;
                break;
            case 6:
                array[i] = Magenta;
                break;
        }
    }

    for(let i = 0; i < 4; i++){
        if(result[i] == array[i]){
            resultBull++;
        }
    }

    for(let i = 0; i < 4; i++){
        for(let j = 0; j < 4; j++){
            if(result[i] == array[j] && i !=j){
                resultCows++;
                break; 
            }
        }
    }

    data1[count][0] = array[0];
    data1[count][1] = array[1];
    data1[count][2] = array[2];
    data1[count][3] = array[3];
    let output = String(resultBull) + ' bull and ' + String(resultCows) + ' cows';
    data1[count][4] = String(output);
    table.setData(data1);
    screen.append(table);

    if(resultBull == 4){
        createWinnerBox();
        screen.render();
        return;
    }

    count++;
    greaterThanEdit.setValue('');

    if(count > 10){
        createGameOverBox();
        screen.render();
        return;
    }

    return screen.render();
});

form.on('reset', function(data) {
    greaterThanEdit.setValue('');
    screen.render();
});

screen.key('q', function() {
    process.exit(0);
});

greaterThanEdit.focus();
//greaterThanEdit.setValue(score);

table.setData(data1);
screen.append(table);
screen.render();
