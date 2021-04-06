var app = new Vue({
    el: '#root',
    data:{
        urls: [],
        active: 'active',
        sent: 'sent',
        received: 'received',
        smsToSend: '',
        contacts: contacts,
        searchFilter: [],
        userToSearch: '',
        hide: false,
    },
    
    computed: {
        searchUser: function(){
         
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
                customUrl:   './assets/img/avatar'+ item.avatar + '.jpg',
                
            }

            this.contacts[index] = url;
            index++;
          
        });
        this.contacts.forEach((item, index) => {
            item.messages.forEach((message)=>{
                message.hidden = true;
            })

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
            console.log(this.contacts)
        },
        smsDate: function(date){
            let nDate = new Date(date);
            let hours = nDate.getHours();
            let minutes = nDate.getMinutes();
          
            return `${hours}:${minutes}`
        },
        toShow: function(message, i){
            if(this.$refs.elementHidden[i] != undefined){
               
                this.$refs.elementHidden[i].classList.remove("display-none");
                this.$refs.elementHidden[i].classList.add("display-flex");
            }
           
        },
 
        removeSms: function(message, i){
         
            this.$refs.elementHidden[i] == '';
            this.contacts.forEach((item)=>{
                let index= i;
                if(item.messages.indexOf(message) != -1){
                    item.messages.splice(index, 1)                   
                }
     
            })
            
        },
       
    }
})