document.addEventListener('DOMContentLoaded',(event)=>{

    //functon to show game board layout
    function showGameBoard()
        {  
            let getboard=document.getElementById('board').children;
            console.log(getboard);
            console.log("in getgameboard");
            for(let l=0;l<getboard.length;l++)
                {
                    getboard[l].classList.add('square');
                }
            console.log("end of getgameboard");

        }

    showGameBoard(); //invoke showGameBoard function
    
});
