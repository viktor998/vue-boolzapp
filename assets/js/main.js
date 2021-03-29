var app = new Vue({
    el: '#root',
    data:{
        urls: [],
        active: 'active',
        sent: 'sent',
        received: 'received',
        displayNone: 'display-none',
        smsToSend: '',
        contacts: contacts   
    },
 
  
    created(){
        this.contacts.forEach((item, index) => {
            item.visible = false;
            let url ={
                ...item,
                customUrl:   './assets/img/avatar'+ item.avatar + '.jpg'
            }
            
            this.contacts[index] = url;
            index++;
            
        });
     
    },
    methods:{
        selectChat: function(contact, index){
            this.contacts.forEach((item) => {
                item.visible = false;
                
                
            });
            // console.log(this.contacts.visible)
            // this.contacts.visible = true;
            this.contacts= this.contacts.map((item, i)=>{
                if(index == i){
                    return ({...item, visible: true});
                }
                return item
            })
        },
        send: function(contact, i){
            let objSms = {
                text: this.smsToSend,
                status: 'sent'
            }

            let index= this.contacts.indexOf(contact);
            this.contacts[index].messages.push(objSms)
            this.smsToSend= '';


            let objReceive= {
                text: 'ok',
                status: 'received'

            }
            setTimeout(() => {
                console.log((this).contacts)
               this.contacts[index].messages.push(objReceive)
            }, 1000)
            
        },
        smsDate: function(date){
            let nDate = new Date(date);
            let hours = nDate.getHours();
            let minutes = nDate.getMinutes();
            return `${hours}:${minutes}`
        }
       
    }
})