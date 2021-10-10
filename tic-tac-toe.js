document.addEventListener('DOMContentLoaded',(event)=>{

    //variables for deciding who the winner is

    let match=0; //the number of selected boxes that corresponds to those in the possible_wins array
    let matchcopy;
    let x_selected=[]; //array to store x moves
    let o_selected=[]; //array to store o moves


    //get div elements in the board div
    let getboard=document.getElementById('board').children;

    //functon to show game board layout
    function showGameBoard()
        {  
            //console.log(getboard);
            //console.log("in getgameboard");
            for(let l=0;l<getboard.length;l++)
                {
                    getboard[l].classList.add('square');
                }
            //console.log("end of getgameboard");

        }

    showGameBoard(); //invoke showGameBoard function
    
    
    
    //Announce Winner Function
    function winnermsg(who)
    {
        let winmsg=document.getElementById('status');
        winmsg.classList.add('you-won');
        switch(who)
        {
            case 'x': winmsg.textContent='Congratulations! X is the Winner!'; break;
            case 'o': winmsg.textContent='Congratulations! O is the Winner!'; break;
            case 'd': winmsg.textContent='Aw! That is a Draw'; break;
        }
        match=-1; // when winner is announced, set match to -1 so that no other cell can be selected.
    }


    //GameMaster Function
    function xo(ele,clicked,ind)
    {
        if (clicked==true)
            {
                ele.classList.add('X'); 
                ele.textContent='X';
                if(x_selected.includes(ind)==false)
                {
                    x_selected.push(ind);
                }
                if (x_selected.length>=3)   //if player X has played atleast 3 times already
                {
                    match=0
                    findWinner('x',x_selected); //check if those 3 X's are in a row
                    matchcopy=match;
                    if (match==3)               //if there are 3 x's in a row
                    {
                        winnermsg('x');         //display winner message
                    }  
                }
            }
        else
            {
                ele.classList.add('O');
                ele.textContent='O';
                if(o_selected.includes(ind)==false)
                {
                    o_selected.push(ind);
                }
                if (o_selected.length>=3)   //if player O has played atleast 3 times already
                {
                    match=0;
                    findWinner('o',o_selected); //check if those 3 O's are in a row
                    matchcopy=match;
                    if (match==3)               //if there are 3 O's in a row
                    {
                        winnermsg('o');         //display winner message
                    }
                }
            }
        
        return !clicked;
    }

    
    let cell=[...document.getElementsByClassName('square')];//convert the HTML collection of div elements to an array
    let alt=true; //variable used to alternate b/w player X and O
    
    
    //Applying Interactive features to the cells in the Game board
    cell.forEach((elem,index)=>
    {
        //show x or o after click
        elem.addEventListener('click', e=>
            {
                e.preventDefault();
                if(match!==-1) // If match is -1 then no other cell can be selected to show either x or o
                    {
                        if((elem.innerHTML!=='X' && elem.innerHTML!=='O'))
                            {
                                alt=xo(elem,alt,index); //GameMaster decides what to do after cell is clicked
                            }
                    }
                if ((x_selected.length+o_selected.length==9)&&(matchcopy!==3)) //if all the cells have been selcted and there is no winner then its a draw
                    {
                        console.log("Game Draw!");
                        winnermsg('d');
                    }
            })
        
        //Highlight box when mouse hovers over
        elem.addEventListener('mouseover', e=>
            {
                e.preventDefault();
                e.target.classList.add('hover'); //cell highlighted when mouse hovers
            });
        elem.addEventListener('mouseout', e=>
            {
                e.preventDefault();
                e.target.classList.remove('hover'); //cell dehighlighted when mouse moves to another location
            });
   });
   
    
    let possible_wins=[[0,1,2],[0,3,6],[0,4,8],[2,4,6],[2,5,8],[6,7,8],[3,4,5],[1,4,7]]; //possible ways to win
    
    //Function to find which player made moves that match any of the possible ways to win in the possible_wins array
    function findWinner(player,candidate)
        {
            match=0;
            possible_wins.some((el,ind)=>
            {
                el.forEach((num,pos)=>
                {
                    if((candidate.includes(num))===true) //if boxes selected by player includes any of the boxes needed to win 
                    {
                        match++;                        //add 1 to match...if match increments to 3 then the player has won
                    }
                });
                if (match<3)
                {
                    match=0; // reset match for next array in possible_wins
                }
                else if (match==3)
                {
                    return true; //escape loop and keep state of variable match
                }
            });
        }

    //Restart Game
    let restartBtn = document.getElementsByClassName('btn');
    restartBtn[0].addEventListener('click', e =>            //when new game button is clicked...
    {
        e.preventDefault();
        window.location.reload();                           //reset game
   });
});
