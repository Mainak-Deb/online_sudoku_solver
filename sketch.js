let n=9;
let box;
let w=1560,h=700;
let sx,sy;

let arr=[["5","3",".",".","7",".",".",".","."],
         ["6",".",".","1","9","5",".",".","."],
         [".","9","8",".",".",".",".","6","."],
         ["8",".",".",".","6",".",".",".","3"],
         ["4",".",".","8",".","3",".",".","1"],
         ["7",".",".",".","2",".",".",".","6"],
         [".","6",".",".",".",".","2","8","."],
         [".",".",".","4","1","9",".",".","5"],
         [".",".",".",".","8",".",".","7","9"]]

let colarr=[[],[],[],[],[],[],[],[],[]]

let gamemode=true;

function isvalid(x,y,val,arr){
    console.log(x,y)
    let n=arr.length;
    for(let i=0;i<n;i++){
        print(arr[i][y],arr[x][i])
        if((val==arr[i][y]) && (i!=x)){return [false,[i,y]];}
        if((val==arr[x][i]) && (i!=y)){return [false,[x,i]];}
    }
    let startx=parseInt(x/3)*3
    let starty=parseInt(y/3)*3
    for(let i=startx;i<startx+3;i++){
        for(let j=starty;j<starty+3;j++){
            console.log(i,j)
            if((arr[i][j]==val) && ( (i!=x) && (j!=y))){return [false,[i,j]];}
        }
    }
    return [true,[0,0]];
}

function makesudokupuzzle(){
    gamemode=true;
}

function solvethis(){
    solveSudoku(arr)
}



function solveSudoku(board) {
    let rset = new Array(9).fill(0).map(() => new Set());
    let cset = new Array(9).fill(0).map(() => new Set());
    let bset = new Array(9).fill(0).map(() => new Set());
    
    const ary = [];
    for(let i=0; i<9; i++) {
        for(let j=0; j<9; j++) {
            if(board[i][j] !== ".") {
                rset[i].add(board[i][j]);
                cset[j].add(board[i][j]);
                bset[Math.floor(i/3)*3 + Math.floor(j/3)].add(board[i][j]);
            }
            else {
                ary.push([i, j]);
            }
        }
    }
	dfs(0, []);
    
    
    function dfs(idx) {
        if(idx === ary.length) return true;
        const [x, y] = ary[idx];
        
        for(let i=1; i<=9; i++) {
            i = String(i);
            if(rset[x].has(i) || cset[y].has(i) || bset[Math.floor(x/3)*3 + Math.floor(y/3)].has(i)) continue;
            board[x][y] = i;
            rset[x].add(i); cset[y].add(i); bset[Math.floor(x/3)*3 + Math.floor(y/3)].add(i);
            const res = dfs(idx+1);
            if(res !== false) return true;
            rset[x].delete(i); cset[y].delete(i); bset[Math.floor(x/3)*3 + Math.floor(y/3)].delete(i);
            
        }
        return false;
    }
};


function clearthis(){
    gamemode=false;
    for(let i=0;i<n;i++){
        for(let j=0;j<n;j++){
            arr[i][j]='.';
            colarr[i][j]=false;
        }
    }
}


function setup(){
    createCanvas(1560,750);
    sx=(w/2)-(w/6);
    sy=120;
    box=(w/3)/n;

    makesudoku = createButton('Make Sudoko');
    makesudoku.position(700, 80);
    makesudoku.mousePressed(makesudokupuzzle);

    clear = createButton('Clear');
    clear.position(810, 80);
    clear.mousePressed(clearthis);

    solve = createButton('solve');
    solve.position(750, sy+(n*box)+20);
    solve.mousePressed(solvethis);

    for(let i=0;i<n;i++){
        for(let j=0;j<n;j++)
        {
           if( arr[i][j]=='.'){colarr[i].push(0)}
           else{colarr[i].push(1)}
        }
    }
}

function getpos(x,y){
    return [parseInt((x-sx)/box),parseInt((y-sy)/box)]
}


function draw(){
    background	(231,207,180);
    stroke(0);
    strokeWeight(1);
    
    for(let i=0;i<n;i++){
        for(let j=0;j<n;j++){
          
            
            if((colarr[i][j]==0) || ((colarr[i][j]==2) )){
                if(colarr[i][j]==0) {
                    fill(132,36,12);
                }else{
                    fill(189, 0, 0)
                }
                rect(sx+(i*box),sy+(j*box),box,box);
                fill(255)
                if(arr[i][j]!='.'){
                    textSize(box/1.4);
                    text(arr[i][j],sx+(i*box)+box/3, sy+(j*box)+box/1.2);
                }
            }else{
                if(colarr[i][j]==3) {
                    fill(240, 0, 0)
                }else{
                    fill(255,193,140);
                }
                
                rect(sx+(i*box),sy+(j*box),box,box);
                fill(0)
                if(arr[i][j]!='.'){
                    textSize(box/1.4);
                    text(arr[i][j],sx+(i*box)+box/3, sy+(j*box)+box/1.2);
                }
            }
            //rect(sx+(i*box),sy+(j*box),box,box);
        }
    }
    stroke(43,25,25)
    strokeWeight(4);
    push()
    for(let i=0;i<n/3;i++){
        for(let j=0;j<n/3;j++){
            noFill();
            rect(sx+(i*box*3),sy+(j*box*3),box*3,box*3);
        }
    }
    pop()
    if( ((mouseX>=sx) && (mouseX<(sx+(box*9)))) &&  ((mouseY>=sy) && (mouseY<(sy+(box*9)))) ){
        currentpos=getpos(mouseX,mouseY)
        strokeWeight(2);
        fill(218,109,66)
        rect(sx+(currentpos[0]*box),sy+(currentpos[1]*box),box,box);
        if(!colarr[currentpos[0]][currentpos[1]]){
            if(arr[currentpos[0]][currentpos[1]]!='.'){
                fill(255);
                textSize(box/1.4);
                text(arr[currentpos[0]][currentpos[1]],sx+(currentpos[0]*box)+box/3, sy+(currentpos[1]*box)+box/1.2);
    
            }
            
        }else if(arr[currentpos[0]][currentpos[1]]!='.'){  
            fill(0) ;
            textSize(box/1.4);
            text(arr[currentpos[0]][currentpos[1]],sx+(currentpos[0]*box)+box/3, sy+(currentpos[1]*box)+box/1.2);
        }
        
    }
}
function keyPressed() {
    if( ((mouseX>=sx) && (mouseX<(sx+(box*9)))) &&  ((mouseY>=sy) && (mouseY<(sy+(box*9)))) ){
       
            pos=getpos(mouseX,mouseY)
            if(String(key)=='0'){
                if (colarr[pos[0]][pos[1]]==2){
                    let con2=isvalid(pos[0],pos[1],arr[pos[0]][pos[1]],arr)
                    if(colarr[con2[1][0]][con2[1][1]]==3){
                        colarr[con2[1][0]][con2[1][1]]=1;
                    }else if(colarr[con2[1][0]][con2[1][1]]==2){
                        colarr[con2[1][0]][con2[1][1]]=0;
                    }
                    colarr[pos[0]][pos[1]]=0;
                    arr[pos[0]][pos[1]]='.'

                }else if(colarr[pos[0]][pos[1]]==0){
                    arr[pos[0]][pos[1]]='.'
                }
               
                if(!gamemode){   colarr[pos[0]][pos[1]]=false}
            }else if((parseInt(key)>0) && (parseInt(key)<=9)){
                if((colarr[pos[0]][pos[1]]==0) || (colarr[pos[0]][pos[1]]==2)){
                    let con=isvalid(pos[0],pos[1],int(parseInt(key)),arr)
                    print(con)
                    if(con[0]){
                        if (colarr[pos[0]][pos[1]]==2){
                            let con2=isvalid(pos[0],pos[1],arr[pos[0]][pos[1]],arr)
                            if(colarr[con2[1][0]][con2[1][1]]==3){
                                colarr[con2[1][0]][con2[1][1]]=1;
                            }else if(colarr[con2[1][0]][con2[1][1]]==2){
                                colarr[con2[1][0]][con2[1][1]]=0;
                            }
                            colarr[pos[0]][pos[1]]=0;
                            arr[pos[0]][pos[1]]=String(key)

                        }else if(colarr[pos[0]][pos[1]]==0){
                            arr[pos[0]][pos[1]]=String(key)
                        }

                    }else {
                        if (colarr[pos[0]][pos[1]]==2){
                            let con2=isvalid(pos[0],pos[1],arr[pos[0]][pos[1]],arr)
                            if(colarr[con2[1][0]][con2[1][1]]==3){
                                colarr[con2[1][0]][con2[1][1]]=1;
                            }else if(colarr[con2[1][0]][con2[1][1]]==2){
                                colarr[con2[1][0]][con2[1][1]]=0;
                            }
                            colarr[pos[0]][pos[1]]=2
                            if(colarr[con[1][0]][con[1][1]]==1){
                                colarr[con[1][0]][con[1][1]]=3;
                            }else if(colarr[con[1][0]][con[1][1]]==0){
                                colarr[con[1][0]][con[1][1]]=2;
                            }
                            arr[pos[0]][pos[1]]=String(key)
                            
                        }else if(colarr[pos[0]][pos[1]]==0){
                            colarr[pos[0]][pos[1]]=2
                            if(colarr[con[1][0]][con[1][1]]==1){
                                colarr[con[1][0]][con[1][1]]=3;
                            }else if(colarr[con[1][0]][con[1][1]]==0){
                                colarr[con[1][0]][con[1][1]]=2;
                            }
                            arr[pos[0]][pos[1]]=String(key)
                        }

                    }
                    
                    
                    if(!gamemode){ colarr[pos[0]][pos[1]]=true}
                }
            }
    
        print(key, ' ', keyCode)
    }
  }
