var app = new Vue({
    el: '#root',
    data:{
        urls: [],
        active: 'active',
        sent: 'sent',
        received: 'received',
        displayNone: 'display-none',
        smsToSend: '',
        contacts: contacts,
        searchFilter: [],
        userToSearch: '',
        getLastDate: [],
    },
    
    computed: {
        searchUser: function(){
            // this.contacts.forEach((item)=>{
            //     if(this.userToSearch == item.name){
            //         console.log(this.userToSearch)
            //        return item.hide()
            //     }
            // })
            var contacts = this.contacts,
            userToSearch = this.userToSearch;

            if(!userToSearch){
                return contacts;
            }

            userToSearch = userToSearch.trim().toLowerCase();

            contacts = contacts.filter(item => {
                if(item.name.toLowerCase().indexOf(userToSearch) !== -1){
                    console.log(item.name.toLowerCase().indexOf(userToSearch))
                    
                    return item;
                }
            })
            this.searchFilter= contacts
            
            return contacts;
        }
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
            this.contacts= this.contacts.map((item, i)=>{
                if(i == index){
                    item.visible = true;
                }else{
                    item.visible = false;
                }
                    
                    
                return item
            })
        },

        selectChatFilter: function(contact, index){
            this.searchFilter.forEach((item) => {
                item.visible = false;


            });

            this.searchFilter= this.searchFilter.map((item, i)=>{
                if(index == i){
                    
                    return ({...item, visible: true});
                }
                return item
            })
        },

        send: function(contact, i){
            let currDate = new Date();
            let month = currDate.getMonth();
            let day = currDate.getDay();
            let year = currDate.getFullYear()
            let hours = currDate.getHours();
            let minutes = currDate.getMinutes();
            let seconds = currDate.getSeconds()

            let sentTime = `${month}/${day}/${year} ${hours}:${minutes}:${seconds}`
           
           
            let objSms = {
                text: this.smsToSend,
                status: 'sent',
                date: sentTime
            }

            let index= this.contacts.indexOf(contact);
            this.contacts[index].messages.push(objSms);
          
            this.smsToSend= '';

            let objReceive= {
                text: 'ok',
                status: 'received',
                date: sentTime

            }
            setTimeout(() => {
                console.log((this).contacts)
               this.contacts[index].messages.push(objReceive)
            }, 2000)

        },
        smsDate: function(date){
            let nDate = new Date(date);
            let hours = nDate.getHours();
            let minutes = nDate.getMinutes();
            // this.getLastDate.push(lDate)
          
            return `${hours}:${minutes}`
        },
        // lastAccessDate: function(messages ){
        //     let message = messages;
        //     let currIndex = messages.length -1;
        //     this.getLastDate.push(message[currIndex].date)
        //     console.log(this.getLastDate)
        // },
        removeSms: function(message, i){
            console.log(message, i)
            this.contacts.forEach((item)=>{
                let index= i;
                if(item.messages.indexOf(message) != -1){
                    item.messages.splice(index, 1)                   
                }
            })
            
        }

    }
})