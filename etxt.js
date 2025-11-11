let string = "5+5";

function parse(str) 
{
    let a= str.match(/\d*\.\d+|\d+|[-+*\/]/g);
    console.log("String before:");
    console.log(a);
    let count = 0;
    let arr = [];
    let reg=/\d+/;
    let reg1=/[-+*\/]/
    for (let i=0;i<a.length;i++) 
      {
        //   console.log(i);

          if (reg.test(a[i])) 
          {
            if(i>0)
            {
                if(reg1.test(a[i-2])||i===1)
                {
                    if(a[i-1]==="-")
                    {
                        arr.pop();
                        arr.push("-"+a[i]);
                        
                    }
                    else
                    {
                        arr.pop();
                        arr.push(a[i]);
                    }
                }
                else
                {
                    arr.push(a[i]);
                }
            }
            else
            {
                arr.push(a[i]);
            }
            count++;
          } 
          else
          {
            arr.push(a[i]);
          }
          // console.log(a);
        }
        console.log("String After:");
    console.log(arr);
    return arr;
}

// parse("2*-3 * 5 - 12 / 3 + 7");
let c=parse(string);

function toNumber(a)
{
    a=a.map(element => {
        return isNaN(element)?element:Number(element);
    });
    return a;
}
console.log(toNumber(c));


module.exports={
  parse,
  toNumber
}


// const f= require('fs');
// f.readFile('abc.txt','utf-8',(err,data)=>{
//     if(err) throw err;
//     let s=data.split("\n")
//     s.forEach(element => {
//       parse(element);  
//     });
// })