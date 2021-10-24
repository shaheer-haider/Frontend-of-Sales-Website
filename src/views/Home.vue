<template>
    <div class="home">
        <div id="msgModel" v-if="showSuccessBox !== ''">
            <p>{{ showSuccessBox }}</p>
        </div>
        <h1 id="addSalesTitle">Add Sales</h1>
        <form @submit.prevent="save" id="salesForm">
            <div class="inputField">
                <label class="font-18" for="date">Date:</label>
                <input
                        id="date"
                        placeholder="MM/DD/YYYY"
                        required
                        type="date"
                        v-model="date"
                />
            </div>

            <div class="inputField">
                <label class="font-18" for="itemName">Item Name:</label>
                <input
                        id="itemName"
                        name="itemName"
                        placeholder="Enter Item Name"
                        required
                        type="text"
                        v-model="itemName"
                />
            </div>

            <div class="inputField">
                <label class="font-18" for="work">Work:</label>
                <input
                        id="work"
                        name="work"
                        placeholder="Work on Item"
                        required
                        type="text"
                        v-model="work"
                />
            </div>

            <div class="inputField">
                <label class="font-18" for="weight">Weight:</label>
                <input
                        id="weight"
                        min="0.01"
                        name="weight"
                        placeholder="Enter Weight in gm"
                        required
                        step="0.01"
                        type="number"
                        v-model="weight"
                />
            </div>

            <div class="inputField">
                <label class="font-18" for="priceOfDay">Price of Day:</label>
                <input
                        id="priceOfDay"
                        min="0.01"
                        name="priceOfDay"
                        placeholder="Enter Price of Day"
                        required
                        step="0.01"
                        type="number"
                        v-model="priceOfDay"
                />
            </div>
            <div class="inputField">
                <br/>
                <button :disabled="this.submittingInProcess" class="font-18" id="saveButton" type="submit">Save</button>
            </div>
        </form>
    </div>
</template>

<script>    const axios = require('axios').default;
export default {
    data: () => {
        return {
            date: new Date().toISOString().slice(0, 10),
            itemName: "",
            work: "",
            weight: 0.1,
            priceOfDay: 0.1,
            showSuccessBox: "",
            submittingInProcess: false
        }
    },
    methods: {
        resetInputFields() {
            // reset input fields
            this.date = new Date().toISOString().slice(0, 10);
            this.itemName = "";
            this.work = ""
        },
        showModalMsg(msg) {
            this.showSuccessBox = msg;
            setTimeout(() => {
                this.showSuccessBox = "";
            }, 2000)
        },
        save() {
            this.submittingInProcess = true;
            const data = {
                'date': this.date,
                'itemName': this.itemName,
                'work': this.work,
                'weight': this.weight,
                'priceOfDay': this.priceOfDay
            };
            axios.post(
                'http://localhost:5000/add-data',
                data
            )
                .then((response) => {
                    if (response['data']["statusMessage"] === 1) {
                        this.resetInputFields();
                        this.submittingInProcess = false;
                        this.showModalMsg("Saved Successfully");
                    }
                })
                .catch(() => {
                    this.submittingInProcess = false;
                    this.showModalMsg("An Error Occurred, Please Try Again");
                    // send error in my logs
                    // it is to do later
                    // show error message
                })
                .finally(() => {
                    // show success
                    // this.resetInputFields()
                })
        }
    }
}


</script>

<style scoped>
    #addSalesTitle {
        margin-top: 30px;
        margin-left: 50px;
    }

    .inputField {
        display: flex;
        margin-bottom: 10px;
        justify-content: space-between;
    }

    #salesForm {
        padding-top: 30px;
        padding-left: 60px;
        max-width: 700px;
    }

    #saveButton {
        padding: 10px 20px 10px 20px;
    }

    #msgModel {
        background-color: #0d6efd;
        color: white;
        padding: 15px;
        font-weight: bold;
        border-radius: 15px;
        position: absolute;
        bottom: 10%;
        left: 50%;
    }

    @media only screen and (max-width: 800px) {
        .inputField {
            flex-direction: column;
        }
    }
</style>
