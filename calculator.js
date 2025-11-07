// when any button in calculator.html pressed, the below function triggers
let sum="";  //to store the solved number
let prevValue;  //to store the previous value entered
let pseudoSum="";  //for preinting normally

const filter_include=["Enter","Backspace","Delete"];
const regex=/[-*+.\/0-9^]/g;
let btn=document.querySelectorAll('button');
document.addEventListener('keyup', (e)=>{
    console.log(e.key, e.Code);
    let getVlaue= document.getElementById("input-dis");
    if(filter_include.includes(e.key) || (e.key).match(regex))
    {
        if(e.key==="Enter")
            solve();
        else if(e.key==="Backspace")
        {
            pseudoSum=popElements(pseudoSum)
            getVlaue.innerText=pseudoSum;
        }
        else if(e.key==="Delete")
        {
            console.log("inside keyboard listner:",e.key)
            clearInput();
        }
        else if((e.key).match(/[0-9]/g))
        {
            appendToDisplay(Number(e.key));
            console.log(typeof e.key);
        }
        else if((e.key).match(/[*+^\/.-]/g))
        {
            console.log(typeof e.key);
            console.log(e.key);
            appendToDisplay(e.key)
        }
    }
});

function popElements(str)
{
    return str.slice(0,-1);
}
function appendToDisplay(a)
{
    // gets the value in variable a
    let getVlaue= document.getElementById("input-dis");

    // this if will be true when a is a number or ( a is a string and prevValue is not a string) 
    if(a==="\b")
    {
        pseudoSum=popElements(pseudoSum);
        getVlaue.innerText=pseudoSum;
    }
    else if(typeof a == "number"||(typeof a=="string"&&typeof prevValue!="string")|| typeof prevValue === undefined)
    {
        pseudoSum+=a;
        getVlaue.innerText=pseudoSum;
        // javaScript doesn't take ^ as power, but as bitwise XOR, so i had to make sure it appear as ^ and get solve as **
    }
    // for remembering the previous prevValue, so we won't end up as "*-+-" or something like this
    prevValue=a;
}

// function that solves the equation
function solve()
{
    let s=document.getElementById("output-dis");
    // pseudoSum=sum;
    sum=equate(pseudoSum);
    // eval is build-in fuction for solving strings like "456*4654-6/651+654" and other
    s.innerText=sum;
}

//below function clears everything, kindof reset
function clearInput(){
    let inp=document.getElementById("input-dis");
    let out=document.getElementById("output-dis");
    inp.innerText=0;
    out.innerText="";
    sum="";
    pseudoSum="";
    prevValue=undefined;
}

//this function willl prase the string and give the output but Shunting Algorithm
function equate(eqn)
{
    let token = eqn.match(/\d+(\.\d+)?|[-*/+()^]/g);
    console.log(token);

    const precedenceMap = new Map([
        ["+", 1],
        ["-", 1],
        ["*", 2],
        ["/", 2],
        ["^", 3],
        ]);

    for(let t=0; t<token.length; t++)
    {
        console.log(typeof(token[t]));
        if(!isNaN(token[t]))
        {
            token[t] = Number(token[t]);
        }
    }

    console.log(token);

    let stack = [], queue = [];


    for(let i=0;i<token.length;i++){
        let ch = token[i];
        if(typeof(ch) === 'number')
        {
            queue.push(ch);
        }
        else if(precedenceMap.has(ch))
        {
            while(stack.length > 0 && precedenceMap.get(stack[stack.length - 1])>= precedenceMap.get(ch))
            {
                queue.push(stack.pop());
            }
            stack.push(ch);
        }
    }

    queue=queue.concat(stack.reverse());
    console.log( queue);
    stack = [];
    for(let q of queue)
    {
        if(isNaN(q))
        {
            switch(q)
            {
                case '+':
                stack.push(stack.pop()+stack.pop());
                break;
                case '-':
                stack.push(-stack.pop()+stack.pop());
                break;
                case '*':
                stack.push(stack.pop()*stack.pop());
                break;
                case '/':
                stack.push(1/stack.pop()*stack.pop());
                break;
                case '%':
                stack.push(stack.pop()%stack.pop());
                break;
                case '^':
                let temp = stack.pop();
                stack.push(Math.pow(stack.pop(), temp));
                break;  
                default:
                    console.log("Invalid Operator");
                    break
            }
        }
        else
        {
            stack.push(q);
        }
    }
    return stack[0];
}