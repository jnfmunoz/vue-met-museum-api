

let app = new Vue({

    el:'#app',
    
    data: {
        loading: false,
        id_department: null,
        lists: {
            departments: []
        },
        objectFirst: null,
        randomId: 0,
    },

    watch: {
        id_department: function(){
            if( this.id_department ){
                this.loadObjects();
            }
        }
    },

    methods: {
        async loadDepartments(){
            this.loading = true;
            let response = await axios.get('https://collectionapi.metmuseum.org/public/collection/v1/departments');
            console.log(response);

            this.lists.departments = response.data.departments;
            this.loading = false;

        },

        getRandomInt(min, max){
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max-min)) + min;
        },

        async loadObjects(){
            let response = await axios.get('https://collectionapi.metmuseum.org/public/collection/v1/objects?departmentIds=' + this.id_department);
            // console.log(response);

            let randomIndex = this.getRandomInt(0, response.data.total - 1);

            let randomId = response.data.objectIDs[randomIndex];
            this.randomId = randomId;

            this.seeObject(randomId);
        },

        async seeObject(id){
            let response = await axios.get('https://collectionapi.metmuseum.org/public/collection/v1/objects/' + id);
            console.log(response);

            this.objectFirst = response.data;
        },
    },

    mounted(){
        this.loadDepartments();
    },

});