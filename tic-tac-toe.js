document.addEventListener('DOMContentLoaded',(event)=>{

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
    
    let x_selected=[]; //array to store x moves
    let o_selected=[]; //array to store o moves

    //x-o alternation
    function xo(ele,clicked,ind)
    {
        if (clicked==true)
            {
                ele.classList.add('X'); 
                ele.textContent='X';
                x_selected.push(ind);
            }
        else
            {
                ele.classList.add('O');
                ele.textContent='O';
                o_selected.push(ind);
            }
        return !clicked;
    }

    
    let cell=[...document.getElementsByClassName('square')];
    let alt=true;
    
    
    cell.forEach((elem,index)=>
    {
        //show x or o after click
        elem.addEventListener('click', e=>
            {
                e.preventDefault();
                alt=xo(elem,alt,index);
                //console.log('o:'+o_selected+'x:'+x_selected);
                //elem.textContent='X';
            })

        //Highlight box when mouse hovers over
        elem.addEventListener('mouseover', e=>
            {
                e.preventDefault();
                e.target.classList.add('hover');
            });
        elem.addEventListener('mouseout', e=>
            {
                e.preventDefault();
                e.target.classList.remove('hover');
            });
   });
   

    
    

});
