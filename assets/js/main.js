var app = new Vue({
    el: '#root',
    data:{
        urls: [],
        active: 'active',
        sent: 'sent',
        received: 'received',
        displayNone: 'display-none',
        smsToSend: '',
        contacts: [
            {
                name: 'Michele',
                avatar: '_1',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        text: 'Hai portato a spasso il cane?',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        text: 'Ricordati di dargli da mangiare',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 16:15:22',
                        text: 'Tutto fatto!',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Fabio',
                avatar: '_2',
                visible: true,
                messages: [
                    {
                        date: '20/03/2020 16:30:00',
                        text: 'Ciao come stai?',
                        status: 'sent'
                    },
                    {
                        date: '20/03/2020 16:30:55',
                        text: 'Bene grazie! Stasera ci vediamo?',
                        status: 'received'
                    },
                    {
                        date: '20/03/2020 16:35:00',
                        text: 'Mi piacerebbe ma devo andare a fare la spesa.',
                        status: 'sent'
                    }
                ],
            },
            {
                name: 'Samuele',
                avatar: '_3',
                visible: true,
                messages: [
                    {
                        date: '28/03/2020 10:10:40',
                        text: 'La Marianna va in campagna',
                        status: 'received'
                    },
                    {
                        date: '28/03/2020 10:20:10',
                        text: 'Sicuro di non aver sbagliato chat?',
                        status: 'sent'
                    },
                    {
                        date: '28/03/2020 16:15:22',
                        text: 'Ah scusa!',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Luisa',
                avatar: '_4',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        text: 'Lo sai che ha aperto una nuova pizzeria?',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        text: 'Si, ma preferirei andare al cinema',
                        status: 'received'
                    }
                ],
            },
        ],
        
        
        
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
        this.selectChat
    
        

            
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
        receive: function(){

        }
       
    }
})