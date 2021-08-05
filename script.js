const socket=io('http://localhost:8001');

const name=prompt("Enter your name to join the chat.");

const audio=new Audio('audio.mp3');

function append(message,position)
{
    let nc=document.createElement('div');
    nc.setAttribute('class',`box-inner ${position}`);
    nc.innerText=message;
    document.querySelector('.box').appendChild(nc);
    if(position=='left')
    {
        audio.play();
    }
}

if(name)
{
    socket.emit('new-user-joined',name);
    socket.on('user-joined',(name)=>{
        append(`${name} joined the chat`,'middle');
    })
    document.querySelector('.send').addEventListener('submit',(e)=>{
        e.preventDefault();
        let msg=document.getElementById('inp');
        if(msg.value!='')
        {
            append(msg.value,'right');
            socket.emit('send',msg.value);
            msg.value="";
        }
    })
    socket.on('receive',(data)=>{
        append(`${data.name}: ${data.message}`,'left');
    })
    socket.on('leave',(name)=>{
        append(`${name} left the chat.`,'middle');
    })
}
else
{
    alert('Enter your name to enter chat.');
    document.querySelector('.send').addEventListener('submit',(e)=>{
        e.preventDefault();
        append("Refresh the page, then enter your name to chat!",'middle');
    })
}